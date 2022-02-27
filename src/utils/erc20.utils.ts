import { providers, Contract } from 'ethers';
import { ERC20ContractInfos } from '../../types';
import { ERC20Abi } from '../constants/abis.constants';

/**
 * @description Get the infos of an ERC20 token contract
 * @param contractAddress string containing ERC20 hash address
 * @param provider corresponding window.ethereum metamask provider (only metamask suported yet)
 * @returns {ERC20ContractInfos} promise containing symbol, decimals and balance
 */
export const getERC20ContractInfos = async (
  contractAddress: string,
  provider: providers.Web3Provider
): Promise<ERC20ContractInfos> => {
  const contract = new Contract(contractAddress, ERC20Abi, provider);
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

  return { contract, symbol, decimals };
};
