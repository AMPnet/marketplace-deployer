/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import { task } from "hardhat/config";
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-solhint";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import * as dotenv from 'dotenv';
dotenv.config();

type NetworkConfig = {
  [key: string]: {
    url: string,
    accounts: {
      mnemonic: string
    },
    gasPrice?: number
  }
}

function networks() {
  let networks: NetworkConfig = {}
  if (process.env.SEED_PHRASE) {
    if (process.env.ROPSTEN_RPC) {
      networks["ropsten"] = {
         url: process.env.ROPSTEN_RPC,
         accounts: {
           mnemonic: process.env.SEED_PHRASE
         }
      }
    }
    if (process.env.GOERLI_RPC) {
     networks["goerli"] = {
        url: process.env.GOERLI_RPC,
        accounts: {
          mnemonic: process.env.SEED_PHRASE
        },
        gasPrice: 30000000000
     }
    }
    if (process.env.MUMBAI_RPC) {
     networks["mumbai"] = {
        url: process.env.MUMBAI_RPC,
        accounts: {
          mnemonic: process.env.SEED_PHRASE
        },
        gasPrice: 10000000000
     }
   }
   if (process.env.MATIC_RPC) {
     networks["matic"] = {
        url: process.env.MATIC_RPC,
        accounts: {
          mnemonic: process.env.SEED_PHRASE
        },
        gasPrice: 30000000000
     }
   }
   if (process.env.AURORA_TESTNET_RPC) {
     networks["aurora-testnet"] = {
        url: process.env.AURORA_TESTNET_RPC,
        accounts: {
          mnemonic: process.env.SEED_PHRASE
        },
        gasPrice: 10000000000
     }
   }
   if (process.env.PRIVATE_RPC) {
     networks["private"] = {
        url: process.env.PRIVATE_RPC,
        accounts: {
          mnemonic: process.env.SEED_PHRASE
        },
        gasPrice: 0
     }
   }
  }
  return networks;
}

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],
  },
  networks: networks()
};
