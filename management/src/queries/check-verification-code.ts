import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import {
  CheckVerificationCodeInput,
  CheckVerificationCodeResult,
} from "../@types/verification-code";
import { GraphqlErrors } from "../errors";
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
  { code, eventId }: CheckVerificationCodeInput,
): Promise<CheckVerificationCodeResult> {
  const operation = {
    query: CHECK_VERIFICATION_CODE_QUERY,
    variables: { code, eventId },
  };

  const { data, errors } = await fetchManagement<{
    checkVerificationCode: CheckVerificationCodeResult;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.checkVerificationCode;
}
