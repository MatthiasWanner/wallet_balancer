import { Contract, providers, utils as ethersUtils } from 'ethers';
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

/**
 * @description Call ERC 20 approve function to allow a spender to spend a given amount of tokens
 * @param windowEthereum as window.ethereum metamask provider (only metamask suported yet)
 * @param tokenContractAddress is the ERC 20 token contract address you want to give approve
 * @param spenderContractAddress
 * @param amount the amount of token you want to allow (without decimal multiplicator)
 * @param waitForTx optional, say if you want to wait end of transaction before returning transaction hash
 * @returns transaction hash as string
 */
export const giveErc20Allowance = async (
  windowEthereum: providers.ExternalProvider,
  tokenContractAddress: string,
  spenderContractAddress: string,
  amount: number,
  waitForTx?: boolean
): Promise<string> => {
  const provider = new providers.Web3Provider(windowEthereum);
  const signer = provider.getSigner();
  const contract = new Contract(tokenContractAddress, erc20Abi, signer);
  const decimals = await contract.decimals();
  const transaction = await contract.approve(
    spenderContractAddress,
    ethersUtils.parseUnits(`${amount}`, decimals)
  );

  if (waitForTx) {
    const tx = await transaction.wait(1);
    return tx.transactionHash;
  }
  return transaction.hash;
};
