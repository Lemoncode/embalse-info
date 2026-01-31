import { MongoClient, type Db } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "Please define the MONGODB_CONNECTION_STRING environment variable in .env.local"
  );
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

function getClient(): MongoClient {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(connectionString);
  }
  return globalForMongo._mongoClient;
}

export function getDb(): Db {
  return getClient().db();
}
