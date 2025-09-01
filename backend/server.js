import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/repos", async (req, res) => {
  const { q, page = 1, per_page = 9 } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&page=${page}&per_page=${per_page}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from GitHub" });
    }

    const data = await response.json();
    res.json({
      items: data.items,
      total_count: data.total_count,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
