import { MongoClient } from "./EjercicioPractico/deps.ts";

const client = new MongoClient();
client.connectWithUri("your-mongodb-uri-here");
const db = client.database("petsDB");
const pets = db.collection("pets");

export const connect = async () => {
 
};

export default pets;
