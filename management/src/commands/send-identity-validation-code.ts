import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { IdentityInput } from "../@types/Identity";
import { ManagementCredentials } from "../@types/management";
import { SendIdentityValidationCodeResult } from "../@types/verification-code";
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

export type SendIdentityValidationCode = Promise<
  FetchResult<{
    sendIdentityValidationCode: SendIdentityValidationCodeResult;
  }>
>;

export type SendIdentityVerificationCodeVariables = {
  callbackUrl: string;
  identity: IdentityInput;
  localeCodeOverride?: string;
  userId?: string;
};

export async function sendIdentityValidationCode(
  managementCredentials: ManagementCredentials,
  variables: SendIdentityVerificationCodeVariables,
): SendIdentityValidationCode {
  const operation = {
    query: SEND_IDENTITY_VALIDATION_CODE_MUTATION,
    variables,
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as SendIdentityValidationCode;
}
