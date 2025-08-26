const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const Repo = require("./models/Repo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/search", async (req, res) => {
  try {
    const { keyword, page = 1, perPage = 10 } = req.body;

    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${keyword}&per_page=${perPage}&page=${page}`
    );

    const repos = response.data.items.map((r) => ({
      name: r.full_name,
      html_url: r.html_url,
      description: r.description,
      stars: r.stargazers_count,
    }));

    await Repo.insertMany(repos, { ordered: false }).catch(() => {});

    res.json({ success: true, repos });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "API Fetch Failed" });
  }
});

app.get("/api/repos", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const repos = await Repo.find()
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Repo.countDocuments();

  res.json({
    data: repos,
    total,
    page,
    perPage,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
