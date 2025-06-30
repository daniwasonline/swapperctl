import { ExtendedCommand, Flags as ExtendedFlags } from '../../lib/oclif/Base.js'
import chalk from 'chalk';
import { deviceStatusHelper, generateSpacingPrefix } from '../../lib/oclif/helpers.js';
import cj from "color-json"
import { SwapperMachineManager } from '../../lib/swapper.js';

export default class QMList extends ExtendedCommand<typeof QMList> {
  override internalFlags = {
    exposeAccess: true,
  };

  static override description = 'View list of all swappable QMs';

  static override aliases = ["qm:list"];

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    if (this.jsonEnabled()) {
      const list = await this.commandTools.swapper?.all(true);
      if (list?.data?.length === 0) {
        this.toErrorJson({
          success: false,
          error: "No QMs found"
        });
        return;
      };

      return this.toSuccessJson(list);
    };

    const list = await this.commandTools.swapper?.all();

    if (list?.length === 0) {
      this.error(cj({
        success: false,
        error: "No QMs found"
      }));
      return;
    };


    this.log(chalk.bold(`Overview: Swappable QMs`));
    list?.sort((a: SwapperMachineManager) => a?.status === "running" ? -1 : 1).forEach((device: SwapperMachineManager) => {
      // check if this device is the last in the array
      const isLast = list?.length === list?.indexOf(device) + 1;

      this.log(deviceStatusHelper(`Device ${device?.id} (${device?.friendlyName})`, device?.status === "running" ? chalk.green(device?.status) : chalk.red(device?.status), { level: 1, isLast }));
    });

    this.log("\n" + chalk.gray(`To view all commands related to QMs, run ${chalk.bold(`${this.config.bin} ${this.id} --help`)}`));
  }
}
