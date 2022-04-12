
# Web 3 utils

This package contain some utils to help you make simple web 3 operations (Checking wallet balance, send transactions).  
It will be improved as I need it.

## List of utils

- getWalletBalance that return ERC20 or ERC721 token balance and symbol for a given Metamask provider
- sendErc20Transaction that call the transfer function of a given ERC20 contract address.

## Examples


> ⚠️ Before you launch the function, make sure you are connected to **_the right network_** where the contract is deployed  
>
> 💡 With Metamask, you can call 👇  

```js
const chainId = '0x3' // Ropsten testnet chainId

await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId }], // chainId must be in hexadecimal numbers
});
```

#### Retrieve your wallet account balance of a given ERC20 token  

```js
import { getWalletBalance } from '@matthias_wanner/web3_utils';
import { ContractType } from '@matthias_wanner/web3_utils/types';

const contractAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab'; // WETH contract address on rospten network
const windowEthereum = window.ethereum; // Requires the Metamask extension installed on your browser  
const contractType: ContractType = "erc20"; // can also be erc721

const balanceInfos = await getWalletBalance({
    contractAddress,
    windowEthereum,
    contractType,
});

// Output { balance: 0.558985654218484596, symbol: WETH }
```

#### Send ERC20 tokens to another wallet

```js
const amount = 1000000000000000000; // to send 1 ERC20 token with 18 decimals (1 * 10 ** 18)
const contractAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab'; // WETH contract addresss on Ropsten testnet
const windowEthereum = window.ethereum; // requires the Metamask extension installed on your browser 
const receiverAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'; // destination wallet address

const txHash = await sendErc20Transaction({
    amount,
    contractAddress,
    windowEthereum,
    receiverAddress,
});

// Output the transaction hash immediatly (will be out of date if the transaction is speed up after the signature)
// txHash: "0x0000e44d86e700000e705000000a50835639a9aec0000d582fe8010000e8eed6"
```