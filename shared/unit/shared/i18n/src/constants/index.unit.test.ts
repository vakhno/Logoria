import constants from "../../../../../i18n/src/constants";

describe("i18n constants", () => {
  it("defines app locale constants", () => {
    expect(constants.APP_NAME).toBe("app_name");
    expect(constants.LOCALES_LIST).toEqual(["en", "es"]);
    expect(constants.DEFAULT_LOCALE).toBe("en");
    expect(constants.LOCALES_LIST).toContain(constants.DEFAULT_LOCALE);
  });
});
