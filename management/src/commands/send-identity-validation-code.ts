import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import {
  SendIdentityValidationCodeResult,
  SendIdentityVerificationCodeInput,
} from "../@types/verification-code";
import { fetchManagement } from "../fetch-management";

const SEND_IDENTITY_VALIDATION_CODE_MUTATION = gql`
  mutation sendIdentityValidationCode(
    $callbackUrl: String!
    $identity: IdentityInput!
    $localeCodeOverride: String
    $userId: String
  ) {
    sendIdentityValidationCode(
      input: {
        callbackUrl: $callbackUrl
        identity: $identity
        localeCodeOverride: $localeCodeOverride
        userId: $userId
      }
    ) {
      callbackUrl
      localeCode
      eventId
      nonce
    }
  }
`;

export async function sendIdentityValidationCode(
  managementCredentials: ManagementCredentials,
  command: SendIdentityVerificationCodeInput,
): Promise<
  FetchResult<{
    sendIdentityValidationCode: SendIdentityValidationCodeResult;
  }>
> {
  const operation = {
    query: SEND_IDENTITY_VALIDATION_CODE_MUTATION,
    variables: command,
  };

  return fetchManagement(managementCredentials, operation) as FetchResult<{
    sendIdentityValidationCode: SendIdentityValidationCodeResult;
  }>;
}
