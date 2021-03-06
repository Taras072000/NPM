/* eslint-disable no-unused-expressions */
const BigNumber = require('bignumber.js')
const { ethers, network } = require('hardhat')
const { helper, key } = require('../../../../util')
const { deployDependencies } = require('./deps')
const HOURS = 60 * 60

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

describe('Vault: removeLiquidity', () => {
  let deployed, coverKey, npmStake

  beforeEach(async () => {
    deployed = await deployDependencies()

    coverKey = key.toBytes32('foo-bar')
    const amount = helper.ether(10_000_000)
    npmStake = helper.ether(500)
    const referralCode = key.toBytes32('referral-code')

    await deployed.npm.approve(deployed.vault.address, npmStake)
    await deployed.dai.approve(deployed.vault.address, amount)

    const lendingPeriod = 1 * HOURS
    const withdrawalWindow = 1 * HOURS

    await deployed.liquidityEngine.setLendingPeriods(coverKey, lendingPeriod, withdrawalWindow)

    await deployed.vault.addLiquidity(coverKey, amount, npmStake, referralCode)

    await network.provider.send('evm_increaseTime', [1 * HOURS])

    await deployed.vault.accrueInterest()
  })

  it('successfully removes liquidity', async () => {
    const [owner] = await ethers.getSigners()
    const pods = helper.ether(2000)
    await deployed.vault.approve(deployed.vault.address, pods)

    const tx = await deployed.vault.removeLiquidity(coverKey, pods, npmStake, true)
    const { events } = await tx.wait()

    const event = events.find(x => x.event === 'PodsRedeemed')

    event.args.account.should.equal(owner.address)
    event.args.redeemed.should.equal(pods)
    event.args.liquidityReleased.should.equal(pods)
  })

  it('successfully removes liquidity without NPM stake removal', async () => {
    const pods = helper.ether(2000)
    await deployed.vault.approve(deployed.vault.address, pods)

    await deployed.vault.removeLiquidity(coverKey, pods, '0', false)
  })

  it('reverts when coverkey is invalid', async () => {
    const pods = helper.ether(1_000)
    await deployed.vault.approve(deployed.vault.address, pods)

    await deployed.vault.removeLiquidity(key.toBytes32('foobar'), pods, npmStake, false)
      .should.be.rejectedWith('Forbidden')
  })

  it('reverts when invalid amount is supplied', async () => {
    const pods = helper.ether(0)
    await deployed.vault.approve(deployed.vault.address, pods)

    await deployed.vault.removeLiquidity(coverKey, pods, npmStake, false)
      .should.be.rejectedWith('Please specify amount')
  })
})
