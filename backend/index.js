const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// 首页测试
app.get("/", (req, res) => {
  res.send("Company API Running 🚀");
});

/* ========= 留言 ========= */
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  await db.query(
    "INSERT INTO contacts(name,email,message) VALUES($1,$2,$3)",
    [name, email, message]
  );

  res.json({ success: true });
});

/* ========= 产品 ========= */
app.get("/products", async (req, res) => {
  const result = await db.query("SELECT * FROM products ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/products", async (req, res) => {
  const { title, description } = req.body;

  await db.query(
    "INSERT INTO products(title,description) VALUES($1,$2)",
    [title, description]
  );

  res.json({ success: true });
});

/* ========= 后台 ========= */
app.get("/admin/messages", async (req, res) => {
  const result = await db.query("SELECT * FROM contacts ORDER BY id DESC");
  res.json(result.rows);
});

app.listen(process.env.PORT || 3000);
