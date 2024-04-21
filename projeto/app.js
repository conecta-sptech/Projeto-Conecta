const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = 3333;

const app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const maquinaRouter = require("./src/routes/maquina");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/maquina", maquinaRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORT}`);
});