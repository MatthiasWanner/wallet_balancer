import { Contract, providers } from 'ethers';

export interface IContractInfos {
  symbol: string;
  decimals?: number;
  contract: Contract;
}

export type ERC20ContractInfos = Required<IContractInfos>;

export type ERC721ContractInfos = IContractInfos;

export type ContractTypes = 'erc20' | 'erc721';

export interface IGetWalletBalanceArgs {
  contractAddress: string;
  windowEthereum: providers.ExternalProvider;
  contractType: ContractTypes;
}

export interface IGetContractInfosArgs
  extends Omit<IGetWalletBalanceArgs, 'windowEthereum'> {
  provider: providers.Web3Provider;
}
