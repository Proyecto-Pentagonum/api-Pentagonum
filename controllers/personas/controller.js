import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

const queryAllPeople = async (callBack) => {
    const baseDeDatos = getDB();
    console.log('query');
    await baseDeDatos.collection('personas').find().limit(50).toArray(callBack);     
    };

const crearPersona = async (datosPersona, callBack) => {
            const baseDeDatos = getDB();
            await baseDeDatos.collection('personas').insertOne(datosPersona, callBack);
};

const consultarOCrearPersona = async (req, callback) => {
    console.log('Estoy llegando a crear persona');

    const token = req.headers.authorization.split('Bearer ')[1];
    const persona = jwt_decode(token)['http://localhost/userData'];
    console.log(persona);


  const baseDeDatos = getDB();
  await baseDeDatos.collection('personas').findOne({ email: persona.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {

      callback(err, response);
    } else {

      persona.auth0ID = persona._id;
      delete persona._id;
      persona.rol = 'sin rol';
      persona.estado = 'pendiente';
      await crearPersona(persona, (err, respuesta) => callback(err, persona));
    }
  });
};

const consultarPersona = async (id, callBack) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('personas')
    .findOne({_id: new ObjectId(id)}, callBack);
};

const editarPersona = async (id, edicion, callBack) => {
    const filtroPersona = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('personas')
    .findOneAndUpdate(filtroPersona,
        operacion,
        {upsert: true, returnOriginal: true} ,
        callBack);
};

const eliminarPersona = async (id, callBack) => {
    const filtroPersona = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('personas').deleteOne(filtroPersona, callBack);
};

export { 
    queryAllPeople,
    crearPersona,
    consultarPersona,
    editarPersona,
    eliminarPersona,
    consultarOCrearPersona,
};