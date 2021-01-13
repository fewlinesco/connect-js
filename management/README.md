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

await checkVerificationCode(managementCredentials, "code", "eventId");
```

### getConnectApplication

```ts
import { getConnectApplication } from "@fewlines/connect-management";

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

await getIdentity(managementCredentials, "userId", "id");
```

### getProviderName

```ts
import { getProviderName } from "@fewlines/connect-management";

await getProviderName(managementCredentials);
```

### getUserIDFromIdentityValue

```ts
import { getUserIDFromIdentityValue } from "@fewlines/connect-management";

await getUserIDFromIdentityValue(managementCredentials, identities);
```

### isUserPasswordSet

```ts
import { isUserPasswordSet } from "@fewlines/connect-management";

await isUserPasswordSet(managementCredentials, "userId");
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
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
};

await createOrUpdatePassword(managementCredentials, variables);
```

### createUserWithIdentities

```ts
import { createUserWithIdentities } from "@fewlines/connect-management";

const variables = {
  identities: [
    {
      id: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
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
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
};

await deleteUser(managementCredentials, variables);
```

### markIdentityAsPrimary

```ts
import { markIdentityAsPrimary } from "@fewlines/connect-management";

const variables = {
  identityId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
};

await markIdentityAsPrimary(managementCredentials, variables);
```

### removeIdentityFromUser

```ts
import { removeIdentityFromUser } from "@fewlines/connect-management";

const variables = {
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
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
      id: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
      type: "EMAIL",
      value: "foo@fewlines.co",
      status: "validated",
      primary: true,
    },
  userId: "d96ee314-31b2-4e19-88b7-63734b90d1d4";
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
  id: "d96ee314-31b2-4e19-88b7-63734b90d1d4",
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
