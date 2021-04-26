import crypto from "crypto";

import { defaultPayload } from "../src/utils/defaultObjects";
import { generateJWE } from "../src/utils/generateJWE";
import { generateRS256JWS } from "../src/utils/generateJWS";

describe("generateJWE", () => {
  const RS256JWT = generateRS256JWS();

  test("should generate a JWE from a JWS", async () => {
    expect.assertions(1);

    const { publicKey: publicKeyForEncryption } = crypto.generateKeyPairSync(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
    );

    const generatedJWE = await generateJWE(RS256JWT, publicKeyForEncryption);

    expect(generatedJWE.split(".").length).toEqual(5);
  });

  test("should generate a JWE from a JWT", async () => {
    expect.assertions(1);

    const { publicKey: publicKeyForEncryption } = crypto.generateKeyPairSync(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
    );

    const generatedJWE = await generateJWE(
      defaultPayload,
      publicKeyForEncryption,
    );

    expect(generatedJWE.split(".").length).toEqual(5);
  });
});
