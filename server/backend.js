const express = require("express");
const { conectar } = require("./conection.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/prods", async (req, res) => {
  try {
    const db = await conectar();
    const collection = db.collection("productos");
    const documents = await collection.find({}).toArray();
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(documents, null, 2));
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/provs", async (req, res) => {
  try {
    const db = await conectar();
    const collection = db.collection("proveedores");
    const documents = await collection.find({}).toArray();
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(documents, null, 2));
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/faq", async (req, res) => {
    try {
      const db = await conectar();
      const collection = db.collection("infoEmp");
      const documents = await collection.find({}, {projection:{"faq":1}}).toArray();
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(documents, null, 2));
    } catch (error) {
      console.error("Error al obtener datos:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  });
  

app.get("/about", async (req, res) => {
  try {
    const db = await conectar();
    const collection = db.collection("productos");
    const documents = await collection.find({}).toArray();
    res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(documents, null, 2));
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor");
});

app.listen(PORT, async () => {
  try {
    await conectar(); // Intenta conectar cuando el servidor se inicia
    console.log("Servidor Express en funcionamiento en el puerto ${PORT}");
    console.log("Conexión establecida con MongoDB");
  } catch (error) {
    console.error("Error al iniciar el servidor:",error);
}
});
