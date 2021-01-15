import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { User } from "../@types/provider-user";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const CREATE_OR_UPDATE_PASSWORD_MUTATION = gql`
  mutation createOrUpdatePassword($cleartextPassword: String!, $userId: ID!) {
    createOrUpdatePassword(
      input: { cleartextPassword: $cleartextPassword, userId: $userId }
    ) {
      id
    }
  }
`;

export type CreateOrUpdatePasswordInput = {
  cleartextPassword: string;
  userId: string;
};

export async function createOrUpdatePassword(
  managementCredentials: ManagementCredentials,
  { cleartextPassword, userId }: CreateOrUpdatePasswordInput,
): Promise<User> {
  const operation = {
    query: CREATE_OR_UPDATE_PASSWORD_MUTATION,
    variables: { cleartextPassword, userId },
  };

  const { data, errors } = await fetchManagement<{
    createOrUpdatePassword: User;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.createOrUpdatePassword;
}
