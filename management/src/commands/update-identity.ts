import { IdentityNotFoundError, InvalidValidationCodeError } from "../errors";
import { checkVerificationCode } from "../queries/check-verification-code";
import { getIdentity } from "../queries/get-identity";
import { IdentityTypes, ManagementCredentials } from "../types";
import { addIdentityToUser } from "./add-identity-to-user";
import { markIdentityAsPrimary } from "./mark-identity-as-primary";
import { removeIdentityFromUser } from "./remove-identity-from-user";

type VerifyValidationCodeProps = {
  validationCode: string;
  eventId: string;
};

type NewIdentityData = {
  value: string;
  type: IdentityTypes;
  primary: string;
};

async function updateIdentity(
  managementCredentials: ManagementCredentials,
  userId: string,
  verifyValidationCode: VerifyValidationCodeProps,
  newIdentity: NewIdentityData,
  identityToUpdateId: string,
): Promise<void> {
  const { validationCode, eventId } = verifyValidationCode;
  const { value, type, primary } = newIdentity;

  const { status: verificationStatus } = await checkVerificationCode(
    managementCredentials,
    {
      code: validationCode,
      eventId,
    },
  );

  if (verificationStatus !== "VALID") {
    throw new InvalidValidationCodeError();
  }

  const { id: identityId } = await addIdentityToUser(managementCredentials, {
    userId,
    identityType: type,
    identityValue: value,
  });

  if (primary) {
    await markIdentityAsPrimary(managementCredentials, identityId);
  }

  const identityToUpdate = await getIdentity(managementCredentials, {
    userId,
    identityId: identityToUpdateId,
  });

  if (!identityToUpdate) {
    throw new IdentityNotFoundError();
  }

  await removeIdentityFromUser(managementCredentials, {
    userId,
    identityType: type,
    identityValue: identityToUpdate.value,
  });
}

export { updateIdentity };
