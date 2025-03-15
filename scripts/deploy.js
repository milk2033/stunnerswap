async function main() {
  owner = "0x10f84136a1aD797ebCC1929125eb9CCe3A63a43F";
  const usdc = await ethers.getContractFactory("MyToken");
  const usdt = await ethers.getContractFactory("MyToken");
  const amm = await ethers.getContractFactory("AMM");

  console.log("deploying contracts");
  const usdc_contract = await usdc.deploy(owner, "USDC", "USDC");
  const usdt_contract = await usdc.deploy(owner, "USDT", "USDT");
  const amm_contract = await amm.deploy(
    usdt_contract.target,
    usdc_contract.target
  );

  console.log("usdc deployed to...", usdc_contract.target);
  console.log("usdt deployed to...", usdt_contract.target);
  console.log("amm deployed to...", amm_contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
