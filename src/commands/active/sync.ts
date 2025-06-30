import { Args, Command, Flags } from '@oclif/core'
import { ExtendedCommand, Flags as ExtendedFlags } from '../../lib/oclif/Base.js'
import chalk from 'chalk';
import { deviceStatusHelper, generateSpacingPrefix } from '../../lib/oclif/helpers.js';
import cj from "color-json"

export default class ActiveSync extends ExtendedCommand<typeof ActiveSync> {
  override internalFlags = {
    exposeAccess: true,
  };

  static override description = 'Sync devices to the active QM'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const swapper = await this.commandTools.swapper?.active.overview;
    const job = await this.commandTools.swapper?.active.syncDevices();

    if (!job?.success) {
      this.toErrorJson(job);
      this.error(cj(job || {}));
      return;
    };

    if (this.jsonEnabled()) return this.toSuccessJson(job);

    this.log(chalk.bold(`Active QM ${chalk.blue(`${swapper?.data?.id} (${swapper?.data?.name})`)}`));
    this.log(deviceStatusHelper("Status", swapper?.data?.status === "running" ? chalk.green("running") : chalk.red(swapper?.data?.status)));
    this.log(`${generateSpacingPrefix(1, true)} ${chalk.bold("Jobs")}`);
    this.log(deviceStatusHelper("Device Sync", chalk.magenta("queued"), { level: 2, isLast: true }));
  }
}
