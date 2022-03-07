//require("@nomiclabs/hardhat-ethers");
//const { ethers } = require("hardhat");

//3 constants below connect to your .env file
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.FUNDING_NFT_CONTRACT_ADDRESS;

//initiates package.json file which holds contract abi key
const contract = require("./FundingNFT.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
///contract.abi reads target contract specific abi key within ethers,Contract fucntion
const FundingNFTContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

//FundingNFT addType parameters are as follows:
// 1) newTypeId (uint128) 2) limit (uint64) 3) minamtperSec (uint128)
//to figure out desired amt per second, define your desired DAI received per month and divide that by 2626560 (# of seconds per month)



async function main() {
    const addType = await FundingNFTContract.addType(        
        0, 
        10,
        1
        );
    await addType.wait();
    console.log("Transaction successsful, check etherscan for confirmation.");
}

main();