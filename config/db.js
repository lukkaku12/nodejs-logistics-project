import pkg from 'pg';
import dotenv from 'dotenv';
const { Client } = pkg;

dotenv.config();


const connectionData = {
  user: "",           // Reemplaza con tu usuario
  host: process.env.HOSTNAME,
  database: process.env.DBNAME,        // Reemplaza con tu base de datos
  password: "",   // Reemplaza con tu contraseña
  port: process.env.PORTDB,
};

const client = new Client(connectionData);

client.connect();

export default client;