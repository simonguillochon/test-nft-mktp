// https://gist.github.com/zeuslawyer/032f61b04495ca00cfbe8d125fd4574c#file-get-seller-proceeds-js

const { ethers, network } = require("hardhat")

async function getProceeds() {
  const accounts = await ethers.getSigners()
  const [deployer, owner] = accounts

  const nftMarketplaceContract = await ethers.getContract("NftMarketplace")
  const basicNftContract = await ethers.getContract("BasicNft")

  const proceeds = await nftMarketplaceContract.getProceeds(owner.address)

  const proceedsWei = ethers.utils.formatEther(proceeds.toString())
  console.log(`Seller ${owner.address} has ${proceedsWei} eth!`)
}

getProceeds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
