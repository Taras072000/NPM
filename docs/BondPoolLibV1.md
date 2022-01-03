# BondPoolLibV1.sol

View Source: [contracts/libraries/BondPoolLibV1.sol](../contracts/libraries/BondPoolLibV1.sol)

**BondPoolLibV1**

## Contract Members
**Constants & Variables**

```js
bytes32 public constant NS_BOND_TO_CLAIM;
bytes32 public constant NS_BOND_CONTRIBUTION;
bytes32 public constant NS_BOND_LP_TOKEN;
bytes32 public constant NS_LQ_TREASURY;
bytes32 public constant NS_BOND_DISCOUNT_RATE;
bytes32 public constant NS_BOND_MAX_UNIT;
bytes32 public constant NS_BOND_VESTING_TERM;
bytes32 public constant NS_BOND_UNLOCK_DATE;
bytes32 public constant NS_BOND_TOTAL_NPM_ALLOCATED;
bytes32 public constant NS_BOND_TOTAL_NPM_DISTRIBUTED;

```

## Functions

- [calculateTokensForLpInternal(uint256 lpTokens)](#calculatetokensforlpinternal)
- [getNpmMarketPrice()](#getnpmmarketprice)
- [getBondPoolInfoInternal(IStore s)](#getbondpoolinfointernal)
- [createBondInternal(IStore s, uint256 lpTokens, uint256 minNpmDesired)](#createbondinternal)
- [claimBondInternal(IStore s)](#claimbondinternal)
- [setupBondPoolInternal(IStore s, address[] addresses, uint256[] values)](#setupbondpoolinternal)

### calculateTokensForLpInternal

```solidity
function calculateTokensForLpInternal(uint256 lpTokens) public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| lpTokens | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function calculateTokensForLpInternal(uint256 lpTokens) public pure returns (uint256) {
    // @todo: implement this function
    return 3 * lpTokens;
  }
```
</details>

### getNpmMarketPrice

```solidity
function getNpmMarketPrice() public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getNpmMarketPrice() public pure returns (uint256) {
    // @todo
    return 2 ether;
  }
```
</details>

### getBondPoolInfoInternal

```solidity
function getBondPoolInfoInternal(IStore s) external view
returns(addresses address[], values uint256[])
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getBondPoolInfoInternal(IStore s) external view returns (address[] memory addresses, uint256[] memory values) {
    addresses = new address[](1);
    values = new uint256[](7);

    addresses[0] = s.getAddressByKey(BondPoolLibV1.NS_BOND_LP_TOKEN); // lpToken

    values[0] = getNpmMarketPrice(); // marketPrice
    values[1] = s.getUintByKey(NS_BOND_DISCOUNT_RATE); // discountRate
    values[2] = s.getUintByKey(NS_BOND_VESTING_TERM); // vestingTerm
    values[3] = s.getUintByKey(NS_BOND_MAX_UNIT); // maxBond
    values[4] = s.getUintByKey(NS_BOND_TOTAL_NPM_ALLOCATED); // totalNpmAllocated
    values[5] = s.getUintByKey(NS_BOND_TOTAL_NPM_DISTRIBUTED); // totalNpmDistributed
    values[6] = IERC20(s.npmToken()).balanceOf(address(this)); // npmAvailable
  }
```
</details>

### createBondInternal

```solidity
function createBondInternal(IStore s, uint256 lpTokens, uint256 minNpmDesired) external nonpayable
returns(values uint256[])
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 
| lpTokens | uint256 |  | 
| minNpmDesired | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function createBondInternal(
    IStore s,
    uint256 lpTokens,
    uint256 minNpmDesired
  ) external returns (uint256[] memory values) {
    s.mustNotBePaused();

    values = new uint256[](2);
    values[0] = calculateTokensForLpInternal(lpTokens); // npmToVest

    require(minNpmDesired > 0, "Invalid value: `minNpmDesired`");
    require(values[0] >= minNpmDesired, "Min bond `minNpmDesired` failed");

    // Pull the tokens from the requester's account
    IERC20(s.getAddressByKey(BondPoolLibV1.NS_BOND_LP_TOKEN)).ensureTransferFrom(msg.sender, s.getAddressByKey(BondPoolLibV1.NS_LQ_TREASURY), lpTokens);

    // To claim later
    bytes32 k = keccak256(abi.encodePacked(BondPoolLibV1.NS_BOND_TO_CLAIM, msg.sender));
    s.addUintByKey(k, values[0]);

    // Amount contributed
    k = keccak256(abi.encodePacked(BondPoolLibV1.NS_BOND_CONTRIBUTION, msg.sender));
    s.addUintByKey(k, lpTokens);

    // unlock date
    values[1] = block.timestamp + s.getUintByKey(BondPoolLibV1.NS_BOND_VESTING_TERM); // solhint-disable-line

    // Unlock date
    k = keccak256(abi.encodePacked(BondPoolLibV1.NS_BOND_UNLOCK_DATE, msg.sender));
    s.setUintByKey(k, values[1]);
  }
```
</details>

### claimBondInternal

```solidity
function claimBondInternal(IStore s) external nonpayable
returns(values uint256[])
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function claimBondInternal(IStore s) external returns (uint256[] memory values) {
    s.mustNotBePaused();

    values = new uint256[](1);

    bytes32 k = keccak256(abi.encodePacked(BondPoolLibV1.NS_BOND_TO_CLAIM, msg.sender));
    values[0] = s.getUintByKey(k); // npmToTransfer

    // Clear the claim amount
    s.setUintByKey(k, 0);

    // Unlock date
    k = keccak256(abi.encodePacked(BondPoolLibV1.NS_BOND_UNLOCK_DATE, msg.sender));
    uint256 unlocksOn = s.getUintByKey(k);

    // Clear the unlock date
    s.setUintByKey(k, 0);

    require(block.timestamp >= unlocksOn, "Still vesting"); // solhint-disable-line
    require(values[0] > 0, "Nothing to claim");

    s.addUintByKey(BondPoolLibV1.NS_BOND_TOTAL_NPM_DISTRIBUTED, values[0]);
    IERC20(s.npmToken()).ensureTransfer(msg.sender, values[0]);
  }
```
</details>

### setupBondPoolInternal

Sets up the bond pool

```solidity
function setupBondPoolInternal(IStore s, address[] addresses, uint256[] values) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore | Provide an instance of the store | 
| addresses | address[] | [0] - LP Token Address | 
| values | uint256[] | [0] - Bond Discount Rate | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setupBondPoolInternal(
    IStore s,
    address[] memory addresses,
    uint256[] memory values
  ) external {
    s.mustNotBePaused();
    s.mustBeAdmin();

    if (addresses[0] != address(0)) {
      s.setAddressByKey(BondPoolLibV1.NS_BOND_LP_TOKEN, addresses[0]);
    }

    if (addresses[1] != address(0)) {
      s.setAddressByKey(BondPoolLibV1.NS_LQ_TREASURY, addresses[1]);
    }

    if (values[0] > 0) {
      s.setUintByKey(BondPoolLibV1.NS_BOND_DISCOUNT_RATE, values[0]);
    }

    if (values[1] > 0) {
      s.setUintByKey(BondPoolLibV1.NS_BOND_MAX_UNIT, values[1]);
    }

    if (values[2] > 0) {
      s.setUintByKey(BondPoolLibV1.NS_BOND_VESTING_TERM, values[2]);
    }

    if (values[3] > 0) {
      IERC20(s.npmToken()).ensureTransferFrom(msg.sender, address(this), values[3]);
      s.addUintByKey(BondPoolLibV1.NS_BOND_TOTAL_NPM_ALLOCATED, values[3]);
    }
  }
```
</details>

## Contracts

* [AccessControl](AccessControl.md)
* [AccessControlLibV1](AccessControlLibV1.md)
* [Address](Address.md)
* [BaseLibV1](BaseLibV1.md)
* [BokkyPooBahsDateTimeLibrary](BokkyPooBahsDateTimeLibrary.md)
* [BondPool](BondPool.md)
* [BondPoolBase](BondPoolBase.md)
* [BondPoolLibV1](BondPoolLibV1.md)
* [Context](Context.md)
* [Controller](Controller.md)
* [Cover](Cover.md)
* [CoverBase](CoverBase.md)
* [CoverProvision](CoverProvision.md)
* [CoverReassurance](CoverReassurance.md)
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
* [FakeUniswapPair](FakeUniswapPair.md)
* [FakeUniswapV2RouterLike](FakeUniswapV2RouterLike.md)
* [Finalization](Finalization.md)
* [Governance](Governance.md)
* [GovernanceUtilV1](GovernanceUtilV1.md)
* [IAccessControl](IAccessControl.md)
* [IBondPool](IBondPool.md)
* [IClaimsProcessor](IClaimsProcessor.md)
* [ICommission](ICommission.md)
* [ICover](ICover.md)
* [ICoverProvision](ICoverProvision.md)
* [ICoverReassurance](ICoverReassurance.md)
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
* [IStakingPools](IStakingPools.md)
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
* [StakingPoolBase](StakingPoolBase.md)
* [StakingPoolInfo](StakingPoolInfo.md)
* [StakingPoolLibV1](StakingPoolLibV1.md)
* [StakingPoolReward](StakingPoolReward.md)
* [StakingPools](StakingPools.md)
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