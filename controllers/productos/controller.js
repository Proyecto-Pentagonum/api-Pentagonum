import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllProducts = async (callBack) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('productos').find().limit(50).toArray(callBack);     
    };

const crearProducto = async (datosProducto, callBack) => {
        if(
            Object.keys(datosProducto).includes('nombre') &&
            Object.keys(datosProducto).includes('precio') &&
            Object.keys(datosProducto).includes('cantidad')
        ){
            const baseDeDatos = getDB();
            await baseDeDatos.collection('productos').insertOne(datosProducto, callBack);
        } else {
        return 'error';
    }
};

const consultarProducto = async (id, callBack) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('productos')
    .findOne({_id: new ObjectId(id)}, callBack);
};

const editarProducto = async (id, edicion, callBack) => {
    const filtroProducto = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('productos')
    .findOneAndUpdate(filtroProducto,
        operacion,
        {upsert: true, returnOriginal: true},
        callBack);
};

const eliminarProducto = async (id, callBack) => {
    const filtroProducto = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('productos').deleteOne(filtroProducto, callBack);
};

export { queryAllProducts, crearProducto, consultarProducto, editarProducto, eliminarProducto };