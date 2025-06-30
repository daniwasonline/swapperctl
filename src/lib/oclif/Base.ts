import { Command, Flags, Interfaces } from "@oclif/core";
import { SwapperClient } from "../swapper.js";

export interface InternalCommandFlags {
  exposeAccess: boolean;
};

export interface CommandTools {
  swapper?: SwapperClient;
};

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof ExtendedCommand['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>


export abstract class ExtendedCommand<T extends typeof Command> extends Command {
  static enableJsonFlag = true;

  protected internalFlags!: InternalCommandFlags;
  protected commandTools!: CommandTools;
  protected flags!: Flags<T>
  protected args!: Args<T>

  static baseFlags = {
    "api-url": Flags.string({
      description: "The URL of the Swapper API server",
      helpGroup: "Swapper API",
      env: "SWAPPERCTL_API_URL"
    }),
    "api-secret": Flags.string({
      description: "The API secret for the Swapper API server",
      helpGroup: "Swapper API",
      env: "SWAPPERCTL_API_SECRET"
    }),
    "json": Flags.boolean({
      description: "Output in JSON format",
      helpGroup: "Output",
      default: false,
    }),
  }


  public async init(): Promise<void> {
    await super.init();

    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof ExtendedCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    });

    this.flags = flags as Flags<T>
    this.args = args as Args<T>
    if (this.internalFlags?.exposeAccess) {
      if (!this.flags?.["api-secret"]) {
        throw new Error("Missing Swapper access token (configure using process.env.SWAPPERCTL_API_SECRET or --api-secret)");
      } else if (!this.flags?.["api-url"]) {
        throw new Error("Missing API URL (configure using process.env.SWAPPERCTL_API_URL or --api-url)");
      };

      this.commandTools = {
        swapper: new SwapperClient({
          hostURL: this.flags["api-url"],
          secret: this.flags["api-secret"]
        })
      }
    };
  }
}