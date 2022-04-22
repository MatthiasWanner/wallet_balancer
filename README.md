# Web 3 utils

This package contain some utils to help you make simple web 3 operations (Checking wallet balance, send transactions).  
It will be improved as I need it.

## List of utils

- getWalletBalance that return ERC20 or ERC721 token balance and symbol for a given Metamask provider.
- sendErc20Transaction that call the transfer function of a given ERC20 contract address.
- checkErc20Allowane that return the amount of tokens approved by a wallet for a spender contract.
- giveErc20Allowance to approve an ERC20 token amount to a spender.

## Examples

> ⚠️ Before you launch the function, make sure you are connected to **_the right network_** where the contract is deployed
>
> 💡 With Metamask, you can call 👇

```js
const chainId = '0x3'; // Ropsten testnet chainId

await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId }] // chainId must be in hexadecimal numbers
});
```

#### Retrieve your wallet account balance of a given ERC20 token

```js
import { getWalletBalance } from '@matthias_wanner/web3_utils';
import { ContractType } from '@matthias_wanner/web3_utils/types';

const contractAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab'; // WETH contract address on rospten network
const windowEthereum = window.ethereum; // Requires the Metamask extension installed on your browser
const contractType: ContractType = 'erc20'; // can also be erc721

getWalletBalance({
  contractAddress,
  windowEthereum,
  contractType
}).then((balanceInfos) => {
  console.log(balanceInfos);
});

// Output { balance: 0.558985654218484596, symbol: WETH }
```

#### Send ERC20 tokens to another wallet

```js
import { sendErc20Transaction } from '@matthias_wanner/web3_utils';

const amount = 1000000000000000000; // to send 1 ERC20 token with 18 decimals (1 * 10 ** 18)
const contractAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab'; // WETH contract addresss on Ropsten testnet
const windowEthereum = window.ethereum; // requires the Metamask extension installed on your browser
const receiverAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // destination wallet address

sendErc20Transaction({
  amount,
  contractAddress,
  windowEthereum,
  receiverAddress
}).then((txHash) => {
  console.log(txHash);
});

// Output the transaction hash immediatly (will be out of date if the transaction is speed up after the signature)
// txHash: "0x0000e44d86e700000e705000000a50835639a9aec0000d582fe8010000e8eed6"
```

#### Check ERC20 Allowance

```js
import { checkErc20Allowance } from '@matthias_wanner/web3_utils';

const windowEthereum = window.ethereum; // requires the Metamask extension installed on your browser
const tokenContractAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // the ERC20 contract address
const spenderAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // The contract for which you want to verify approval
const ownerAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // the wallet address you want to check

checkErc20Allowance(
  windowEthereum,
  tokenContractAddress,
  spenderAddress,
  ownerAddress
).then((approvedAmount) => {
  console.log(approvedAmount);
});

// Output the amount of token approved by a wallet for a spender
// approvedAmount: 1000000000000000000000 if there is 1000 tokens with 18 decimals approved
```

#### Approve ERC20

```js
import { giveErc20Allowance } from '@matthias_wanner/web3_utils';

const windowEthereum = window.ethereum; // requires the Metamask extension installed on your browser
const tokenContractAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // the ERC20 contract address
const spenderAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // The contract for which you want to verify approval
const amount = 10000; // The total amount you want to approve without decimals operator
const waitForTx = true; // Say if you wait the end of transaction before returning defiitive txHash or not. false if not provided

giveErc20Allowance(
  windowEthereum,
  tokenContractAddress,
  spenderAddress,
  1000,
  waitForTx
).then((txHash) => {
  console.log(txHash);
});

// Output the transaction hash. If you don't provide waitForTx param or set it to false, the hash will be returned immediatly (will be out of date if the transaction is speed up after the signature).
// txHash: "0x0000e44d86e700000e705000000a50835639a9aec0000d582fe8010000e8eed6".
```
