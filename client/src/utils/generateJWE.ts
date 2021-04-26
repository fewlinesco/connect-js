import jose from "node-jose";

async function generateJWE(
  jwtOrJws: string,
  publicKey: string,
): Promise<string> {
  const josePublicKeyForEncryption = await jose.JWK.asKey(publicKey, "pem");

  return await jose.JWE.createEncrypt(
    { format: "compact" },
    josePublicKeyForEncryption,
  )
    .update(Buffer.from(jwtOrJws))
    .final();
}

export { generateJWE };
