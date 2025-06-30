import { Args } from '@oclif/core'
import chalk from 'chalk';
import cj from "color-json"

import { ExtendedCommand } from '../../lib/oclif/base.js'
import { deviceStatusHelper, generateSpacingPrefix } from '../../lib/oclif/helpers.js';
import { SwapperMachineManager } from '../../lib/swapper.js';

export default class QMSwap extends ExtendedCommand<typeof QMSwap> {
  static override aliases = ["qm:swap"];
  static override args = {
    qmid: Args.integer({
      description: "The ID of the QM to swap to",
      required: true
    })
  };
  static override description = 'Swap the active QM'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  override internalFlags = {
    exposeAccess: true,
  };

  public async run(): Promise<void> {
    const list = await this.commandTools.swapper?.all();

    if (!list?.length) {
      const err = {
        error: "No QMs found",
        success: false
      };
      this.toErrorJson(err);
      this.error(cj(err));
      return;
    }

    ;

    // find the QM with the given ID
    const swapper: SwapperMachineManager = list?.find((qm: SwapperMachineManager) => Number(qm?.id) === this.args.qmid);
    if (!swapper) {
      const err = {
        error: "No QM found with the given ID",
        success: false
      };
      this.toErrorJson(err);
      this.error(cj(err));
      return;
    }

    ;

    const overview = await swapper?.overview;
    const current = await this.commandTools.swapper?.active.overview;

    const job = {};

    if (overview?.data?.status === "running") {
      const err = {
        error: "Cannot swap to a QM that is running",
        success: false
      };
      this.toErrorJson(err);
      return this.error(cj(err));
    }

    ;

    if (this.jsonEnabled()) return this.toSuccessJson(job);

    this.log(chalk.bold(`Overview: QM ${chalk.blue(`${swapper.id} (${swapper.friendlyName})`)}`));
    this.log(deviceStatusHelper("Status", swapper?.status === "running" ? chalk.green("running") : chalk.red(swapper?.status)));
    this.log(`${generateSpacingPrefix(1, true)} ${chalk.bold("Jobs")}`);
    if (current?.success) {
      this.log(deviceStatusHelper(`Swap - Power off QM ${current?.data?.id} (${current?.data?.name})`, chalk.magenta("queued"), { isLast: false, level: 2 }));
    }

    ;
    this.log(deviceStatusHelper("Swap - Device Sync", chalk.magenta("queued"), { isLast: false, level: 2 }));
    this.log(deviceStatusHelper(`Swap - Start QM ${swapper.id} (${swapper.friendlyName})`, chalk.magenta("queued"), { isLast: true, level: 2 }));
  }
}
