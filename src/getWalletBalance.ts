import { providers, utils } from 'ethers';
import {
  IContractInfos,
  IGetWalletBalanceArgs,
  IWalletTokenBalance
} from '../types';
import { getContractinfos } from './utils';

/**
 * @description Get the wallet balance of an ERC20 or ERC721 token
 * @param args as ISendErc20TokensArgs
 * @param args.contractAddress of the ERC20 token
 * @param args.windowEthereum is the external provider (eg: metamask)
 * @param args.contractType string to indicate what is the token type: erc20 or erc721
 * @return object that contain balance and symbol of the token
 */
export const getWalletBalance = async (
  args: IGetWalletBalanceArgs
): Promise<IWalletTokenBalance> => {
  try {
    const { contractAddress, windowEthereum, contractType } = args;
    const provider = new providers.Web3Provider(windowEthereum);

    // Or throw an error if not IContractInfos
    const {
      contract,
      symbol,
      decimals = 0
    } = (await getContractinfos({
      contractAddress,
      provider,
      contractType
    })) as IContractInfos;

    const [connectedAccount] = await provider.listAccounts();

    const balance = utils.formatUnits(
      await contract.balanceOf(connectedAccount),
      decimals
    );

    return { symbol, balance };
  } catch (error) {
    throw error;
  }
};
