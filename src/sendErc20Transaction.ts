import { ISendErc20TokensArgs } from '../types';
import { ethers, BigNumber } from 'ethers';
import erc20Abi from './constants/erc20_abi.constants';

/**
 * @description Send ERC20 tokens amount to an address for a given smart contract Address
 * @param args as ISendErc20TokensArgs
 * @param args.amount have to be applied with decimals multiplicator (e.g: to send 10 erc20 tokens with 18 decimals, args.amount = 10 * 10**18)
 * @param args.contractAddress of the sent ERC20 token
 * @param args.windowEthereum is the metamask provider
 * @param args.receiverAddress is the address to which we send the ERC20 tokens
 * @return string txHash
 */
export const sendErc20Transaction = async (
  args: ISendErc20TokensArgs
): Promise<string> => {
  const { amount, contractAddress, windowEthereum, receiverAddress } = args;
  const provider = new ethers.providers.Web3Provider(windowEthereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, erc20Abi, signer);
  const transfertAmount = BigNumber.from(`${amount}`);
  const { hash } = await contract.transfer(receiverAddress, transfertAmount);
  return hash;
};
