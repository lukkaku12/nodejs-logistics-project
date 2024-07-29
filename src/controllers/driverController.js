import { getAll, insert, findById, updateById, deleteById } from "../models/driverModel.js";

export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await getAll();
        res.json({ message: 'All good', results: drivers });
    } catch (error) {
        console.error("Error fetching drivers:", error);
        res.status(500).json({ message: 'Ocurrió un error al obtener los conductores' });
    }
};

export const insertDriver = async (req, res) => {
    const { name, warehouseId } = req.body;
    
    try {
        const response = await insert({ name, warehouseId });
        console.log(response);
        res.status(201).json({ message: 'ok', driver: response });
    } catch (error) {
        console.error("Error inserting driver:", error);
        res.status(500).json({ message: 'Ocurrió un error al insertar el conductor' });
    }
};

export const findDriver = async (req, res) => {
    try {
        const driver = await findById(req.params.id);
        res.json({ message: 'ok', result: driver });
    } catch (error) {
        console.error("Error fetching driver:", error);
        res.status(500).json({ message: 'Ocurrió un error al obtener el conductor' });
    }
};

export const updateDriver = async (req, res) => {
    try {
        const response = await updateById(req.params.id, req.body);
        const { rows } = response;
        res.status(201).json({ message: "Driver updated successfully", result: rows });
    } catch (error) {
        console.error("Error updating driver:", error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar el conductor' });
    }
};

export const deleteDriver = async (req, res) => {
    try {
        const response = await deleteById(req.params.id);
        res.json({ message: "Driver deleted successfully", response: response.rows });
    } catch (error) {
        console.error("Error deleting driver:", error);
        res.status(500).json({ message: 'Ocurrió un error al eliminar el conductor' });
    }
};