import ky from "ky";

type ResultType<T extends boolean> = T extends true ? Record<string, any> : SwapperMachineManager[];

const handleError = (err: any) => {
  console.error(err);
  return {
    data: [],
    success: false
  };
};

export class SwapperClient {
  active: SwapperActiveManager;
  host: URL;
  prefix: string;
  secret: string;

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
    }).json().catch(handleError);

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
    const req = ky.get(`${this.swapper.prefix}/api/v1/active`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json().catch(handleError);

    return req as Promise<Record<string, any>>;
  }

  async stop(): Promise<Record<string, any>> {
    const req = ky.post(`${this.swapper.prefix}/api/v1/active/stop`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();

    return req as Promise<Record<string, any>>;
  };

  async syncDevices(): Promise<Record<string, any>> {
    const req = ky.post(`${this.swapper.prefix}/api/v1/active/sync`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();

    return req as Promise<Record<string, any>>;
  };
}

export class SwapperMachineManager {
  friendlyName?: string;
  id: string;
  status?: string;
  swapper: SwapperClient;

  constructor(swapper: SwapperClient, id: string, friendlyName?: string, status?: string) {
    this.swapper = swapper;
    this.id = id;
    this.friendlyName = friendlyName;
    this.status = status;
  };

  get overview(): Promise<Record<string, any>> {
    const req = ky.get(`${this.swapper.prefix}/api/v1/qm/${this.id}`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();

    return req as Promise<Record<string, any>>;
  };

  async swap(): Promise<Record<string, any>> {
    const req = ky.post(`${this.swapper.prefix}/api/v1/qm/${this.id}/swap`, {
      headers: {
        "Authorization": `Bearer ${this.swapper.secret}`
      }
    }).json();

    return req as Promise<Record<string, any>>;
  };
}