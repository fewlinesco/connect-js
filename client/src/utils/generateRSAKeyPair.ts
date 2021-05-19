import crypto, { KeyPairSyncResult } from "crypto";

function generateRSAKeyPair(): KeyPairSyncResult<string, string> {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
}

export { generateRSAKeyPair };
