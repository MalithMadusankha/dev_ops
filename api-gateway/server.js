const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// ROUTE: /api/users → http://localhost:5001
app.use("/api/users", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:5001${req.originalUrl.replace("/api/users", "")}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "User Service Error",
    });
  }
});

// ROUTE: /api/products → http://localhost:5002
app.use("/api/products", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:5002${req.originalUrl.replace(
        "/api/products",
        ""
      )}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Product Service Error",
    });
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
