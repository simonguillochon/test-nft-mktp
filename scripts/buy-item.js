// https://gist.github.com/zeuslawyer/032f61b04495ca00cfbe8d125fd4574c#file-buy-item-js

const { ethers } = require("hardhat");

const TOKEN_ID = 0 // SET THIS BEFORE RUNNING SCRIPT;

async function buyItem() {
  const accounts = await ethers.getSigners();
  const [deployer, owner, buyer1] = accounts;

  const IDENTITIES = {
    [deployer.address]: "DEPLOYER",
    [owner.address]: "OWNER",
    [buyer1.address]: "BUYER_1",
  };

  const nftMarketplaceContract = await ethers.getContract("NftMarketplace");
  const basicNftContract = await ethers.getContract("BasicNft");

  const listing = await nftMarketplaceContract
    .getListing(basicNftContract.address, TOKEN_ID);

  const price = listing.price.toString();
  const tx = await nftMarketplaceContract
    .connect(buyer1)
    .buyItem(basicNftContract.address, TOKEN_ID, {
      value: price,
    });
  await tx.wait(1);
  console.log("NFT Bought!");

  const newOwner = await basicNftContract.ownerOf(TOKEN_ID);
  console.log(`New owner of Token ID ${TOKEN_ID} is ${newOwner} with identity of ${IDENTITIES[newOwner]}`);
}

buyItem()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
