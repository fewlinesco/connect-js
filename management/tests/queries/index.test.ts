import {
  checkVerificationCode,
  getApplication,
  getIdentities,
  getIdentity,
  getProviderName,
  getUserIDFromIdentityValue,
  isUserPasswordSet,
} from "../../src/queries";

describe("Queries", () => {
  test("They should all be exported from 'src/queries/index.ts'", () => {
    expect(checkVerificationCode).toBeInstanceOf(Function);
    expect(getApplication).toBeInstanceOf(Function);
    expect(getIdentities).toBeInstanceOf(Function);
    expect(getIdentity).toBeInstanceOf(Function);
    expect(getProviderName).toBeInstanceOf(Function);
    expect(getUserIDFromIdentityValue).toBeInstanceOf(Function);
    expect(isUserPasswordSet).toBeInstanceOf(Function);
  });
});
