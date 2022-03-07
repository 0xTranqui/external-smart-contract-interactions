//require("@nomiclabs/hardhat-ethers");
//const { ethers } = require("hardhat");

//3 constants below connect to your .env file
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.RADICLE_REGISTRY_CONTRACT_ADDRESS;

//initiates package.json file which holds contract abi key
const contract = require("./package.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
///contract.abi reads target contract specific abi key within ethers,Contract fucntion
const radicleRegistryContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

//RadicleRegistry newFunction parameters
//radicleregistry newProject inputs are as folows: 1) community name 2) community symbol 3) community owner 4) ipfs hash
/*
const community_name = "ECODRIPS";
const community_symbol = "EDRIPS";
const community_owner = "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170";
const IPFS_hash = "bafkreigluzcmirlil76qn7kxfvsha42mphohrnyfxhviujxjwiheeimrbe";
*/

async function main() {
    const newProject = await radicleRegistryContract.newProject(        
        "ecoDrips2", 
        "EDRIPS", 
        "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170", 
        "bafkreigluzcmirlil76qn7kxfvsha42mphohrnyfxhviujxjwiheeimrbe"
        );
    await newProject.wait();
    console.log("Transaction successsful, check etherscan for confirmation.");
}

main();