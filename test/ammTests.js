const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
// const { ethers } = require('ethers')
// const { ethers, upgrades } = require("hardhat");
const { parseUnits } = require("ethers")
const Web3 = require('web3')
 
const BigNumber = require('bignumber.js');
  
describe("AMM", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContractAndSetVariables() {
    const [owner, address2] = await ethers.getSigners()
    const AMM = await ethers.getContractFactory("AMM");

    
    const MyToken = await ethers.getContractFactory("MyToken");
    const usdc = await MyToken.deploy(owner.address, "USDC", "USDC");
    console.log(usdc.target, 'usdc contract')
    const usdt = await MyToken.deploy(owner.address, "USDT", "USDT");
    console.log(usdt.target, 'usdt contract')
    const amm = await AMM.deploy(usdc.target, usdt.target);
    console.log(amm.target, 'amm contract')

    return { usdc, usdt, owner, address2, amm};
    }
    it("should add decimals correctly", async function () {
        const {mytoken, owner, usdc, usdt, amm, address2} = await loadFixture(deployContractAndSetVariables)
        const x = new BigNumber(100000000000000000000000000000)
        const mintUSDC = await usdc.mint(address2.address, x.toFixed())
        const mintUSDT = await usdt.mint(address2.address, x.toFixed())

        const allowance_a = new BigNumber(5000000000000000000)
        const allowance_b = new BigNumber(9000000000000000000)
        

        const tstDepositA = new BigNumber(5000000000000000000)
        const tstDepositB = new BigNumber(9000000000000000000)
        
 
        const usdc_allowance = await usdc.connect(address2).approve(amm.target, allowance_a.toFixed())
        const usdt_allowance = await usdt.connect(address2).approve(amm.target, allowance_b.toFixed())
     
        
        const getAllowanceA = await usdt.allowance(address2, amm.target)
        const getAllowanceB = await usdc.allowance(address2, amm.target)
        console.log(getAllowanceA, 'allowance usdt')
        console.log(getAllowanceB, 'allowance usdc')

        const getBalanceA = await usdt.balanceOf(address2)
        const getBalanceB = await usdc.balanceOf(address2)
        // console.log(getBalanceA)
        // console.log(getBalanceB)
        // console.log(tstDepositA)
        // console.log(tstDepositB)
        const addLiquidity = await amm.connect(address2).addLiquidity(tstDepositA.toFixed(), tstDepositB.toFixed())
    })
    // it("testing reserves arithemetic", async function () {
    //     const {mytoken, owner, usdc, usdt, amm, address2} = await loadFixture(deployContractAndSetVariables)
    //     const xx = new BigNumber(100000000000000000000)
    //     const usdc_allowance = await usdc.connect(address2).approve(amm.target, xx.toString())
    //     const usdt_allowance = await usdt.connect(address2).approve(amm.target, xx.toString())
    //     const mintUSDC = await usdc.mint(address2.address, xx.toString())
    //     const mintUSDT = await usdt.mint(address2.address, xx.toString())
    //     const converted_usdc = Web3.utils.toWei(100, 'wei')
    //     const converted_usdt = Web3.utils.toWei(200, 'wei')
    //     const BNusdc = new BigNumber(converted_usdc) 
    //     const BNusdt = new BigNumber(converted_usdt)

    //     console.log(usdc.target, 'usdc address')
    //     console.log(address2.address)
    //     const checkAllowance = await usdc.allowance(address2.address, amm.target)
    //     console.log(checkAllowance, 'allowance')

    //     const x = BigNumber(10000000000000000000).toNumber()
    //     const y = BigNumber(20000000000000000000).toNumber()
    //     const dx = (BigNumber(10).toNumber() * 10 ** 18).toString()
    //     const dy = BigNumber((y * dx) / x).toString()
    //     // console.log(dx, 'dx')
    //     // console.log(dy, "dy")
    //     // console.log(x, 'x')
    //     // console.log(y, "y")


    //     const addLiquidity = await amm.connect(address2).addLiquidity(1, 1)
    //     console.log(addLiquidity)

    // })

    

    // it("Should add liquidity correctly", async function () {
        
    //     const {usdc, usdt, owner, address2, amm} = await loadFixture(deployContractAndSetVariables);
    //     const startUSDC = await usdc.balanceOf(address2.address)
    //     const startUSDT = await usdt.balanceOf(address2.address)
 
    //     const mintUSDC = await usdc.mint(address2.address, 1000000000000000)
    //     const mintUSDT = await usdt.mint(address2.address, 1000000000000000)

    //     const finalUSDC = await usdc.balanceOf(address2.address)
    //     const finalUSDT = await usdt.balanceOf(address2.address)
   
    //     const startReserve0 = await amm.reserve0()

    //     const usdc_allowance = await usdc.connect(address2).approve(amm.target, 1000000)
    //     const usdt_allowance = await usdt.connect(address2).approve(amm.target, 1000000)

    //     const addLiquidity = await amm.connect(address2).addLiquidity(1, 1)
    //     const finalReserve0 = await amm.reserve0()

    //     //show all available functions for a contract
    //     const interface = await amm.interface

    //     const fragments = interface.fragments
    //     const functions = fragments.filter(
    //         (fragment) => fragment.type === "function"
    //       );
    //     const listOfFunctions = functions.map((functionFragment) => functionFragment.name)
    //     // console.log(listOfFunctions)
    // })
    // it("Should swap correctly", async function () {
        
    //     const {usdc, usdt, owner, address2, amm} = await loadFixture(deployContractAndSetVariables);
    //     const mintUSDC = await usdc.mint(address2.address, 1000)
    //     const mintUSDT = await usdt.mint(address2.address, 1000)
    //     const startUSDC = await usdc.balanceOf(address2.address)
    //     const startUSDT = await usdt.balanceOf(address2.address)
    //     // console.log(Number(startUSDC), Number(startUSDT))
    //     const usdc_allowance = await usdc.connect(address2).approve(amm.target, 1000000)
    //     const usdt_allowance = await usdt.connect(address2).approve(amm.target, 1000000)
    //     const addLiquidity = await amm.connect(address2).addLiquidity(100, 100)
    //     const finalReserve0 = await amm.reserve0()
    //     // console.log(Number(finalReserve0), 'starting reserve')
    //     const swap = await amm.connect(address2).swap(usdc.target, 10)

    //     const finalUSDC = await usdc.balanceOf(address2.address)
    //     const finalUSDT = await usdt.balanceOf(address2.address)
    //     // console.log(Number(finalUSDC), Number(finalUSDT), 'final balances')

    // })
    // it("Should remove liq correctly", async function () {
        
    //     const {usdc, usdt, owner, address2, amm} = await loadFixture(deployContractAndSetVariables);
    //     const mintUSDC = await usdc.mint(address2.address, 1000)
    //     const mintUSDT = await usdt.mint(address2.address, 1000)
    //     const startUSDC = await usdc.balanceOf(address2.address)
    //     const startUSDT = await usdt.balanceOf(address2.address)
    //     console.log(Number(startUSDC), Number(startUSDT), 'usd before deposit liquidity')
    //     const usdc_allowance = await usdc.connect(address2).approve(amm.target, 1000000)
    //     const usdt_allowance = await usdt.connect(address2).approve(amm.target, 1000000)
   
    //     const addLiquidity = await amm.connect(address2).addLiquidity(100, 100)
    //     const usdcAfterDeposit = await usdc.balanceOf(address2.address)
    //     const usdtAfterDeposit = await usdt.balanceOf(address2.address)
    //     console.log(usdcAfterDeposit, usdtAfterDeposit, "usd after deposit liquidity")
    //     const beginningSharesBalance = await amm.balanceOf(address2)
    //     console.log(Number(beginningSharesBalance), 'beginningSharesBalance')
    //     const finalReserve0 = await amm.reserve0()
    //     // console.log(Number(finalReserve0), 'starting reserve')

    //     const removeLiquidity = await amm.connect(address2).removeLiquidity(100)
   
    //     const finalUSDC = await usdc.balanceOf(address2.address)
    //     const finalUSDT = await usdt.balanceOf(address2.address)
    //     console.log(Number(finalUSDC), Number(finalUSDT), 'usd balance after liquidity removal')
    //     const finalSharesBalance = await amm.balanceOf(address2)
    //     console.log(Number(finalSharesBalance))

    // })
    

  
  });