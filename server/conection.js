const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://equipomichi:ZAYpardo1997@smarthomesweepers.py87jx9.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function conectar() {
  try {
    await client.connect();
    console.log("Conexión establecida con MongoDB");
    return client.db("SMARTHOMESWEEPERS");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
}

module.exports={conectar};