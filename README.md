# Uniswap V2

[![Actions Status](https://github.com/Uniswap/uniswap-v2-core/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-v2-core/actions)
[![Version](https://img.shields.io/npm/v/@uniswap/v2-core)](https://www.npmjs.com/package/@uniswap/v2-core)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

The built contract artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@uniswap/v2-core@latest/).

# Networks

| Contract      | Network | Contract Address                             | Owner |
| ------------- | ------- | -------------------------------------------- | ----- |
| HandleFactory | Kovan | `0x8f241c76ED026f6A64DC8FEf1D12eDdbc0F04Eb9` |       |
| UniswapV2Pair | Ropsten | Created by the Factory                       |       |
| HandleRouter  | Ropsten | `0xE96C7987C51D187A217eCC91E9Dab658f2A8BDE2` |       |

## Flattern the contracts

```bash
cd /path/to/project/files/
npx truffle-flattener contracts/HandleFactory.sol > build/contracts/HandleFactory.flattened.sol
```

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`
