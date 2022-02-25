import { ethers, providers, utils } from 'ethers';

export const getWalletBalance = async (
  contractAddress: string,
  windowEthereum: providers.ExternalProvider
) => {
  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  const contractAbi = [
    // Some details about the token
    'function symbol() view returns (string)',
    'function decimals() view returns (uint256)',

    // Get the account balance
    'function balanceOf(address) view returns (uint)'
  ];

  // The Contract object
  const provider = new providers.Web3Provider(windowEthereum);

  await provider.send('eth_requestAccounts', []);
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

  const [connectedAccount] = await provider.listAccounts();

  const balance = utils.formatUnits(
    await contract.balanceOf(connectedAccount),
    decimals
  );

  return { symbol, balance };
};
