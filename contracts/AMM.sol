// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol";
 
contract AMM { 
    // using PRBMath for uint256;
    // using UD60x18 for uint256;

    IERC20 public immutable token0;
    IERC20 public immutable token1; 

    uint public reserve0;
    uint public reserve1;



    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function _mint(address _to, uint _amount) private {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }

    function _update(uint _reserve0, uint _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    function _burn(address _from, uint _amount) private {
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
    }



    function swap(address _tokenIn, uint _amountIn) external returns (uint amountOut) {
        require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );

        bool isToken0 = _tokenIn == address(token0);

        (IERC20 tokenIn, IERC20 tokenOut, uint resIn, uint resOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        tokenIn.transferFrom(msg.sender, address(this), _amountIn);
        uint amountIn = tokenIn.balanceOf(address(this)) - resIn;

        // 0.3% fee
        // amountOut = (amountIn * 997) / 1000;
        amountOut = amountIn;

        (uint res0, uint res1) = isToken0
            ? (resIn + amountIn, resOut - amountOut)
            : (resOut - amountOut, resIn + amountIn);

        _update(res0, res1);
        tokenOut.transfer(msg.sender, amountOut);
    }

    function updateShares(uint256 _amount0, 
        uint256 _amount1, 
        uint256 converted_reserve0, 
        uint256 converted_reserve1) internal returns (uint shares) {

        shares = _min(
            (_amount0 * totalSupply) / converted_reserve0,
            (_amount1 * totalSupply) / converted_reserve1
        );
        
    }

    // function testFunction() external {
    //     kjhjj
    // } 

 

    function addLiquidity(uint _amount0, uint _amount1) external returns (uint shares) {
        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);
        if (totalSupply == 0) {
            shares = _sqrt(_amount0 * _amount1);
        } else {
            // UD60x18 ud_amount0 = UD60x18.wrap(_amount0);
            UD60x18 ud_amount1 = UD60x18.wrap(_amount1);

            UD60x18 ud_reserve0 = UD60x18.wrap(reserve0);
            UD60x18 ud_reserve1 = UD60x18.wrap(reserve1);
            UD60x18 productReserve0 = ud_reserve0.mul(ud_amount1);
            // UD60x18 productReserve1 = ud_reserve1.mul(ud_amount0);

            UD60x18 slippage_tolerance = ud(100e16); // 1000 in UD60x18 represents 0.1%
            UD60x18 upperBound = productReserve0.mul(ud(100e18).add(slippage_tolerance)).div(ud(100e18));
            UD60x18 lowerBound = productReserve0.mul(ud(100e18)).div(ud(100e18).add(slippage_tolerance));

            require(productReserve0 >= lowerBound && productReserve0 <= upperBound, "exceeds upper or lower bound");
            
            uint256 converted_reserve0 = ud_reserve0.intoUint256();
            uint256 converted_reserve1 = ud_reserve1.intoUint256();
            
            // shares = updateShares(_amount0, _amount1, converted_reserve0, converted_reserve1);
            shares = updateShares(_amount0, _amount1, reserve0, reserve1);

        }
        // require(shares > 0, "shares = 0");
        _mint(msg.sender, shares);
        _update(token0.balanceOf(address(this)), token1.balanceOf(address(this)));
    }



    function _sqrt(uint y) private pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }

    function removeLiquidity(uint _shares) external returns (uint d0, uint d1) {
        d0 = (reserve0 * _shares) / totalSupply;
        d1 = (reserve1 * _shares) / totalSupply;

        _burn(msg.sender, _shares);
        _update(reserve0 - d0, reserve1 - d1);

        if (d0 > 0) {
            token0.transfer(msg.sender, d0);
        }
        if (d1 > 0) {
            token1.transfer(msg.sender, d1);
        }
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed owner, address indexed spender, uint amount);
} 