# Vault POD (Proof of Deposit) (VaultBase.sol)

View Source: [contracts/core/liquidity/VaultBase.sol](../contracts/core/liquidity/VaultBase.sol)

**↗ Extends: [IVault](IVault.md), [Recoverable](Recoverable.md), [ERC20](ERC20.md)**
**↘ Derived Contracts: [Vault](Vault.md)**

**VaultBase**

The VaultPod has `_mintPods` and `_redeemPods` features which enables
 POD minting and burning on demand. <br /> <br />
 **How Does This Work?**
 When you add liquidity to the Vault,
 PODs are minted representing your proportional share of the pool.
 Similarly, when you redeem your PODs, you get your proportional
 share of the Vault liquidity back, burning the PODs.

## Contract Members
**Constants & Variables**

```js
bytes32 public key;
address public lqt;

```

## Functions

- [constructor(IStore store, bytes32 coverKey, IERC20 liquidityToken)](#)
- [addLiquidityInternal(bytes32 coverKey, address account, uint256 amount)](#addliquidityinternal)
- [transferGovernance(bytes32 coverKey, address to, uint256 amount)](#transfergovernance)
- [addLiquidity(bytes32 coverKey, uint256 amount)](#addliquidity)
- [removeLiquidity(bytes32 coverKey, uint256 podsToRedeem)](#removeliquidity)
- [_addLiquidity(bytes32 coverKey, address account, uint256 amount, bool initialLiquidity)](#_addliquidity)
- [version()](#version)
- [getName()](#getname)

### 

Constructs this contract

```solidity
function (IStore store, bytes32 coverKey, IERC20 liquidityToken) internal nonpayable ERC20 Recoverable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| store | IStore | Provide the store contract instance | 
| coverKey | bytes32 | Enter the cover key or cover this contract is related to | 
| liquidityToken | IERC20 | Provide the liquidity token instance for this Vault | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(
    IStore store,
    bytes32 coverKey,
    IERC20 liquidityToken
  ) ERC20("Proof of Deposits", "PODs") Recoverable(store) {
    key = coverKey;
    lqt = address(liquidityToken);
  }
```
</details>

### addLiquidityInternal

Adds liquidity to the specified cover contract

```solidity
function addLiquidityInternal(bytes32 coverKey, address account, uint256 amount) external nonpayable nonReentrant 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| account | address | Specify the account on behalf of which the liquidity is being added. | 
| amount | uint256 | Enter the amount of liquidity token to supply. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addLiquidityInternal(
    bytes32 coverKey,
    address account,
    uint256 amount
  ) external override nonReentrant {
    s.mustNotBePaused();
    s.mustBeValidCover(key);
    s.callerMustBeCoverContract();

    _addLiquidity(coverKey, account, amount, true);
  }
```
</details>

### transferGovernance

```solidity
function transferGovernance(bytes32 coverKey, address to, uint256 amount) external nonpayable nonReentrant 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 |  | 
| to | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function transferGovernance(
    bytes32 coverKey,
    address to,
    uint256 amount
  ) external override nonReentrant {
    s.mustNotBePaused();
    s.callerMustBeClaimsProcessorContract();
    require(coverKey == key, "Forbidden");

    IERC20(lqt).ensureTransfer(to, amount);
    emit GovernanceTransfer(to, amount);
  }
```
</details>

### addLiquidity

Adds liquidity to the specified cover contract

```solidity
function addLiquidity(bytes32 coverKey, uint256 amount) external nonpayable nonReentrant 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| amount | uint256 | Enter the amount of liquidity token to supply. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addLiquidity(bytes32 coverKey, uint256 amount) external override nonReentrant {
    s.mustNotBePaused();
    s.mustBeValidCover(key);

    _addLiquidity(coverKey, msg.sender, amount, false);
  }
```
</details>

### removeLiquidity

Removes liquidity from the specified cover contract

```solidity
function removeLiquidity(bytes32 coverKey, uint256 podsToRedeem) external nonpayable nonReentrant 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| podsToRedeem | uint256 | Enter the amount of pods to redeem | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function removeLiquidity(bytes32 coverKey, uint256 podsToRedeem) external override nonReentrant {
    s.mustNotBePaused();
    require(coverKey == key, "Forbidden");
    uint256 released = VaultLibV1.removeLiquidity(s, coverKey, address(this), lqt, podsToRedeem);

    emit PodsRedeemed(msg.sender, podsToRedeem, released);
  }
```
</details>

### _addLiquidity

Adds liquidity to the specified cover contract

```solidity
function _addLiquidity(bytes32 coverKey, address account, uint256 amount, bool initialLiquidity) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| account | address | Specify the account on behalf of which the liquidity is being added. | 
| amount | uint256 | Enter the amount of liquidity token to supply. | 
| initialLiquidity | bool |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _addLiquidity(
    bytes32 coverKey,
    address account,
    uint256 amount,
    bool initialLiquidity
  ) private {
    require(coverKey == key, "Forbidden");

    uint256 podsToMint = VaultLibV1.addLiquidity(s, coverKey, address(this), lqt, account, amount, initialLiquidity);
    super._mint(account, podsToMint);

    emit PodsIssued(account, podsToMint, amount);
  }
```
</details>

### version

Version number of this contract

```solidity
function version() external pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function version() external pure override returns (bytes32) {
    return "v0.1";
  }
```
</details>

### getName

Name of this contract

```solidity
function getName() public pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getName() public pure override returns (bytes32) {
    return ProtoUtilV1.CNAME_LIQUIDITY_VAULT;
  }
```
</details>

## Contracts

* [AccessControl](AccessControl.md)
* [AccessControlLibV1](AccessControlLibV1.md)
* [Address](Address.md)
* [BaseLibV1](BaseLibV1.md)
* [BokkyPooBahsDateTimeLibrary](BokkyPooBahsDateTimeLibrary.md)
* [Commission](Commission.md)
* [Context](Context.md)
* [Controller](Controller.md)
* [Cover](Cover.md)
* [CoverAssurance](CoverAssurance.md)
* [CoverBase](CoverBase.md)
* [CoverProvision](CoverProvision.md)
* [CoverStake](CoverStake.md)
* [CoverUtilV1](CoverUtilV1.md)
* [cxToken](cxToken.md)
* [cxTokenFactory](cxTokenFactory.md)
* [cxTokenFactoryLibV1](cxTokenFactoryLibV1.md)
* [Destroyable](Destroyable.md)
* [ERC165](ERC165.md)
* [ERC20](ERC20.md)
* [FakeRecoverable](FakeRecoverable.md)
* [FakeStore](FakeStore.md)
* [FakeToken](FakeToken.md)
* [FakeUniswapV2RouterLike](FakeUniswapV2RouterLike.md)
* [Finalization](Finalization.md)
* [Governance](Governance.md)
* [GovernanceUtilV1](GovernanceUtilV1.md)
* [IAccessControl](IAccessControl.md)
* [IClaimsProcessor](IClaimsProcessor.md)
* [ICommission](ICommission.md)
* [ICover](ICover.md)
* [ICoverAssurance](ICoverAssurance.md)
* [ICoverProvision](ICoverProvision.md)
* [ICoverStake](ICoverStake.md)
* [ICxToken](ICxToken.md)
* [ICxTokenFactory](ICxTokenFactory.md)
* [IERC165](IERC165.md)
* [IERC20](IERC20.md)
* [IERC20Metadata](IERC20Metadata.md)
* [IFinalization](IFinalization.md)
* [IGovernance](IGovernance.md)
* [IMember](IMember.md)
* [IPausable](IPausable.md)
* [IPolicy](IPolicy.md)
* [IPolicyAdmin](IPolicyAdmin.md)
* [IPriceDiscovery](IPriceDiscovery.md)
* [IProtocol](IProtocol.md)
* [IReporter](IReporter.md)
* [IResolution](IResolution.md)
* [IResolvable](IResolvable.md)
* [IStore](IStore.md)
* [IUniswapV2PairLike](IUniswapV2PairLike.md)
* [IUniswapV2RouterLike](IUniswapV2RouterLike.md)
* [IUnstakable](IUnstakable.md)
* [IVault](IVault.md)
* [IVaultFactory](IVaultFactory.md)
* [IWitness](IWitness.md)
* [MaliciousToken](MaliciousToken.md)
* [Migrations](Migrations.md)
* [NTransferUtilV2](NTransferUtilV2.md)
* [NTransferUtilV2Intermediate](NTransferUtilV2Intermediate.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [Policy](Policy.md)
* [PolicyAdmin](PolicyAdmin.md)
* [PolicyManager](PolicyManager.md)
* [PriceDiscovery](PriceDiscovery.md)
* [Processor](Processor.md)
* [ProtoBase](ProtoBase.md)
* [Protocol](Protocol.md)
* [ProtoUtilV1](ProtoUtilV1.md)
* [Recoverable](Recoverable.md)
* [ReentrancyGuard](ReentrancyGuard.md)
* [RegistryLibV1](RegistryLibV1.md)
* [Reporter](Reporter.md)
* [Resolution](Resolution.md)
* [Resolvable](Resolvable.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [Store](Store.md)
* [StoreBase](StoreBase.md)
* [StoreKeyUtil](StoreKeyUtil.md)
* [Strings](Strings.md)
* [Unstakable](Unstakable.md)
* [ValidationLibV1](ValidationLibV1.md)
* [Vault](Vault.md)
* [VaultBase](VaultBase.md)
* [VaultFactory](VaultFactory.md)
* [VaultFactoryLibV1](VaultFactoryLibV1.md)
* [VaultLibV1](VaultLibV1.md)
* [Witness](Witness.md)