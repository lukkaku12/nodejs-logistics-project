import express from 'express';
import warehouseRouter from '../router/warehouses.js';
import shipmentRouter from '../router/shipments.js'

const routes = express();

routes.use("/warehouses", warehouseRouter);
routes.use("/shipments", shipmentRouter)

export default routes;