import { providers, utils } from 'ethers';
import { IContractInfos, IGetWalletBalanceArgs } from '../types';
import { getContractinfos } from './utils';

export const getWalletBalance = async ({
  contractAddress,
  windowEthereum,
  contractType
}: IGetWalletBalanceArgs) => {
  try {
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
