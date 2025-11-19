import { createApp } from "./app";

const app = createApp();
const PORT:number = parseInt(process.env.PORT || "3000") ;

app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);
})