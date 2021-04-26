import jose from "node-jose";

import { JWTPayload } from "../types";

async function generateJWE(
  JWTPayloadOrJWS: JWTPayload | string,
  publicKey: string,
): Promise<string> {
  const josePublicKeyForEncryption = await jose.JWK.asKey(publicKey, "pem");

  let JWTOrJWS;

  if (typeof JWTPayloadOrJWS === "string") {
    JWTOrJWS = Buffer.from(JWTPayloadOrJWS);
  } else {
    JWTOrJWS = JSON.stringify(JWTPayloadOrJWS);
  }

  return await jose.JWE.createEncrypt(
    { format: "compact" },
    josePublicKeyForEncryption,
  )
    .update(Buffer.from(JWTOrJWS))
    .final();
}

export { generateJWE };
