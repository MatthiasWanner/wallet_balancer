// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
export const ERC20Abi = [
  // Some details about the token
  'function symbol() view returns (string)',
  'function decimals() view returns (uint256)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)'
];

export const ERC721Abi = [
  // Some details about the token
  'function symbol() view returns (string)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)'
];
