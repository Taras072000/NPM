# CoverProvision.sol

View Source: [contracts/cover/CoverProvision.sol](../contracts/cover/CoverProvision.sol)

**↗ Extends: [IMember](IMember.md), [Recoverable](Recoverable.md)**

**CoverProvision**

## Contract Members
**Constants & Variables**

```js
contract IStore public s;

```

**Events**

```js
event ProvisionIncreased(bytes32  key, uint256  previous, uint256  current);
event ProvisionDecreased(bytes32  key, uint256  previous, uint256  current);
```

## Functions

- [increaseProvision(bytes32 key, uint256 amount)](#increaseprovision)
- [decreaseProvision(bytes32 key, uint256 amount)](#decreaseprovision)
- [getProvision(bytes32 key)](#getprovision)
- [version()](#version)
- [getName()](#getname)

### increaseProvision

```js
function increaseProvision(bytes32 key, uint256 amount) external nonpayable onlyOwner nonReentrant 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 
| amount | uint256 |  | 

### decreaseProvision

```js
function decreaseProvision(bytes32 key, uint256 amount) external nonpayable onlyOwner nonReentrant 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 
| amount | uint256 |  | 

### getProvision

```js
function getProvision(bytes32 key) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 

### version

```js
function version() external pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getName

```js
function getName() public pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [Address](Address.md)
* [Context](Context.md)
* [Cover](Cover.md)
* [CoverLiquidity](CoverLiquidity.md)
* [CoverProvision](CoverProvision.md)
* [CoverStake](CoverStake.md)
* [CoverUtilV1](CoverUtilV1.md)
* [ICover](ICover.md)
* [ICoverLiquidity](ICoverLiquidity.md)
* [ICoverStake](ICoverStake.md)
* [IERC20](IERC20.md)
* [IMember](IMember.md)
* [IProtocol](IProtocol.md)
* [IStore](IStore.md)
* [IVault](IVault.md)
* [NTransferUtilV2](NTransferUtilV2.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [Protocol](Protocol.md)
* [ProtoUtilV1](ProtoUtilV1.md)
* [Recoverable](Recoverable.md)
* [ReentrancyGuard](ReentrancyGuard.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [Vault](Vault.md)