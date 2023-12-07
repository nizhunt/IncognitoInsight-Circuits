const { ethers } = require("ethers");

async function main() {
  // Replace with your Ethereum private key
  const privateKey =
    "2aa25d610fe8843cff8522407dcd26fd3351e80835fef8a498aded9fde0eea3e";

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey);

  // Sign a message
  const message = "Hello, world!";
  const signature = await wallet.signMessage(message);
  console.log("Signature:", signature);

  // Compute the message's digest
  const messageDigest = ethers.utils.hashMessage(message);

  // Recover the public key
  const publicKey = ethers.utils.recoverPublicKey(messageDigest, signature);
  console.log("Public Key:", publicKey);

  // Remove the '0x04' prefix from the uncompressed public key
  const publicKeyNoPrefix = publicKey.slice(4);

  // Extract X and Y coordinates (each coordinate is 64 characters long in hex)
  const publicKeyX = publicKeyNoPrefix.substring(0, 64);
  const publicKeyY = publicKeyNoPrefix.substring(64);

  console.log("Public Key X Coordinate:", publicKeyX);
  console.log("Public Key Y Coordinate:", publicKeyY);
}

main().catch(console.error);
