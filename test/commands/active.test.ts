import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('active', () => {
  it('runs active cmd', async () => {
    const {stdout} = await runCommand('active')
    expect(stdout).to.contain('hello world')
  })

  it('runs active --name oclif', async () => {
    const {stdout} = await runCommand('active --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
