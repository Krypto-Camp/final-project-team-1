
# How To Start It? 🚀
```bash
git clone git@github.com:Krypto-Camp/final-project-team-1.git
cd final-project-team-1/backend
node -v # 16.13.0
npm install
.env.example -> .env and paste ur infura project id, account private key
npm run clean # reset the env
npm run chain # run localhost chain by hardhat, keep this process, don't close it
npm run deploy:localhost # compile and deploy contracts to localhost chain
cd ../frontend
npm install
.env.example -> .env and paste ur infura project id to VITE_INFURA_ID
npm run dev
```

#### 合約串接部分，可優先看 
`frontend/src/components/GetContract.tsx`
`frontend/src/main.tsx`

#### 合約撰寫
```
1. 於 backend/contract/ 新增合約
2. 於 scripts/deploy.js 新增部屬方法 `deployContract()`
3. npm run deploy:localhost or npm run deploy:rinkeby
4. frontend/config/contracts.ts 引入合約 address 以及 abi json file
5. 仿造 getContract.tsx 串接
```

## backend/

**folder strcuture**
```bash
- address/ # generate contract address file by deploy.js，客製寫法，避免前端要在部屬合約後一直更新合約地址
- artifacts/ # compiled contract here, use npm run clean to delete it.
- cache/ # hardhat deploy contract log, use npm run clean to remove the content in it and re-deploy ur contract.
- contracts/ # write ur smart contract here!
  - testing/ # example contract here
- external/ # 外部合約 abi
- scripts/ # scripts
  - deploy.js # script ur compiled contracts
  - mint.js # mintApe demo js
- test/ # testing contract by using ethers
- hardhat.config.js # config 
- .env # INFURA_PROJECT_ID, ACCOUNT_PRIVATE_KEY
```

**scripts**
```bash
npm run chain # run localhost chain by hardhat, keep this process, don't close it
npm run compile # compiled contract in contracts/
npm run clean # reset env
npm run console:local # run hardhat console on localhost
npm run console:rinkeby # run hardhat console on rinkeby (if need testnet, pls add a .env file)
npm run deploy:hardhat # deploy contracts on localhost chain
npm run deploy:rinkeby # deploy contracts on rinkeby
npm run deploy # deploy contracts on mainnet
```

**.env**
```bash
INFURA_PROJECT_ID='add_the_infura_project_id_here'
ACCOUNT_PRIVATE_KEY='add_ur_own_metamask_develop_account_private_key_here'
```


### frontend/
```bash
- src/
  - components/
    - GetContract.tsx # 如何操作合約參考
  - configs/contract.ts # 這裡引入合約
  - App.tsx
  - main.tsx # 這裡引入 provider
```

**scripts**
```bash
npm run dev
```

**.env**
```bash
# VITE_ALCHEMY_ID=
# VITE_ETHERSCAN_API_KEY=
VITE_INFURA_ID='09b48a01c3e346868af7d548799be03e'
```


### 使用套件
[Hardhat](https://hardhat.org/getting-started/)
\
[React Ethers Hook - Wagmi](https://wagmi-xyz.vercel.app/)
\
[Vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)
