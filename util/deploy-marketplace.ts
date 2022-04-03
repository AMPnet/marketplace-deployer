// @ts-ignore
import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  
  const deployer = accounts[0];
  const deployerAddress = await deployer.getAddress();

  const wethFactory = await ethers.getContractFactory("WETH9");
  const weth = await wethFactory.deploy();
  console.log(`WETH9: ${weth.address}`);

  const uniswapFactoryBuilder = await ethers.getContractFactory("UniswapV2Factory");
  const uniswapFactory = await uniswapFactoryBuilder.deploy(deployerAddress);
  console.log(`UniswapV2Factory: ${uniswapFactory.address}\nOwner: ${deployerAddress}`);

  const uniswapRouterFactory = await ethers.getContractFactory("UniswapV2Router02");
  const uniswapRouter = await uniswapRouterFactory.deploy(uniswapFactory.address, weth.address);
  console.log(`UniswapV2Router02: ${uniswapRouter.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
