import { INIT_CODE_HASH } from '../src/constants'

import { bytecode } from '@uniswap/v2-core/build/UniswapV2Pair.json'
import { keccak256 } from '@ethersproject/solidity'

const COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [`0x${bytecode}`])

//OR USE https://emn178.github.io/online-tools/keccak_256.html TO CREATE THE HASH FROM BYTES