import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllSales = async (callBack) => {
    const baseDeDatos = getDB();
    console.log('query');
    await baseDeDatos.collection('ventas').find({}).limit(50).toArray(callBack);     
    };

const crearVenta = async (datosVenta, callBack) => {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('ventas').insertOne(datosVenta, callBack);

};

const consultarVenta = async (id, callBack) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('ventas')
    .findOne({_id: new ObjectId(id)}, callBack);
};

const editarVenta = async (id, edicion, callBack) => {
    const filtroVenta = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('ventas')
    .findOneAndUpdate(filtroVenta,
        operacion,
        {upsert: true, returnOriginal: true} ,
        callBack);
};

const eliminarVenta = async (id, callBack) => {
    const filtroVenta = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('ventas').deleteOne(filtroVenta, callBack);
};

export { queryAllSales, crearVenta, consultarVenta, editarVenta, eliminarVenta };