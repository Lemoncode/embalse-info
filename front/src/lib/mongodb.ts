import { MongoClient, type Db } from "mongodb";

//lee la URL de MongoDB de las variables de entorno
const connectionString = process.env.MONGODB_CONNECTION_STRING;
if (!connectionString) {
    throw new Error(
        "Please define the MONGODB_CONNECTION_STRING environment variable in .env.local"
    );
}
//hack de TypeScript para tipar globalThis con nuestra propiedad custom _mongoClient
const globalForMongo = globalThis as typeof globalThis & {
    _mongoClient?: MongoClient;
};

//crea el cliente solo si no existe ya (singleton)
function getClient(): MongoClient {
    if (!globalForMongo._mongoClient) {
        globalForMongo._mongoClient = new MongoClient(connectionString);
    }

    return globalForMongo._mongoClient;
}
//lo que exportamo devuelve la instancia de Db lista para hacer queries
export function getDb(): Db {
    return getClient().db();
}
