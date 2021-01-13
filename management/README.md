# Fewlines Connect-js Management

**Disclaimer**: this package is made for our internal usage and is only open source for convenience so we might not consider Pull Requests or Issues. Feel free to fork though.

**Management** is part of the **Fewlines Connect-js SDK**.

It provides a list of function to handle all the user data flows related to Connect.

## Installation

```shell
yarn add @fewlines/connect-management
```

## Important types

### Identities

**Identities** are one of the building blocks of **Connect-js Management**.

```ts
enum IdentityTypes {
  APPLE = "APPLE",
  DECATHLON = "DECATHLON",
  EMAIL = "EMAIL",
  FACEBOOK = "FACEBOOK",
  GITHUB = "GITHUB",
  GOOGLE = "GOOGLE",
  KAKAO_TALK = "KAKAO_TALK",
  LINE = "LINE",
  MICROSOFT = "MICROSOFT",
  NAVER = "NAVER",
  PAYPAL = "PAYPAL",
  PHONE = "PHONE",
  PROVIDER = "PROVIDER",
  STRAVA = "STRAVA",
  VKONTAKTE = "VKONTAKTE",
}

type Identity = {
  id: string;
  primary: boolean;
  status: "validated" | "unvalidated";
  type: IdentityTypes;
  value: string;
};
```

### ManagementCredentials

`ManagementCredentials` is an object that needs to be passed each time Connect is fetched.

```ts
type ManagementCredentials = {
  URI: string;
  APIKey: string;
}

const managementCredentials: ManagementCredentials = {
  URI: "URI",
  APIKey: "APIKey";
}
```

## Queries

### checkVerificationCode

```ts
import { checkVerificationCode } from "@fewlines/connect-management";

const variables = {
  code: "288761",
  eventId: "ec1ee772-3249-4e5a-ad85-2b18d13f6f73",
};

await checkVerificationCode(managementCredentials, variables);
```

### getConnectApplication

```ts
import { getConnectApplication } from "@fewlines/connect-management";

const variables = {
  id: "317e2dbd-e386-4eef-91f6-eee5091db372",
};

await getConnectApplication(managementCredentials, "id");
```

### getIdentities

```ts
import { getIdentities } from "@fewlines/connect-management";

const variables = {
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
};

await getIdentities(managementCredentials, variables);
```

### getIdentity

```ts
import { getIdentity } from "@fewlines/connect-management";

const variables = {
  userId: "b4e8bec6-3156-43c4-aaa8-9632c1c160b3",
  id: "9a60bc4c-82dc-42c5-8bac-8b051340d2ac",
};

await getIdentity(managementCredentials, variables);
```

### getProviderName

```ts
import { getProviderName } from "@fewlines/connect-management";

await getProviderName(managementCredentials);
```

### getUserIDFromIdentityValue

```ts
import { getUserIDFromIdentityValue } from "@fewlines/connect-management";

const variables = {
  value: "foo@fewlines.co",
};

await getUserIDFromIdentityValue(managementCredentials, variables);
```

### isUserPasswordSet

```ts
import { isUserPasswordSet } from "@fewlines/connect-management";

const variables = {
  userId: "16071981-1536-4eb2-a33e-892dc84c14a4";
};

await isUserPasswordSet(managementCredentials, variables);
```

## Commands

### addIdentityToUser

```ts
import { addIdentityToUser } from "@fewlines/connect-management";

const variables = {
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
  type: "EMAIL",
  value: "foo@fewlines.co",
};

await addIdentityToUser(managementCredentials, variables);
```

### createOrUpdatePassword

```ts
import { createOrUpdatePassword } from "@fewlines/connect-management";

const variables = {
  cleartextPassword: "cleartextPassword",
  userId: "d8959bfd9-aab8-4de2-81bb-cbd9ea1a4191",
};

await createOrUpdatePassword(managementCredentials, variables);
```

### createUserWithIdentities

```ts
import { createUserWithIdentities } from "@fewlines/connect-management";

const variables = {
  identities: [
    {
      id: "d4e5e5d5-4fd3-49af-8ee4-7e28c824bb3c",
      type: "EMAIL",
      value: "foo@fewlines.co",
      status: "validated",
      primary: true,
    },
  ],
  localeCode: "en-EN",
};

export async function createUserWithIdentities(
  managementCredentials,
  variables
);
```

### deleteUser

```ts
import { deleteUser } from "@fewlines/connect-management";

const variables = {
  userId: "f084749a-2e90-4891-a26f-65e08c4f4e69",
};

await deleteUser(managementCredentials, variables);
```

### markIdentityAsPrimary

```ts
import { markIdentityAsPrimary } from "@fewlines/connect-management";

const variables = {
  identityId: "504c741c-f9dd-425c-912a-03fe051b0e6e",
};

await markIdentityAsPrimary(managementCredentials, variables);
```

### removeIdentityFromUser

```ts
import { removeIdentityFromUser } from "@fewlines/connect-management";

const variables = {
  userId: "4a5324f7-9390-41ab-a94d-2ab3198f1a8c",
  type: "EMAIL",
  value: "foo@fewlines.co",
};

export async function removeIdentityFromUser(managementCredentials, variables);
```

### sendIdentityValidationCode

```ts
import { sendIdentityValidationCode } from "@fewlines/connect-management";

const variables = {
  callbackUrl: "/",
  identity: {
      id: "12488dfe-8e46-4391-a8bb-f0db41078942",
      type: "EMAIL",
      value: "foo@fewlines.co",
      status: "validated",
      primary: true,
    },
  userId: "37b21863-3f38-4d20-848d-3108337a0b8b";
};

await sendIdentityValidationCode(
  managementCredentials,
  variables
);
```

### updateConnectApplication

```ts
import { updateConnectApplication } from "@fewlines/connect-management";

const variables = {
  id: "d1e34015-4ba0-44a3-8171-15ed6979b86d",
  description: "Connect JS Management test environment",
  name: "Connect JS Management",
  redirectUris: [
    "http://localhost:3000/oauth/callback",
    "https://connect-management.local:3001/oauth/callback",
  ],
  defaultHomePage: "https://www.fewlines.co",
};

await updateConnectApplication(managementCredentials, variables);
```

// npm unpublish pkg/name@version
