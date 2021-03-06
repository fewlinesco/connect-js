import { GraphQLError } from "graphql";
import gql from "graphql-tag";

import {
  GraphqlErrors,
  InvalidPasswordInputError,
  OutputDataNullError,
} from "../errors";
import { fetchManagement } from "../fetch-management";
import {
  CreateOrUpdatePasswordInput,
  ManagementCredentials,
  PasswordRules,
} from "../types";
import { flattenDeepObject } from "../utils/flatten-deep-object";

const CREATE_OR_UPDATE_PASSWORD_MUTATION = gql`
  mutation createOrUpdatePassword($cleartextPassword: String!, $userId: ID!) {
    createOrUpdatePassword(
      input: { cleartextPassword: $cleartextPassword, userId: $userId }
    ) {
      passwords {
        available
      }
    }
  }
`;

async function createOrUpdatePassword(
  managementCredentials: ManagementCredentials,
  { cleartextPassword, userId }: CreateOrUpdatePasswordInput,
): Promise<boolean> {
  const operation = {
    query: CREATE_OR_UPDATE_PASSWORD_MUTATION,
    variables: { cleartextPassword, userId },
  };

  const { data, errors } = await fetchManagement<{
    createOrUpdatePassword: { passwords: { available: boolean } };
  }>(managementCredentials, operation);

  if (errors) {
    const passwordError = errors.find(
      (error) => (error as GraphQLError & { rules: PasswordRules }).rules,
    );

    if (passwordError) {
      const formattedPasswordRules = flattenDeepObject(
        (passwordError as GraphQLError & { rules: PasswordRules }).rules,
      );
      throw new InvalidPasswordInputError(formattedPasswordRules);
    }

    throw new GraphqlErrors(errors);
  }

  if (!data.createOrUpdatePassword) {
    throw new OutputDataNullError();
  }

  return data.createOrUpdatePassword.passwords.available;
}

export { createOrUpdatePassword };
