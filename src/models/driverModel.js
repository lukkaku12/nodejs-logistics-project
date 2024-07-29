import client from "../../config/db.js";

export const getAll = async () => {
    try {
        const { rows } = await client.query('SELECT * FROM driver');
        return rows;
    } catch (error) {
        console.error("Error fetching drivers:", error);
        throw new Error("Ocurrió un error al obtener los conductores");
    }
};

export const insert = async (driver) => {
    const { name, warehouseId } = driver;

    try {
        const { rows: insertedDriver } = await client.query(
            "INSERT INTO driver (name, warehouse_id) VALUES ($1, $2) RETURNING driver_id",
            [name, warehouseId]
        );
        const driverId = insertedDriver[0].driver_id;
        const { rows: driverCreated } = await client.query(
            "SELECT * FROM driver WHERE driver_id = $1",
            [driverId]
        );
        return driverCreated[0];
    } catch (err) {
        console.error("Error inserting driver:", err);
        throw new Error("Ocurrió un error al insertar el conductor");
    }
};

export const findById = async (id) => {
    try {
        const { rows } = await client.query(
            "SELECT * FROM driver WHERE driver_id = $1",
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error("Error fetching driver:", error);
        throw new Error("Ocurrió un error al obtener el conductor");
    }
};

export const updateById = async (id, driverToUpdate) => {
    const { name, warehouseId } = driverToUpdate;

    try {
        const { rows } = await client.query(
            "UPDATE driver SET name = $1, warehouse_id = $2 WHERE driver_id = $3 RETURNING *",
            [name, warehouseId, id]
        );
        return rows[0];
    } catch (error) {
        console.error("Error updating driver:", error);
        throw new Error("Ocurrió un error al actualizar el conductor");
    }
};

export const deleteById = async (id) => {
    try {
        const { rows } = await client.query(
            "DELETE FROM driver WHERE driver_id = $1 RETURNING *",
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error("Error deleting driver:", error);
        throw new Error("Ocurrió un error al eliminar el conductor");
    }
};