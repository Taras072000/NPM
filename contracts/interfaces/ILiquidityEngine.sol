// Neptune Mutual Protocol (https://neptunemutual.com)
// SPDX-License-Identifier: BUSL-1.1
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./IMember.sol";

pragma solidity 0.8.0;

interface ILiquidityEngine is IMember {
  event StrategyAdded(address indexed strategy);
  event StrategyDisabled(address indexed strategy);
  event LendingPeriodSet(bytes32 indexed coverKey, uint256 lendingPeriod, uint256 withdrawalWindow);
  event LiquidityStateUpdateIntervalSet(uint256 duration);
  event MaxLendingRatioSet(uint256 ratio);

  function addStrategies(address[] memory strategies) external;

  function disableStrategy(address strategy) external;

  function setLendingPeriods(
    bytes32 coverKey,
    uint256 lendingPeriod,
    uint256 withdrawalWindow
  ) external;

  function setLendingPeriodsDefault(uint256 lendingPeriod, uint256 withdrawalWindow) external;

  function getLendingPeriods(bytes32 coverKey) external view returns (uint256 lendingPeriod, uint256 withdrawalWindow);

  function setLiquidityStateUpdateInterval(uint256 value) external;

  function setMaxLendingRatio(uint256 ratio) external;

  function getMaxLendingRatio() external view returns (uint256 ratio);

  function getDisabledStrategies() external view returns (address[] memory strategies);

  function getActiveStrategies() external view returns (address[] memory strategies);
}
