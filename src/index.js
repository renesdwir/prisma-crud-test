if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await prisma.product.create({
      data: { name, price, description, image },
    });
    res.send({ message: "create data successfully", data: product });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({ where: { id } });
    res.send({ message: "delete data successfullt", data: product });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
