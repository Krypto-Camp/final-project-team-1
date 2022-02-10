// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract RentRentToken is ERC20 {
  constructor(uint256 initialSupply) ERC20('RentRent', 'RENT') {
    _mint(0xE7743F21FAFF86425F2b4b6B1Ee1Bf6B1Ae9392C, initialSupply * 10**18);
  }
}
