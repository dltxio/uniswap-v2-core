# Uniswap V2

[![Actions Status](https://github.com/Uniswap/uniswap-v2-core/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-v2-core/actions)
[![Version](https://img.shields.io/npm/v/@uniswap/v2-core)](https://www.npmjs.com/package/@uniswap/v2-core)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

The built contract artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@uniswap/v2-core@latest/).

# Networks

| Contract      | Network | Contract Address                             | Owner |
| ------------- | ------- | -------------------------------------------- | ----- |
| HandleFactory | Ropsten | `0x9d839c337df3394e6D7982601762D43B97c5fBB7` |       |
| UniswapV2Pair | Ropsten | Created by the Factory                       |       |
| HandleRouter  | Ropsten | `0xE96C7987C51D187A217eCC91E9Dab658f2A8BDE2` |       |

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`
