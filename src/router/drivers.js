import { Router } from "express";
import { deleteDriver, findDriver, getAllDrivers, insertDriver, updateDriver } from "../controllers/driverController.js";


const driversRouter = Router();

driversRouter.get('/', getAllDrivers);
driversRouter.get("/:id", findDriver);
driversRouter.post("/", insertDriver);
driversRouter.put("/:id", updateDriver);
driversRouter.delete("/:id", deleteDriver);

export default driversRouter;