import { Server } from "http";

import { addIdentityToUser } from "../../src/commands";
import { InvalidValidationCodeError } from "../../src/errors";
import * as checkVerificationCode from "../../src/queries/check-verification-code";
import { getIdentityType } from "../../src/utils/get-identity-type";
import { nonPrimaryNewIdentity } from "../mocks/identities";
import { app } from "../mocks/test-server/server";

describe("Add identity to user", () => {
  let server: Server;

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(3000, () => resolve());
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  const mockedAddIdentityManagementCredentials = {
    URI: "http://localhost:3000/add-identity",
    APIKey: "APIKey",
  };

  const spiedOnCheckVerificationCode = jest.spyOn(
    checkVerificationCode,
    "checkVerificationCode",
  );

  test("happy path", async () => {
    expect.assertions(2);

    const { id: addedIdentityId } = await addIdentityToUser(
      mockedAddIdentityManagementCredentials,
      "424242",
      ["nonPrimaryEventId"],
      {
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        identityType: getIdentityType(nonPrimaryNewIdentity.type),
        identityValue: nonPrimaryNewIdentity.value,
      },
    );

    expect(spiedOnCheckVerificationCode).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedAddIdentityManagementCredentials,
      },
      { code: "424242", eventId: "nonPrimaryEventId" },
    );
    expect(addedIdentityId).toEqual(nonPrimaryNewIdentity.id);
  });

  test("should throw Invalid validation code error", async () => {
    try {
      await addIdentityToUser(
        mockedAddIdentityManagementCredentials,
        "232323",
        ["nonPrimaryEventId"],
        {
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
          identityType: getIdentityType(nonPrimaryNewIdentity.type),
          identityValue: nonPrimaryNewIdentity.value,
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidValidationCodeError);
    }
  });
});
