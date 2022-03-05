//require("@nomiclabs/hardhat-ethers");
//const { ethers } = require("hardhat");

//3 constants below connect to your .env file
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.DAI_CONTRACT_ADDRESS;

//initiates package.json file which holds contract abi key
const contract = require("./FundingNFT.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
///contract.abi reads target contract specific abi key within ethers,Contract fucntion
const daiApprovalContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

//DAI approval takes in the approve parameters from FundingNFT contract ABI  parameters are as folows: 1) _spender (address) 2) _value (uint256)
/*

const _spender = "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170";
const _value = "10"
*/

async function main() {
    const approve = await daiApprovalContract.approve(        
        "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170", 
        100000000, 
        );
    await approve.wait();
    console.log("Transaction successsful, check etherscan for confirmation.");
}

main();