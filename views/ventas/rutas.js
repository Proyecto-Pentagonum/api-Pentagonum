import Express from 'express';
import { queryAllSales, crearVenta, editarVenta, consultarVenta, eliminarVenta 
} from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando las Ventas');
    } else {
        res.json(result);
    }
};

rutasVenta.route('/ventas').get((req, res)=>{
    console.log ('Hicieron GET en la ruta /ventas');
    queryAllSales(genericCallback(res));
});

rutasVenta.route('/ventas').post((req, res)=>{
    crearVenta(req.body, genericCallback(res));
});

rutasVenta.route("/ventas/:id").get((req, res)=>{
    console.log ('Hicieron GET en la ruta /ventas');
    consultarVenta(req.params.id, genericCallback(res));
});

rutasVenta.route('/ventas/:id').patch((req, res)=>{
    editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res)=>{
    eliminarVenta(req.params.id, genericCallback(res));
});

export default rutasVenta;