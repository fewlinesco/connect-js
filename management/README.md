# Fewlines Connect-js Management

**Management** is part of the **Fewlines Connect-js SDK**.

It provides a list of functions to handle all the user data flows related to Connect.

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

const input = {
  code: "288761",
  eventId: "ec1ee772-3249-4e5a-ad85-2b18d13f6f73",
};

await checkVerificationCode(managementCredentials, input);
```

### getConnectApplication

```ts
import { getConnectApplication } from "@fewlines/connect-management";

await getConnectApplication(
  managementCredentials,
  "a3e64872-6326-4813-948d-db8d8fc81bc8"
);
```

### getIdentities

```ts
import { getIdentities } from "@fewlines/connect-management";

await getIdentities(
  managementCredentials,
  "d96ee314-31b2-4e19-88b7-63734b90d1d4"
);
```

### getIdentity

```ts
import { getIdentity } from "@fewlines/connect-management";

const input = {
  userId: "b4e8bec6-3156-43c4-aaa8-9632c1c160b3",
  identityId: "9a60bc4c-82dc-42c5-8bac-8b051340d2ac",
};

await getIdentity(managementCredentials, input);
```

### getProviderName

```ts
import { getProviderName } from "@fewlines/connect-management";

await getProviderName(managementCredentials);
```

### getUserIDFromIdentityValue

```ts
import { getUserIDFromIdentityValue } from "@fewlines/connect-management";

await getUserIDFromIdentityValue(managementCredentials, "foo@fewlines.co");
```

### isUserPasswordSet

```ts
import { isUserPasswordSet } from "@fewlines/connect-management";

await isUserPasswordSet(
  managementCredentials,
  "16071981-1536-4eb2-a33e-892dc84c14a4"
);
```

## Commands

### addIdentityToUser

```ts
import { addIdentityToUser } from "@fewlines/connect-management";

const input = {
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
  type: "EMAIL",
  value: "foo@fewlines.co",
};

await addIdentityToUser(managementCredentials, input);
```

### createOrUpdatePassword

```ts
import { createOrUpdatePassword } from "@fewlines/connect-management";

const input = {
  cleartextPassword: "cleartextPassword",
  userId: "d8959bfd9-aab8-4de2-81bb-cbd9ea1a4191",
};

await createOrUpdatePassword(managementCredentials, input);
```

### createUserWithIdentities

```ts
import { createUserWithIdentities } from "@fewlines/connect-management";

const input = {
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

export async function createUserWithIdentities(managementCredentials, input);
```

### deleteUser

```ts
import { deleteUser } from "@fewlines/connect-management";

await deleteUser(managementCredentials, "f084749a-2e90-4891-a26f-65e08c4f4e69");
```

### markIdentityAsPrimary

```ts
import { markIdentityAsPrimary } from "@fewlines/connect-management";

await markIdentityAsPrimary(
  managementCredentials,
  "504c741c-f9dd-425c-912a-03fe051b0e6e"
);
```

### removeIdentityFromUser

```ts
import { removeIdentityFromUser } from "@fewlines/connect-management";

const input = {
  userId: "4a5324f7-9390-41ab-a94d-2ab3198f1a8c",
  type: "EMAIL",
  value: "foo@fewlines.co",
};

export async function removeIdentityFromUser(managementCredentials, input);
```

### sendIdentityValidationCode

```ts
import { sendIdentityValidationCode } from "@fewlines/connect-management";

const input = {
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
  input
);
```

### updateConnectApplication

```ts
import { updateConnectApplication } from "@fewlines/connect-management";

const input = {
  id: "d1e34015-4ba0-44a3-8171-15ed6979b86d",
  description: "Connect JS Management test environment",
  name: "Connect JS Management",
  redirectUris: [
    "http://localhost:3000/oauth/callback",
    "https://connect-management.local:3001/oauth/callback",
  ],
  defaultHomePage: "https://www.fewlines.co",
};

await updateConnectApplication(managementCredentials, input);
```
