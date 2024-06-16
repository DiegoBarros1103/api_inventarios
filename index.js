const express = require('express')
const { getConnection } = require('./db/db-connection-mongo');
const router = require('./router/marca');
require('dotenv').config();



const app = express();


const host =' 0.0.0.0';
const port = process.env.PORT;




getConnection();






app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use("/marca", require("./router/marca"));
app.use("/estado-equipo", require("./router/estadoEquipo"));
app.use("/tipo-equipo", require("./router/tipoEquipo"));
app.use("/inventario", require("./router/inventario"));
app.use('/auth', require('./router/auth'));




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});