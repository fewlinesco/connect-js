import gql from "graphql-tag";

import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";
import { CreateOrUpdatePasswordInput, ManagementCredentials } from "../types";

const CREATE_OR_UPDATE_PASSWORD_MUTATION = gql`
  mutation createOrUpdatePassword($cleartextPassword: String!, $userId: ID!) {
    createOrUpdatePassword(
      input: { cleartextPassword: $cleartextPassword, userId: $userId }
    ) {
      id
    }
  }
`;

export async function createOrUpdatePassword(
  managementCredentials: ManagementCredentials,
  { cleartextPassword, userId }: CreateOrUpdatePasswordInput,
): Promise<{ id: string }> {
  const operation = {
    query: CREATE_OR_UPDATE_PASSWORD_MUTATION,
    variables: { cleartextPassword, userId },
  };

  const { data, errors } = await fetchManagement<{
    createOrUpdatePassword: { id: string };
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.createOrUpdatePassword;
}
