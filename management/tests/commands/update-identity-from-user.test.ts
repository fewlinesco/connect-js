import { Server } from "http";

import { updateIdentityFromUser } from "../../src/commands";
import * as addIdentityToUser from "../../src/commands/add-identity-to-user";
import * as markIdentityAsPrimary from "../../src/commands/mark-identity-as-primary";
import * as removeIdentityFromUser from "../../src/commands/remove-identity-from-user";
import * as fetchManagement from "../../src/fetch-management";
import * as checkVerificationCode from "../../src/queries/check-verification-code";
import * as getIdentity from "../../src/queries/get-identity";
import { mockFetchManagement } from "../mocks/fetch-management";
import {
  nonPrimaryIdentityToUpdate,
  nonPrimaryNewIdentity,
  primaryIdentityToUpdate,
  primaryNewIdentity,
} from "../mocks/identities";
import { app } from "../mocks/test-server/server";

describe("Update identity from user", () => {
  let server: Server;

  beforeAll(async () => {
    await new Promise(
      (resolve) => (server = app.listen(3000, resolve as () => void)),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  const mockedUpdateIdentityManagementCredentials = {
    URI: "http://localhost:3000/update-identity",
    APIKey: "APIKey",
  };

  const spiedOnGetIdentity = jest.spyOn(getIdentity, "getIdentity");
  const spiedOnCheckVerificationCode = jest.spyOn(
    checkVerificationCode,
    "checkVerificationCode",
  );
  const spiedOnAddIdentityToUser = jest.spyOn(
    addIdentityToUser,
    "addIdentityToUser",
  );
  const spiedOnRemoveIdentityFromUser = jest.spyOn(
    removeIdentityFromUser,
    "removeIdentityFromUser",
  );

  const spiedOnMarkIdentityAsPrimary = jest.spyOn(
    markIdentityAsPrimary,
    "markIdentityAsPrimary",
  );

  test("happy path with a non primary identity", async () => {
    expect.assertions(5);

    await updateIdentityFromUser(
      mockedUpdateIdentityManagementCredentials,
      "f3acadc9-4491-44c4-bd78-077a166751af",
      "424242",
      ["nonPrimaryEventId"],
      nonPrimaryNewIdentity.value,
      nonPrimaryIdentityToUpdate.id,
    );

    expect(spiedOnGetIdentity).toHaveBeenCalledWith(
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      {
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        identityId: nonPrimaryIdentityToUpdate.id,
      },
    );
    expect(spiedOnCheckVerificationCode).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      { code: "424242", eventId: "nonPrimaryEventId" },
    );
    expect(spiedOnAddIdentityToUser).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      "424242",
      ["nonPrimaryEventId"],
      {
        identityType: nonPrimaryNewIdentity.type,
        identityValue: nonPrimaryNewIdentity.value,
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
      },
    );
    expect(spiedOnRemoveIdentityFromUser).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      {
        identityType: nonPrimaryIdentityToUpdate.type,
        identityValue: nonPrimaryIdentityToUpdate.value,
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
      },
    );
    expect(spiedOnMarkIdentityAsPrimary).not.toHaveBeenCalled();
  });

  test("happy path with a primary identity", async () => {
    expect.assertions(5);

    await updateIdentityFromUser(
      mockedUpdateIdentityManagementCredentials,
      "f3acadc9-4491-44c4-bd78-077a166751af",
      "424242",
      ["primaryEventId"],
      primaryNewIdentity.value,
      primaryIdentityToUpdate.id,
    );

    expect(spiedOnGetIdentity).toHaveBeenCalledWith(
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      {
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        identityId: primaryIdentityToUpdate.id,
      },
    );
    expect(spiedOnCheckVerificationCode).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      { code: "424242", eventId: "primaryEventId" },
    );
    expect(spiedOnAddIdentityToUser).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      "424242",
      ["primaryEventId"],
      {
        identityType: primaryNewIdentity.type,
        identityValue: primaryNewIdentity.value,
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
      },
    );
    expect(spiedOnMarkIdentityAsPrimary).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      primaryNewIdentity.id,
    );
    expect(spiedOnRemoveIdentityFromUser).toHaveBeenNthCalledWith(
      1,
      {
        ...mockedUpdateIdentityManagementCredentials,
      },
      {
        identityType: primaryIdentityToUpdate.type,
        identityValue: primaryIdentityToUpdate.value,
        userId: "f3acadc9-4491-44c4-bd78-077a166751af",
      },
    );
  });

  test("should rollback if an error occurs when trying to mark the new identity as primary", async () => {
    expect.assertions(5);

    jest.mock("../../src/fetch-management");

    jest
      .spyOn(fetchManagement, "fetchManagement")
      .mockImplementation((credentials, operation) =>
        mockFetchManagement(credentials, operation, {
          behaviour: "rollback",
          targetedFailure: "mark",
        }),
      );

    try {
      await updateIdentityFromUser(
        mockedUpdateIdentityManagementCredentials,
        "f3acadc9-4491-44c4-bd78-077a166751af",
        "424242",
        ["primaryEventId"],
        primaryNewIdentity.value,
        primaryIdentityToUpdate.id,
      );
    } catch (error) {
      expect(spiedOnGetIdentity).toHaveBeenCalledWith(
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        {
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
          identityId: primaryIdentityToUpdate.id,
        },
      );
      expect(spiedOnCheckVerificationCode).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        { code: "424242", eventId: "primaryEventId" },
      );
      expect(spiedOnAddIdentityToUser).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        "424242",
        ["primaryEventId"],
        {
          identityType: primaryNewIdentity.type,
          identityValue: primaryNewIdentity.value,
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        },
      );
      expect(spiedOnMarkIdentityAsPrimary).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        primaryNewIdentity.id,
      );
      expect(spiedOnRemoveIdentityFromUser).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        {
          identityType: primaryNewIdentity.type,
          identityValue: primaryNewIdentity.value,
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        },
      );
    }
  });

  test("should rollback if an error occurs when trying to remove the old identity", async () => {
    expect.assertions(7);

    jest.mock("../../src/fetch-management");

    jest
      .spyOn(fetchManagement, "fetchManagement")
      .mockImplementation((credentials, operation) =>
        mockFetchManagement(credentials, operation, {
          behaviour: "rollback",
          targetedFailure: "remove",
        }),
      );

    try {
      await updateIdentityFromUser(
        mockedUpdateIdentityManagementCredentials,
        "f3acadc9-4491-44c4-bd78-077a166751af",
        "424242",
        ["primaryEventId"],
        primaryNewIdentity.value,
        primaryIdentityToUpdate.id,
      );
    } catch (error) {
      expect(spiedOnGetIdentity).toHaveBeenCalledWith(
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        {
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
          identityId: primaryIdentityToUpdate.id,
        },
      );
      expect(spiedOnCheckVerificationCode).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        { code: "424242", eventId: "primaryEventId" },
      );
      expect(spiedOnAddIdentityToUser).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        "424242",
        ["primaryEventId"],
        {
          identityType: primaryNewIdentity.type,
          identityValue: primaryNewIdentity.value,
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        },
      );
      expect(spiedOnMarkIdentityAsPrimary).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        primaryNewIdentity.id,
      );
      expect(spiedOnMarkIdentityAsPrimary).toHaveBeenNthCalledWith(
        2,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        primaryIdentityToUpdate.id,
      );
      expect(spiedOnRemoveIdentityFromUser).toHaveBeenNthCalledWith(
        1,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        {
          identityType: primaryIdentityToUpdate.type,
          identityValue: primaryIdentityToUpdate.value,
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        },
      );
      expect(spiedOnRemoveIdentityFromUser).toHaveBeenNthCalledWith(
        2,
        {
          ...mockedUpdateIdentityManagementCredentials,
        },
        {
          identityType: primaryNewIdentity.type,
          identityValue: primaryNewIdentity.value,
          userId: "f3acadc9-4491-44c4-bd78-077a166751af",
        },
      );
    }
  });
});
