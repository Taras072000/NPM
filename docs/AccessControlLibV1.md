# AccessControlLibV1.sol

View Source: [contracts/libraries/AccessControlLibV1.sol](../contracts/libraries/AccessControlLibV1.sol)

**AccessControlLibV1**

## Contract Members
**Constants & Variables**

```js
bytes32 public constant NS_ROLES_ADMIN;
bytes32 public constant NS_ROLES_COVER_MANAGER;
bytes32 public constant NS_ROLES_LIQUIDITY_MANAGER;
bytes32 public constant NS_ROLES_GOVERNANCE_AGENT;
bytes32 public constant NS_ROLES_GOVERNANCE_ADMIN;
bytes32 public constant NS_ROLES_UPGRADE_AGENT;
bytes32 public constant NS_ROLES_RECOVERY_AGENT;
bytes32 public constant NS_ROLES_PAUSE_AGENT;
bytes32 public constant NS_ROLES_UNPAUSE_AGENT;

```

## Functions

- [mustBeAdmin(IStore s)](#mustbeadmin)
- [mustBeCoverManager(IStore s)](#mustbecovermanager)
- [senderMustBeWhitelisted(IStore s)](#sendermustbewhitelisted)
- [mustBeLiquidityManager(IStore s)](#mustbeliquiditymanager)
- [mustBeGovernanceAgent(IStore s)](#mustbegovernanceagent)
- [mustBeGovernanceAdmin(IStore s)](#mustbegovernanceadmin)
- [mustBeUpgradeAgent(IStore s)](#mustbeupgradeagent)
- [mustBeRecoveryAgent(IStore s)](#mustberecoveryagent)
- [mustBePauseAgent(IStore s)](#mustbepauseagent)
- [mustBeUnpauseAgent(IStore s)](#mustbeunpauseagent)
- [_mustHaveAccess(IStore s, bytes32 role)](#_musthaveaccess)
- [hasAccess(IStore s, bytes32 role, address user)](#hasaccess)

### mustBeAdmin

Reverts if the sender is not the protocol admin.

```solidity
function mustBeAdmin(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeAdmin(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_ADMIN);
  }
```
</details>

### mustBeCoverManager

Reverts if the sender is not the cover manager.

```solidity
function mustBeCoverManager(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeCoverManager(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_COVER_MANAGER);
  }
```
</details>

### senderMustBeWhitelisted

Reverts if the sender is not the cover manager.

```solidity
function senderMustBeWhitelisted(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function senderMustBeWhitelisted(IStore s) public view {
    require(s.getAddressBooleanByKey(ProtoUtilV1.NS_COVER_WHITELIST, msg.sender), "Not whitelisted");
  }
```
</details>

### mustBeLiquidityManager

Reverts if the sender is not the liquidity manager.

```solidity
function mustBeLiquidityManager(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeLiquidityManager(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_LIQUIDITY_MANAGER);
  }
```
</details>

### mustBeGovernanceAgent

Reverts if the sender is not a governance agent.

```solidity
function mustBeGovernanceAgent(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeGovernanceAgent(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_GOVERNANCE_AGENT);
  }
```
</details>

### mustBeGovernanceAdmin

Reverts if the sender is not a governance admin.

```solidity
function mustBeGovernanceAdmin(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeGovernanceAdmin(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_GOVERNANCE_ADMIN);
  }
```
</details>

### mustBeUpgradeAgent

Reverts if the sender is not an upgrade agent.

```solidity
function mustBeUpgradeAgent(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeUpgradeAgent(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_UPGRADE_AGENT);
  }
```
</details>

### mustBeRecoveryAgent

Reverts if the sender is not a recovery agent.

```solidity
function mustBeRecoveryAgent(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeRecoveryAgent(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_RECOVERY_AGENT);
  }
```
</details>

### mustBePauseAgent

Reverts if the sender is not the pause agent.

```solidity
function mustBePauseAgent(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBePauseAgent(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_PAUSE_AGENT);
  }
```
</details>

### mustBeUnpauseAgent

Reverts if the sender is not the unpause agent.

```solidity
function mustBeUnpauseAgent(IStore s) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mustBeUnpauseAgent(IStore s) public view {
    _mustHaveAccess(s, NS_ROLES_UNPAUSE_AGENT);
  }
```
</details>

### _mustHaveAccess

Reverts if the sender does not have access to the given role.

```solidity
function _mustHaveAccess(IStore s, bytes32 role) private view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 
| role | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _mustHaveAccess(IStore s, bytes32 role) private view {
    require(hasAccess(s, role, msg.sender), "Forbidden");
  }
```
</details>

### hasAccess

Checks if a given user has access to the given role

```solidity
function hasAccess(IStore s, bytes32 role, address user) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| s | IStore |  | 
| role | bytes32 | Specify the role name | 
| user | address | Enter the user account | 

**Returns**

Returns true if the user is a member of the specified role

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function hasAccess(
    IStore s,
    bytes32 role,
    address user
  ) public view returns (bool) {
    address protocol = s.getProtocolAddress();

    // The protocol is not deployed yet. Therefore, no role to check
    if (protocol == address(0)) {
      return false;
    }

    // You must have the same role in the protocol contract if you're don't have this role here
    return IAccessControl(protocol).hasRole(role, user);
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