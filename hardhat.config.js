/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.7.3",
  //gas: 4500000,
  //gasPrice: 10000000000,
};
