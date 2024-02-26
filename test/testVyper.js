const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TestVy", function () {
  it("Should deploy TestVy contract", async function () {
    // Deploy the TestVy contract
    const TestVy = await ethers.getContractFactory("TestVy");
    // console.log(TestVy)
    const testVy = await TestVy.deploy();
    // console.log(testVy)
    // Retrieve the deployed address
    await testVy.test()

    console.log("TestVy deployed to:", testVy.address);
  });
});
  