import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;


const client = new MongoClient(stringConexion, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

let baseDeDatos;

const conectarDB = (callBack) => {
    client.connect( (err, db)=>{
        if(err){
            console.error('Error al conectar');
            return 'error';
        } 
        baseDeDatos = db.db('pentagonumDB');
        console.log('conectado a la base de datos');
        return callBack();
    });
};

const getDB = () => {
    return baseDeDatos;
}

export { conectarDB, getDB };