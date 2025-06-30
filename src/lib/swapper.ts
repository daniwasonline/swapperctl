import ky from "ky";

type ResultType<T extends boolean> = T extends true ? Record<string, any> : SwapperMachineManager[];

export class SwapperClient {
  host: URL;
  prefix: string;
  secret: string;
  active: SwapperActiveManager;
  constructor({ hostURL, secret }: { hostURL: string; secret: string }) {
    this.host = new URL(hostURL);
    this.prefix = `${this.host.protocol}//${this.host.host}`;
    this.secret = secret;
    this.active = new SwapperActiveManager(this);
  };

  async all<T extends boolean>(raw?: T): Promise<ResultType<T>> {
    const qms = await ky.get<Record<string, any>>(`${this.prefix}/api/v1/qm`, {
      headers: {
        "Authorization": `Bearer ${this.secret}`
      }
    }).json();

    if (raw) return qms as ResultType<T>;

    return qms?.data?.map((qm: Record<string, any>) => new SwapperMachineManager(this, qm.id, qm.name, qm.status));
  };
}

export class SwapperActiveManager {
  swapper: SwapperClient;
  constructor(swapper: SwapperClient) {
    this.swapper = swapper;
  }

  get overview(): Promise<Record<string, any>> {
    return ky.get(`${this.swapper.prefix}/api/v1/active`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();
  }

  async syncDevices(): Promise<Record<string, any>> {
    return ky.post(`${this.swapper.prefix}/api/v1/active/sync`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();
  };

  async stop(): Promise<Record<string, any>> {
    return ky.post(`${this.swapper.prefix}/api/v1/active/stop`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();
  };
}

export class SwapperMachineManager {
  swapper: SwapperClient;
  id: string;
  friendlyName?: string;
  status?: string;
  constructor(swapper: SwapperClient, id: string, friendlyName?: string, status?: string) {
    this.swapper = swapper;
    this.id = id;
    this.friendlyName = friendlyName;
    this.status = status;
  };

  get overview(): Promise<Record<string, any>> {
    return ky.get(`${this.swapper.prefix}/api/v1/qm/${this.id}`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();
  };

  async swap(): Promise<Record<string, any>> {
    return ky.post(`${this.swapper.prefix}/api/v1/qm/${this.id}/swap`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();
  };
}