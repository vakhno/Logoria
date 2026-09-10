import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { TestHelpers } from "better-auth/plugins";
import { API_ROUTES } from "../../../routes/src";
import { createAuthTestServer, TEST_AUTH_PORT, TEST_AUTH_URL } from "../config/auth-test-config";

const auth = createAuthTestServer();
const authContext = await auth.$context;
const testHelpers = (authContext as typeof authContext & { test: TestHelpers }).test;

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function toRequest(req: IncomingMessage) {
  const url = new URL(req.url ?? "/", TEST_AUTH_URL);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const entry of value) headers.append(key, entry);
      continue;
    }
    if (value !== undefined) headers.set(key, value);
  }

  return new Request(url, {
    method: req.method,
    headers,
  });
}

async function pipeAuthResponse(authResponse: Response, res: ServerResponse) {
  res.writeHead(authResponse.status, Object.fromEntries(authResponse.headers.entries()));
  res.end(Buffer.from(await authResponse.arrayBuffer()));
}

async function handleTestRoute(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "/", TEST_AUTH_URL);

  if (req.method === "GET" && url.pathname === "/test/ok") {
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && url.pathname === "/test/login") {
    const overrides = await readJsonBody(req);
    const user = testHelpers.createUser({
      email: "e2e-user@example.com",
      emailVerified: true,
      name: "E2E User",
      ...overrides,
    });

    await testHelpers.saveUser(user);
    const login = await testHelpers.login({ userId: user.id });

    sendJson(res, 200, {
      user: login.user,
      session: login.session,
      cookies: login.cookies,
      cookieHeader: login.cookies
        .map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`)
        .join("; "),
      token: login.token,
    });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/test/session") {
    const session = await auth.api.getSession({
      headers: new Headers({
        cookie: req.headers.cookie ?? "",
      }),
    });

    sendJson(res, 200, { session });
    return true;
  }

  if (req.method === "POST" && url.pathname === "/test/delete-user") {
    const body = await readJsonBody(req);
    await testHelpers.deleteUser(body.userId);
    sendJson(res, 200, { ok: true });
    return true;
  }

  return false;
}

const server = createServer(async (req, res) => {
  try {
    if (await handleTestRoute(req, res)) return;

    if ((req.url ?? "").startsWith(API_ROUTES.auth.base)) {
      await pipeAuthResponse(await auth.handler(toRequest(req)), res);
      return;
    }

    sendJson(res, 404, { error: "not_found" });
  } catch (error) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : "internal_error" });
  }
});

server.listen(TEST_AUTH_PORT, () => {
  console.log(`[auth-e2e] ready at ${TEST_AUTH_URL}`);
});

async function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
