import chalk from 'chalk';
import cj from "color-json"

import { ExtendedCommand } from '../../lib/oclif/base.js'
import { deviceStatusHelper, generateSpacingPrefix } from '../../lib/oclif/helpers.js';

export default class Active extends ExtendedCommand<typeof Active> {
  static override aliases = ["active:overview", "qm:active"];
  static override description = 'View the current active QM and its\' status'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  override internalFlags = {
    exposeAccess: true,
  };

  public async run(): Promise<void> {
    const swapper = await this.commandTools.swapper?.active.overview;

    if (!swapper?.success) {
      this.toErrorJson(swapper);
      this.error(cj(swapper || {}));
      return;
    }

    ;

    if (this.jsonEnabled()) return this.toSuccessJson(swapper);

    this.log(chalk.bold(`Overview: Active QM ${chalk.blue(`${swapper.data.id} (${swapper.data.name})`)}`));
    this.log(deviceStatusHelper("Status", swapper?.data?.status === "running" ? chalk.green("running") : chalk.red(swapper?.data?.status)));
    this.log(deviceStatusHelper("CPU", `${chalk.blue(swapper?.data?.cores)} vCores as ${chalk.blue(swapper?.data?.cpu)}`));
    this.log(deviceStatusHelper("Memory", Number(swapper?.data?.memory) >= 1024 ? `${chalk.blue((swapper?.data?.memory / 1024).toFixed(2))} GB` : `${chalk.blue(swapper?.data?.memory)} MB`));
    this.log(deviceStatusHelper("QEMU Agent", swapper?.data?.agent === 1 ? chalk.green("enabled") : chalk.red("disabled")));
    this.log(`${generateSpacingPrefix(1, true)} ${chalk.bold("Device Configuration")}`);

    for (const device of swapper?.data?.swapper?.devices || []) {
      const isLast = swapper?.data?.swapper?.devices?.length === (swapper?.data?.swapper?.devices?.indexOf(device) || 0) + 1;

      this.log(deviceStatusHelper(`Device ${device?.as} (${device?.value})`, device?.connectedToHost ? chalk.green("connected") : chalk.red("disconnected"), { isLast, level: 2 }));
    }

    this.log("\n" + chalk.gray(`To view commands related to the active QM, run ${chalk.bold(`${this.config.bin} ${this.id} --help`)}`));
  }
}
