import { sendAllShipments, insert, findById, updateById, deleteById } from "../models/shipmentModel.js";

export const bringAll = async (req, res) => {
    try {
        const shipments = await sendAllShipments();
        res.json({ message: 'All good', results: shipments });
    } catch (error) {
        console.error("Error fetching shipments:", error);
        res.status(500).json({ message: 'Ocurrió un error al obtener los envíos' });
    }
};

export const insertShipment = async (req, res) => {
    const { warehouseId, item, quantity } = req.body;
    
    try {
        const response = await insert({ warehouseId, item, quantity });
        console.log(response);
        res.status(201).json({ message: 'ok', shipment: response });
    } catch (error) {
        console.error("Error inserting shipment:", error);
        res.status(500).json({ message: 'Ocurrió un error al insertar el envío' });
    }
};

export const findShipment = async (req, res) => {
    const shipment = await findById(req.params.id);
    res.json({message:'ok', result:shipment})

};


export const update = async (req, res) => {
    const response = await updateById(req.params.id, req.body);
    const {rows} = response;
    res.status(201).json({message:"shipment updated successfully", result:rows});

};

export const eliminate = async (req, res) => {
    const response = await deleteById(req.params.id);
    res.json({message:"shipment deleted successfully",response:response.rows})
}