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

//FundingNFT mint parameters are as follows:
// 1) nftReceiver (address) 2) typeId (uint128) 3) topUp (uint128) 4) amtPerSec (uint128)
//to figure out amt per second, take the total amount being committed (topUp = DAI being committed per month * # of months being committed to upfront) and divide that by 2626560 (# of seconds per month) ****this maybe should be divided by # of seconds per month * the number of months being commmitted to


async function main() {
    const mint = await FundingNFTContract.mint(        
        "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170", 
        0, 
        2626550,
        1
        );
    await mint.wait();
    console.log("Transaction successsful, check etherscan for confirmation.");
}

main();