const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
  
describe("Token", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContractAndSetVariables() {
      const MyToken = await ethers.getContractFactory("MyToken");
      const [owner] = await ethers.getSigners()
      const mytoken = await MyToken.deploy(owner.address);
  
      
      
  
      return { mytoken, owner};
    }
  
    it("Should deploy and set the owner correctly", async function () {
      const { mytoken, owner} = await loadFixture(deployContractAndSetVariables);
  
      
      expect(await mytoken.owner()).to.equal(owner.address);
    });
    it("Should print testing", async function () {
        const { mytoken, owner} = await loadFixture(deployContractAndSetVariables);
    
        // expect(await mytoken.mint()).to.equal();
        expect(await 1).to.equal(1)
      });
  });