//const express = required ('express');
import Express from 'express';

const app = Express();
app.use(Express.json());

app.get('/productos',(req, res)=>{
    console.log ('Hicieron GET en la ruta /productos');
    const productos = [
        {nombre: 'casaca', precio: 20000, cantidad: 666},
        {nombre: 'chamarra', precio: 80000, cantidad: 666},
        {nombre: 'correa balas', precio: 15000, cantidad: 666},
    ];
    res.send(productos);
});

app.post("/productos/nuevo", (req, res)=>{
    const datosProducto = req.body;
    console.log("llaves: ", Object.keys(datosProducto));
    try {
        if(
            Object.keys(datosProducto).includes('nombre') &&
            Object.keys(datosProducto).includes('precio') &&
            Object.keys(datosProducto).includes('cantidad')
        ){
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        } 
    } catch {
        res.sendStatus(500);
    }
});

app.listen(5000,()=>{
    console.log('escuchando puerto 5000');
});