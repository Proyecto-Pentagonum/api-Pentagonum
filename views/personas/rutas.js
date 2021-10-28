import Express from 'express';
import { queryAllPeople, crearPersona, editarPersona, eliminarPersona, consultarPersona,  consultarOCrearPersona } from '../../controllers/personas/controller.js';

const rutasPersona = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando las Personas');
    } else {
        res.json(result);
    }
};

rutasPersona.route('/personas').get((req, res)=>{
    console.log ('Hicieron GET en la ruta /personas');
    queryAllPeople(genericCallback(res));
});

rutasPersona.route("/personas").post((req, res)=>{
    crearPersona(req.body, genericCallback(res));
});

rutasPersona.route('/personas/self').get((req, res) => {
    console.log('alguien hizo get en la ruta /self');
    consultarOCrearPersona(req, genericCallback(res));

  });

rutasPersona.route("/personas/:id").get((req, res)=>{
    console.log ('Hicieron GET en la ruta /personas/:id');
    consultarPersona(req.params.id, genericCallback(res));
});

rutasPersona.route('/personas/:id').patch((req, res)=>{
    editarPersona(req.params.id, req.body, genericCallback(res));
});

rutasPersona.route('/personas/:id').delete((req, res)=>{
    eliminarPersona(req.params.id, genericCallback(res));
});

export default rutasPersona;