// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract AtomicToken is ERC20 {
  constructor(uint256 initialSupply) ERC20('AtomicHabit', 'ATOMIC') {
    _mint(address(this), initialSupply * 10**18);
  }
}
