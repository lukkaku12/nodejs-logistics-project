import express from 'express';
import warehouseRouter from '../router/warehouses.js';
import shipmentRouter from '../router/shipments.js'
import driversRouter from '../router/drivers.js';

const routes = express();

routes.use("/warehouses", warehouseRouter);
routes.use("/shipments", shipmentRouter);
routes.use('/drivers', driversRouter);

export default routes;