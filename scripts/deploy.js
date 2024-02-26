async function main() {
  const owner = '0x83a0edD427EDC8D06c030c0fe8b1b88eb1Ee66b7'
  const amm = await ethers.getContractFactory("AMM");
  const usdc = await ethers.getContractFactory("MyToken");
  const usdt = await ethers.getContractFactory("MyToken");
  const usdc_contract = await usdc.deploy(owner, "USDC", "USDC");
  const usdt_contract = await usdt.deploy(owner, "USDT", "USDT");
  const amm_contract = await amm.deploy(usdc_contract.target, usdt_contract.target);
  // await amm_contract.deployed();
  // await usdc_contract.deployed();
  // await usdt_contract.deployed();
  console.log("amm deployed to:", amm_contract.target);
  console.log("usdc deployed to:", usdc_contract.target);
  console.log("usdt deployed to:", usdt_contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
