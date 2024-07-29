import { Router } from "express";
import { bringAll, findShipment, insertShipment, update, eliminate } from '../controllers/shipmentController.js'


const shipmentRouter = Router();

shipmentRouter.get("/", bringAll);
shipmentRouter.get("/:id", findShipment);
shipmentRouter.post("/", insertShipment);
shipmentRouter.put("/:id", update);
shipmentRouter.delete("/:id", eliminate);


export default shipmentRouter;