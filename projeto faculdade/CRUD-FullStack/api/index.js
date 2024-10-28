import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
