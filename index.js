//const express = required ('express');
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import rutasProducto from './views/productos/rutas.js';
import rutasPersona from './views/personas/rutas.js';
import rutasVentas from './views/ventas/rutas.js';
//import autorizacionEstadoPersona from './middleware/autorizacionEstadoPersona.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://pentagonum.us.auth0.com/.well-known/jwks.json',
    }),
    audience: 'api-autenticacion-pentagonum',
    issuer: 'https://pentagonum.us.auth0.com/',
    algorithms: ['RS256'],
  });

// 4 y 5: enviarle el token a auth0 para que devuelva si es valido o no
app.use(jwtCheck);

//app.use(autorizacionEstadoPersona);

app.use(rutasProducto);
app.use(rutasPersona);
app.use(rutasVentas);

const main = ()=>{
    return app.listen(process.env.PORT, ()=>{
        console.log(`escuchando en el puerto ${process.env.PORT}`);
    });
};



conectarDB(main)