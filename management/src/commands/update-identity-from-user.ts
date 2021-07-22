import { ConnectUnreachableError } from "../errors";
import { getIdentity } from "../queries/get-identity";
import { ManagementCredentials } from "../types";
import { getIdentityType } from "../utils/get-identity-type";
import { addIdentityToUser } from "./add-identity-to-user";
import { markIdentityAsPrimary } from "./mark-identity-as-primary";
import { removeIdentityFromUser } from "./remove-identity-from-user";

async function updateIdentity(
  managementCredentials: ManagementCredentials,
  userId: string,
  validationCode: string,
  eventIds: string[],
  identityValue: string,
  identityToUpdateId: string,
): Promise<void> {
  const identityToUpdate = await getIdentity(managementCredentials, {
    userId,
    identityId: identityToUpdateId,
  });

  const { id: identityId } = await addIdentityToUser(
    managementCredentials,
    validationCode,
    eventIds,
    {
      userId,
      identityType: getIdentityType(identityToUpdate.type),
      identityValue,
    },
  );

  if (identityToUpdate.primary) {
    await markIdentityAsPrimary(managementCredentials, identityId).catch(
      async (error) => {
        const identity = {
          userId,
          identityType: getIdentityType(identityToUpdate.type),
          identityValue,
        };

        await removeIdentityFromUser(managementCredentials, identity);

        throw error;
      },
    );
  }

  await removeIdentityFromUser(managementCredentials, {
    userId,
    identityType: getIdentityType(identityToUpdate.type),
    identityValue: identityToUpdate.value,
  }).catch(async (error) => {
    const identity = {
      userId,
      identityType: getIdentityType(identityToUpdate.type),
      identityValue,
    };

    if (identityToUpdate.primary) {
      await markIdentityAsPrimary(managementCredentials, identityToUpdateId);
    }

    await removeIdentityFromUser(managementCredentials, identity);

    throw error;
  });
}

async function updateIdentityFromUser(
  managementCredentials: ManagementCredentials,
  userId: string,
  validationCode: string,
  eventIds: string[],
  identityValue: string,
  identityToUpdateId: string,
  maxRetry = 2,
): Promise<void> {
  return await updateIdentity(
    managementCredentials,
    userId,
    validationCode,
    eventIds,
    identityValue,
    identityToUpdateId,
  ).catch((error) => {
    if (error.statusCode >= 500 || error instanceof ConnectUnreachableError) {
      if (maxRetry > 0) {
        return updateIdentityFromUser(
          managementCredentials,
          userId,
          validationCode,
          eventIds,
          identityValue,
          identityToUpdateId,
          maxRetry - 1,
        );
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  });
}

export { updateIdentityFromUser };
