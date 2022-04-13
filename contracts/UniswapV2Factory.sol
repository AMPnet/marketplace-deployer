pragma solidity =0.5.16;

import "@uniswap/v2-core/contracts/UniswapV2Factory.sol";

contract UniswapV2FactoryFork is UniswapV2Factory {

    bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(UniswapV2Pair).creationCode));

    constructor(address _feeToSetter) public UniswapV2Factory(_feeToSetter) {}

}
