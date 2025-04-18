# 🪐 MintVerse

**MintVerse** is a Web3 NFT smart contract project built with Hardhat and OpenZeppelin. It allows users to mint ERC-721 NFTs on the Ethereum Sepolia testnet.

---

## 🔧 Built With

- [Solidity ^0.8.20](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Infura](https://infura.io/) - RPC Provider

---

## 📂 Folder Structure

```
MintVerse/
├── contracts/
│   └── NFTVerse.sol         # Main ERC-721 contract
├── scripts/
│   └── deploy.js            # Hardhat deployment script
├── test/
│   └── test.js              # Optional test file
├── .env                     # Private key and RPC URL
├── hardhat.config.js        # Hardhat setup
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/mintverse.git
cd mintverse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
```

---

## ✅ Compile & Test

```bash
npx hardhat compile
npx hardhat test
```

---

## 🚀 Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Update `deploy.js` if needed with correct constructor parameters:

```js
const NFTVerse = await ethers.getContractFactory("NFTVerse");
const nft = await NFTVerse.deploy("MintVerse", "MVNFT", owner.address);
```

---

## 🔐 Smart Contract Inheritance

- `ERC721URIStorage`
- `Ownable`

---

##



---

##

