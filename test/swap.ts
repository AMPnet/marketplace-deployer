// @ts-ignore
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Swaps", function () {

    it('serves as a playground', async () => {
        const UniV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xd129c487ea7A5B8583f742a6c3dD99617Bb23Bf6");
        const pairsLength = await UniV2Factory.allPairsLength();
        console.log("pairs", pairsLength);

        const tokenA = await ethers.getContractFactory("ERC20");
        const deployTokenA = await tokenA.deploy();
        console.log("deployTokenA", deployTokenA.address);

        const tokenB = await ethers.getContractFactory("ERC20");
        const deployTokenB = await tokenB.deploy();
        console.log("deployTokenB", deployTokenB.address);

        const createPair = await UniV2Factory.createPair(deployTokenA.address, deployTokenB.address);
        console.log("createPair tx", createPair);
    })

})
