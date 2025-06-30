import chalk from 'chalk';
import cj from "color-json"

import { ExtendedCommand } from '../../lib/oclif/base.js'
import { deviceStatusHelper } from '../../lib/oclif/helpers.js';
import { SwapperMachineManager } from '../../lib/swapper.js';

export default class QMList extends ExtendedCommand<typeof QMList> {
  static override aliases = ["qm:list"];
  static override description = 'View list of all swappable QMs';
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  override internalFlags = {
    exposeAccess: true,
  };

  public async run(): Promise<void> {
    if (this.jsonEnabled()) {
      const list = await this.commandTools.swapper?.all(true);
      if (list?.data?.length === 0) {
        this.toErrorJson({
          error: "No QMs found",
          success: false
        });
        return;
      }

      ;

      return this.toSuccessJson(list);
    }

    ;

    const list = await this.commandTools.swapper?.all();

    if (list?.length === 0) {
      this.error(cj({
        error: "No QMs found",
        success: false
      }));
      return;
    }

    ;


    this.log(chalk.bold(`Overview: Swappable QMs`));
    list?.sort((a: SwapperMachineManager) => a?.status === "running" ? -1 : 1).forEach((device: SwapperMachineManager) => {
      // check if this device is the last in the array
      const isLast = list?.length === list?.indexOf(device) + 1;

      this.log(deviceStatusHelper(`Device ${device?.id} (${device?.friendlyName})`, device?.status === "running" ? chalk.green(device?.status) : chalk.red(device?.status), { isLast, level: 1 }));
    });

    this.log("\n" + chalk.gray(`To view all commands related to QMs, run ${chalk.bold(`${this.config.bin} ${this.id} --help`)}`));
  }
}
