import client from "../../config/db.js";

export const sendAllShipments = async () => {
  try {
    const { rows } = await client.query("SELECT * FROM shipment");
    return rows;
  } catch (error) {
    console.error("Error fetching shipments:", error);
    throw new Error("Ocurrió un error al obtener los envíos");
  }
};

export const insert = async (shipment) => {
  const { warehouseId, item, quantity } = shipment;

  try {
    const { rows: insertedShipment } = await client.query(
      "INSERT INTO shipment (warehouse_id, item, quantity) VALUES ($1, $2, $3) RETURNING shipment_id",
      [parseInt(warehouseId), item, parseInt(quantity)]
    );
    const shipmentId = insertedShipment[0].shipment_id;
    const { rows: shipmentCreated } = await client.query(
      "SELECT * FROM shipment WHERE shipment_id = $1",
      [shipmentId]
    );
    return shipmentCreated[0];
  } catch (err) {
    console.error("Error inserting shipment:", err);
    throw new Error("Ocurrió un error al insertar el envío");
  }
};

export const findById = async (id) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM shipment WHERE shipment_id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error, "something went wrong");
  }
};

export const updateById = async (id, shipmentToUpdate) => {
  try {
    const { warehouseId, item, quantity } = shipmentToUpdate;
    const response = await client.query(
      "UPDATE shipment SET warehouse_id = $1, item = $2, quantity = $3  WHERE shipment_id = $4 RETURNING *",
      [warehouseId, item, quantity, id]
    );
    return response;
  } catch (error) {
    throw new Error(error, "something went wrong");
  }
};

export const deleteById = async (id) => {
  try {
    const response = await client.query(
      "DELETE FROM shipment WHERE shipment_id = $1 RETURNING *",
      [id]
    );

    return response;
  } catch (error) {
    throw new Error(error, "something went wrong");
  }
};
