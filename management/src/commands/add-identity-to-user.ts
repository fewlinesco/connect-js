import gql from "graphql-tag";

import {
  GraphqlErrors,
  InvalidValidationCodeError,
  OutputDataNullError,
} from "../errors";
import { fetchManagement } from "../fetch-management";
import { checkVerificationCode } from "../queries/check-verification-code";
import {
  Identity,
  IdentityCommandInput,
  ManagementCredentials,
} from "../types";

const ADD_IDENTITY_TO_USER = gql`
  mutation addIdentityToUser(
    $userId: String!
    $type: IdentityTypes!
    $value: String!
  ) {
    addIdentityToUser(
      input: { userId: $userId, type: $type, value: $value, validated: true }
    ) {
      id
      primary
      status
      type
      value
    }
  }
`;

async function addIdentityToUser(
  managementCredentials: ManagementCredentials,
  validationCode: string,
  eventIds: string[],
  { userId, identityType, identityValue }: IdentityCommandInput,
): Promise<Identity> {
  let validationStatus;

  for await (const eventId of eventIds) {
    if (validationStatus !== "VALID") {
      checkVerificationCode(managementCredentials, {
        code: validationCode,
        eventId,
      })
        .then(({ status: verifiedResult }) => {
          if (verifiedResult === "VALID") {
            validationStatus = verifiedResult;
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  if (!validationStatus) {
    throw new InvalidValidationCodeError();
  }

  const operation = {
    query: ADD_IDENTITY_TO_USER,
    variables: { userId, type: identityType, value: identityValue },
  };

  const { data, errors } = await fetchManagement<{
    addIdentityToUser: Identity;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  if (!data.addIdentityToUser) {
    throw new OutputDataNullError();
  }

  return data.addIdentityToUser;
}

export { addIdentityToUser };
