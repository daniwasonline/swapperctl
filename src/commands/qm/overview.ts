import { Args, Command, Flags } from '@oclif/core'
import { ExtendedCommand, Flags as ExtendedFlags } from '../../lib/oclif/Base.js'
import chalk from 'chalk';
import { deviceStatusHelper, generateSpacingPrefix } from '../../lib/oclif/helpers.js';
import cj from "color-json"
import { SwapperMachineManager } from '../../lib/swapper.js';

export default class QM extends ExtendedCommand<typeof QM> {
  override internalFlags = {
    exposeAccess: true,
  };

  static override description = 'View the current active QM and its\' status'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override args = {
    qmid: Args.integer({
      description: "The ID of the QM to view",
      required: true
    })
  };

  static override aliases = ["qm:overview"];

  public async run(): Promise<void> {
    const list = await this.commandTools.swapper?.all();

    if (!list?.length) {
      const err = {
        success: false,
        error: "No QMs found"
      };
      this.toErrorJson(err);
      this.error(cj(err));
      return;
    };

    // find the QM with the given ID
    const swapper: SwapperMachineManager = list?.find((qm: SwapperMachineManager) => Number(qm?.id) === this.args.qmid);
    if (!swapper) {
      const err = {
        success: false,
        error: "No QM found with the given ID"
      };
      this.toErrorJson(err);
      this.error(cj(err));
      return;
    };

    const overview = await swapper?.overview;

    if (this.jsonEnabled()) return this.toSuccessJson(overview);

    this.log(chalk.bold(`Overview: QM ${chalk.blue(`${swapper.id} (${swapper.friendlyName})`)}`));
    this.log(deviceStatusHelper("Status", swapper?.status === "running" ? chalk.green("running") : chalk.red(swapper?.status)));
    this.log(deviceStatusHelper("CPU", `${chalk.blue(overview?.data?.cores)} vCores as ${chalk.blue(overview?.data?.cpu)}`));
    this.log(deviceStatusHelper("Memory", Number(overview?.data?.memory) >= 1024 ? `${chalk.blue((overview?.data?.memory / 1024).toFixed(2))} GB` : `${chalk.blue(overview?.data?.memory)} MB`));
    this.log(deviceStatusHelper("QEMU Agent", overview?.data?.agent === 1 ? chalk.green("enabled") : chalk.red("disabled")));
    this.log(`${generateSpacingPrefix(1, true)} ${chalk.bold("Device Configuration")}`);
    overview?.data?.swapper?.devices?.forEach((device: Record<string, any>) => {
      // check if this device is the last in the array
      const isLast = overview?.data?.swapper?.devices?.length === overview?.data?.swapper?.devices?.indexOf(device) + 1;

      this.log(deviceStatusHelper(`Device ${device?.as} (${device?.value})`, device?.connectedToHost ? chalk.green("connected") : chalk.red("disconnected"), { level: 2, isLast }));
    });

    this.log("\n" + chalk.gray(`To view all commands related to QMs, run ${chalk.bold(`${this.config.bin} qm --help`)}`));
  }
}
