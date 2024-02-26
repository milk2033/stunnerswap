// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "hardhat/console.sol";


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(address initialOwner, string memory tokenName, string memory tokenSymbol)
        ERC20(tokenName, tokenSymbol)
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
 
 


// The amount of your real balance is the outcome of method balanceOf divided by 
// 10 ** decimals(). Method decimals() returns the number of decimals used to 
// get its user representation.

// Example: If balanceOf returns that I have 9000000000000 tokens and the outcome of 
// method decimals is 9 then the "display" variant of my tokens would be 
// 9000000000000 / (10 ** 9) which is 9000 tokens.

// If your contract does not have decimals() method then "display" variant of your 
// balance is whatever method balanceOf returns without any additional calculations.
