// @ts-ignore
import { ethers } from "hardhat";

describe("Swaps", function () {

    it('serves as a playground', async () => {
        const accounts = await ethers.getSigners();
  
        const deployer = accounts[0];
        const deployerAddress = await deployer.getAddress();

        const wethFactory = await ethers.getContractFactory("WETH9");
        const weth = await wethFactory.deploy();
        console.log(`WETH9: ${weth.address}`);

        const uniswapFactoryBuilder = await ethers.getContractFactory("UniswapV2FactoryFork");
        const uniswapFactory = await uniswapFactoryBuilder.deploy(deployerAddress);
        console.log(`UniswapV2Factory: ${uniswapFactory.address}\nOwner: ${deployerAddress}`);
      
        const uniswapRouterFactory = await ethers.getContractFactory("UniswapV2Router02");
        const uniswapRouter = await uniswapRouterFactory.deploy(uniswapFactory.address, weth.address);
        console.log(`UniswapV2Router02: ${uniswapRouter.address}`);

        const swapperFactory = await ethers.getContractFactory("Swapper");
        const swapper = await swapperFactory.deploy();

        console.log("swapper address", swapper.address);
        const tokenFactory = await ethers.getContractFactory("ERC20");
        const tokenA = await tokenFactory.deploy("Token A", "TA", 6);
        console.log("token A", tokenA.address);
        const tokenB = await tokenFactory.deploy("Token B", "TB", 6);
        console.log("token B", tokenB.address);

        await swapper.init(
            uniswapFactory.address,
            uniswapRouter.address,
            tokenA.address,
            tokenB.address,
            "1000000000",
            "1000000000",
            "500000000",
            "500000000"
        );
        console.log("swapper token-A balance before swap: ", await tokenA.balanceOf(swapper.address));
        console.log("swapper token-B balance before swap: ", await tokenB.balanceOf(swapper.address));

        console.log("exchanging 100 tokenA for tokenB...");
        await swapper.swapAtoB(100000000);
        
        console.log("swapper token-A balance after swap: ", await tokenA.balanceOf(swapper.address));
        console.log("swapper token-B balance after swap: ", await tokenB.balanceOf(swapper.address));
        
    });

})
