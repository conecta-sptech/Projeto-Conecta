// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var PORT = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3000 : 80;

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const maquinaRouter = require("./src/routes/maquina");
const infraestruturaRouter = require("./src/routes/plotagem/infraestrutura");
const gestaoRouter = require("./src/routes/plotagem/gestao");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/maquina", maquinaRouter);
app.use("/infraestrutura", infraestruturaRouter);
app.use("/gestao", gestaoRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORT}`);
});
