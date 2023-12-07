const { ethers } = require("ethers");
require("dotenv").config();

// Example data
const ethereumAddress = "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36";
const ethereumAddresses = [
  "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
];
const uint256Value = 10000; // Example uint256
const someString = "nizhunt";

// Concatenate the data
const data =
  ethereumAddress +
  "|" +
  ethereumAddresses.join("|") +
  +uint256Value.toString() +
  "|" +
  someString;

// Hash the data
const hashedData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data));

// Your private key (keep it secure!)
const privateKey = process.env.PRIVATE_KEY;

// Create a wallet instance
const wallet = new ethers.Wallet(privateKey);

// Sign the hash
wallet
  .signMessage(ethers.utils.arrayify(hashedData))
  .then((signature) => {
    console.log("ECDSA Signature:", signature);
  })
  .catch((error) => {
    console.error("Error signing message:", error);
  });

export async function signMessageForRelayer(
  this: IDeployedPayload,
  user: SignerWithAddress,
  req: OSNFTRelayer.ForwardRequestStruct
) {
  const dataType = [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "gas", type: "uint256" },
    { name: "validUntil", type: "uint256" },
    { name: "data", type: "bytes" },
  ];

  const domainData = {
    name: "OSNFT_RELAYER",
    version: "1",
    chainId: await user.getChainId(),
    verifyingContract: this.relayer.address.toLowerCase(),
  };

  const signatureResult = await user._signTypedData(
    domainData,
    {
      ForwardRequest: dataType,
    },
    req
  );
  // recover

  return signatureResult;
}
