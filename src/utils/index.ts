import { IGetContractInfosArgs, IContractInfos } from '../../types';
import { getERC20ContractInfos } from './erc20.utils';
import { getERC721ContractInfos } from './erc721.utils';

export * from './erc20.utils';
export * from './erc721.utils';

export const getContractinfos = async ({
  contractAddress,
  provider,
  contractType
}: IGetContractInfosArgs): Promise<IContractInfos | Error> => {
  switch (contractType) {
    case 'erc20':
      return await getERC20ContractInfos(contractAddress, provider);
    case 'erc721':
      return await getERC721ContractInfos(contractAddress, provider);
    default:
      throw new Error('Contract type not supported');
  }
};
