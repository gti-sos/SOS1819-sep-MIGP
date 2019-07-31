var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

app.get("/time", (req, res) => {
    res.send(new Date());
})

app.use("/", express.static(__dirname+"/public"));

app.listen(port, () => {
    console.log("Se ha abierto en el puerto "+ port);
});