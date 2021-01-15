import gql from "graphql-tag";

import { Identity } from "../@types/identity";
import { ManagementCredentials } from "../@types/management";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const MARK_IDENTITY_AS_PRIMARY_MUTATION = gql`
  mutation markIdentityAsPrimary($identityId: String!) {
    markIdentityAsPrimary(input: { identityId: $identityId }) {
      id
      primary
      status
      type
      value
    }
  }
`;

export async function markIdentityAsPrimary(
  managementCredentials: ManagementCredentials,
  identityId: Identity["id"],
): Promise<Identity> {
  const operation = {
    query: MARK_IDENTITY_AS_PRIMARY_MUTATION,
    variables: { identityId },
  };

  const { data, errors } = await fetchManagement<{
    markIdentityAsPrimary: Identity;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.markIdentityAsPrimary;
}
