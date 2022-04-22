import { Contract, ethers, providers } from 'ethers';
import erc20Abi from './constants/erc20_abi.constants';

/**
 * @description Check how many erc20 tokens are allowed to a given owner, spender and contract address
 * @param windowEthereum as window.ethereum metamask provider (only metamask suported yet)
 * @param tokenContractAddress is the ERC 20 token contract address you want to check
 * @param spenderContractAddress
 * @param ownerAddress the wallet address you want to check
 * @returns number of token allowed by the owner for the spender
 */
export const checkErc20Allowance = async (
  windowEthereum: providers.ExternalProvider,
  tokenContractAddress: string,
  spenderContractAddress: string,
  ownerAddress: string
): Promise<number> => {
  const provider = new providers.Web3Provider(windowEthereum);
  const contract = new Contract(tokenContractAddress, erc20Abi, provider);
  const allowance = await contract.allowance(
    ownerAddress,
    spenderContractAddress
  );

  return parseInt(allowance, 10);
};
