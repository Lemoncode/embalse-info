import { MongoClient, type Db } from "mongodb";

let client: MongoClient | null = null;

const connect = async (connectionURL: string) => {
  if (!client) {
    client = new MongoClient(connectionURL, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
  }
  dbServer.db = client.db();
};

const disconnect = async () => {
  if (client) {
    await client.close();
    client = null;
    dbServer.db = undefined;
  }
};

interface DBServer {
  connect: (connectionURL: string) => Promise<void>;
  disconnect: () => Promise<void>;
  db: Db | undefined;
}

export let dbServer: DBServer = {
  connect,
  disconnect,
  db: undefined,
};
