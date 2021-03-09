import { GraphQLError } from "graphql";
import gql from "graphql-tag";

import {
  GraphqlErrors,
  IdentityNotFoundError,
  InvalidIdentityTypeError,
  OutputDataNullError,
} from "../errors";
import { fetchManagement } from "../fetch-management";
import {
  ManagementCredentials,
  SendPhoneVerificationCodeResult,
  SendPhoneVerificationCodeInput,
} from "../types";

const SEND_PHONE_VERIFICATION_CODE_MUTATION = gql`
  mutation sendPhoneVerificationCode(
    $callbackUrl: String!
    $identity: IdentityInput!
    $localeCodeOverride: String
    $userId: String
  ) {
    sendPhoneVerificationCode(
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

async function sendPhoneVerificationCode(
  managementCredentials: ManagementCredentials,
  {
    callbackUrl,
    identity,
    userId,
    localeCodeOverride,
  }: SendPhoneVerificationCodeInput,
): Promise<SendPhoneVerificationCodeResult> {
  const operation = {
    query: SEND_PHONE_VERIFICATION_CODE_MUTATION,
    variables: {
      callbackUrl,
      identity,
      userId,
      localeCodeOverride,
    },
  };

  const { data, errors } = await fetchManagement<{
    sendPhoneVerificationCode: SendPhoneVerificationCodeResult;
  }>(managementCredentials, operation);

  if (errors) {
    const invalidIdentityTypeError = errors.find(
      (error) =>
        (error as GraphQLError & {
          code: string;
          errors: Record<string, unknown>;
        }).code === "validation_error",
    );

    if (invalidIdentityTypeError) {
      throw new InvalidIdentityTypeError();
    } else {
      const identityNotFound = errors.find(
        (error) =>
          (error as GraphQLError & { errors: { identity_value: string } })
            .errors.identity_value === "can't be blank",
      );

      if (identityNotFound) {
        throw new IdentityNotFoundError();
      }
    }

    throw new GraphqlErrors(errors);
  }

  if (!data.sendPhoneVerificationCode) {
    throw new OutputDataNullError();
  }

  return data.sendPhoneVerificationCode;
}

export { sendPhoneVerificationCode };
