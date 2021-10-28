import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryAllPeople = async (callBack) => {
    const baseDeDatos = getDB();
    console.log('query');
    await baseDeDatos.collection('personas').find({}).limit(50).toArray(callBack);     
    };

const crearPersona = async (datosPersona, callBack) => {
            const baseDeDatos = getDB();
            await baseDeDatos.collection('personas').insertOne(datosPersona, callBack);
};

const consultarPersona = async (id, callBack) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('personas')
  .findOne({_id: new ObjectId(id)}, callBack);
};

const consultarOCrearPersona = async (req, callback) => {
    console.log('Estoy llegando a crear persona');
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);


  const baseDeDatos = getDB();
  await baseDeDatos.collection('personas').findOne({ email: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      callback(err, response);
    } else {

      persona.auth0ID = user._id;
      delete user._id;
      user.rol = 'sin rol';
      user.estado = 'pendiente';
      await crearPersona(user, (err, respuesta) => callback(err, user));
    }
  });
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