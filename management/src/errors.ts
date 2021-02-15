import { GraphQLError } from "graphql";
import { FetchError } from "node-fetch";

import { PasswordRules } from "./types";

class GraphqlError extends Error {
  parentError: GraphqlErrors;

  constructor(message: string, error: GraphqlErrors) {
    super(message);
    this.parentError = error;
  }
}

class GraphqlErrors extends Error {
  constructor(errors: readonly GraphQLError[]) {
    const message = errors.map(({ message }) => message).join("\n");
    super(message);
  }
}

class OutputDataNullError extends Error {
  readonly message = "Output Data Null";
}

class InvalidPasswordInputError extends Error {
  readonly rules: PasswordRules;

  constructor(rules: PasswordRules) {
    super("Invalid Password Input");
    this.rules = rules;
  }
}

class IdentityAlreadyUsedError extends Error {
  readonly message = "Identity already used";
}

class IdentityValueCantBeBlankError extends Error {
  readonly message = "Identity value can't be Blank";
}

class ConnectUnreachableError extends FetchError {}

export {
  ConnectUnreachableError,
  GraphqlError,
  GraphqlErrors,
  OutputDataNullError,
  InvalidPasswordInputError,
  IdentityAlreadyUsedError,
  IdentityValueCantBeBlankError,
};
