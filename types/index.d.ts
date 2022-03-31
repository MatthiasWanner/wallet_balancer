import { Contract, providers } from 'ethers';

declare module '@dc_tools/web3_utils';

export interface IContractInfos {
  symbol: string;
  decimals?: number;
  contract: Contract;
}

export type ERC20ContractInfos = Required<IContractInfos>;

export type ERC721ContractInfos = IContractInfos;

export type ContractType = 'erc20' | 'erc721';

export interface IGetWalletBalanceArgs {
  contractAddress: string;
  windowEthereum: providers.ExternalProvider;
  contractType: ContractType;
}

export interface IGetContractInfosArgs
  extends Omit<IGetWalletBalanceArgs, 'windowEthereum'> {
  provider: providers.Web3Provider;
}

export interface ISendErc20TokensArgs {
  contractAddress: string;
  windowEthereum: providers.ExternalProvider;
  amount: number;
  receiverAddress: string;
}

export interface IWalletTokenBalance {
  symbol: string;
  balance: string;
}
