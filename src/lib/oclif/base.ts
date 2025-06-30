import { Command, Flags, Interfaces } from "@oclif/core";

import { SwapperClient } from "../swapper.js";

export interface InternalCommandFlags {
  exposeAccess: boolean;
};

export interface CommandTools {
  swapper?: SwapperClient;
};

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<T['flags'] & typeof ExtendedCommand['baseFlags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;


export abstract class ExtendedCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    "api-secret": Flags.string({
      description: "The API secret for the Swapper API server",
      env: "SWAPPERCTL_API_SECRET",
      helpGroup: "Swapper API"
    }),
    "api-url": Flags.string({
      description: "The URL of the Swapper API server",
      env: "SWAPPERCTL_API_URL",
      helpGroup: "Swapper API"
    }),
    "json": Flags.boolean({
      default: false,
      description: "Output in JSON format",
      helpGroup: "Output",
    }),
  }
  static enableJsonFlag = true;
  protected args!: Args<T>
  protected commandTools!: CommandTools;
  protected flags!: Flags<T>
  protected internalFlags!: InternalCommandFlags;


  public async init(): Promise<void> {
    await super.init();

    const { args, flags } = await this.parse({
      args: this.ctor.args,
      baseFlags: (super.ctor as typeof ExtendedCommand).baseFlags,
      flags: this.ctor.flags,
      strict: this.ctor.strict,
    });

    this.flags = flags as Flags<T>
    this.args = args as Args<T>
    if (this.internalFlags?.exposeAccess) {
      if (!this.flags?.["api-secret"]) {
        throw new Error("Missing Swapper access token (configure using process.env.SWAPPERCTL_API_SECRET or --api-secret)");
      } else if (!this.flags?.["api-url"]) {
        throw new Error("Missing API URL (configure using process.env.SWAPPERCTL_API_URL or --api-url)");
      }

      this.commandTools = {
        swapper: new SwapperClient({
          hostURL: this.flags["api-url"],
          secret: this.flags["api-secret"]
        })
      }
    }

    ;
  }
}