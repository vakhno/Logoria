import MESSAGES from "../../../../../i18n/src/messages";

describe("locale messages", () => {
  it("defines app messages for every locale", () => {
    expect(MESSAGES.en.app.name).toBe("app_name");
    expect(MESSAGES.en.seo.routes.home.title).toBe("app_name - Account");
    expect(MESSAGES.es.auth.signInRequired).toBe("Inicio de sesión requerido");
  });
});
