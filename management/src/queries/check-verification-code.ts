import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { CheckVerificationCodeResult } from "../@types/verification-code";
import { fetchManagement } from "../fetch-management";

const CHECK_VERIFICATION_CODE_QUERY = gql`
  query checkVerificationCodeQuery($code: String!, $eventId: String!) {
    checkVerificationCode(input: { code: $code, eventId: $eventId }) {
      identityType
      identityValue
      nonce
      status
    }
  }
`;

export async function checkVerificationCode(
  managementCredentials: ManagementCredentials,
  code: string,
  eventId: string,
): Promise<
  FetchResult<{ checkVerificationCode: CheckVerificationCodeResult }>
> {
  const operation = {
    query: CHECK_VERIFICATION_CODE_QUERY,
    variables: { code, eventId },
  };

  return fetchManagement(managementCredentials, operation) as FetchResult<{
    checkVerificationCode: CheckVerificationCodeResult;
  }>;
}
