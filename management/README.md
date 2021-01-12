# Fewlines Connect-js Management

**Disclaimer**: this package is made for our internal usage and is only open source for convenience so we might not consider Pull Requests or Issues. Feel free to fork though.

**Management** is part of the **Fewlines Connect-js SDK**.

It provides a list of function to handle all the user data flows related to Connect.

AAAADDD VARIABLES

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

await getIdentities(managementCredentials, "userId");
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
  userId: "userId",
  type: "type",
  value: "value",
};

await addIdentityToUser(managementCredentials, variables);
```

### createOrUpdatePassword

```ts
import { createOrUpdatePassword } from "@fewlines/connect-management";

const variables = {
  cleartextPassword: "cleartextPassword",
  userId: "userId",
};

await createOrUpdatePassword(managementCredentials, variables);
```

### createUserWithIdentities

### deleteUser

### markIdentityAsPrimary

### removeIdentityFromUser

### sendIdentityValidationCode

### updateConnectApplication

// npm unpublish pkg/name@version
