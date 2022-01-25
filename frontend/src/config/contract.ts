import AtomicToken from "../../../backend/artifacts/contracts/example/AtomicToken.sol/AtomicToken.json";
import atomic_token_address from '../../../backend/address/AtomicToken.json' 

import baycAbi from "../../../backend/external/bayc.json"; // external contract

export const atomic_token = {
  address: atomic_token_address.address,
  abi: AtomicToken.abi,
};

export const bayc_contract = {
  address: "0x8FFC91DB3C4cD77250130828a08926CC73B0d366",
  abi: baycAbi,
};
