import { providers, Contract } from 'ethers';
import { ERC721ContractInfos } from '../../types';
import ERC721Abi from '../constants/erc20_abi.constants';

/**
 * @description Get the infos of an ERC21 NFT contract
 * @param contractAddress string containing ERC21 hash address
 * @param provider corresponding window.ethereum metamask provider (only metamask suported yet)
 * @returns {ERC21ContractInfos} promise containing symbol and balance
 */
export const getERC721ContractInfos = async (
  contractAddress: string,
  provider: providers.Web3Provider
): Promise<ERC721ContractInfos> => {
  const contract = new Contract(contractAddress, ERC721Abi, provider);
  const symbol = await contract.symbol();

  return { contract, symbol };
};
