import Warehouse from "../models/warehouse.model";
import mongoose from "mongoose";

const { Types } = mongoose;

const getWarehouseProduct = async (warehouse_id, product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let warehouse = await Warehouse.aggregate([
        { $match: { _id: Types.ObjectId(warehouse_id) } },
        { $unwind: "$products" },
        { $match: { "products.product_id": Types.ObjectId(product_id) } },
        {
          $project: {
            product_id: "$products.product_id",
            qty: "$products.qty",
          },
        },
      ]);
      resolve(warehouse);
    } catch (error) {
      resolve(error);
    }
  });
};

const updateProductQty = async (warehouse_id, product_id, qty) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Warehouse.updateOne(
        {
          _id: Types.ObjectId(warehouse_id),
        },
        {
          $inc: { "products.$[element].qty": qty },
        },
        {
          arrayFilters: [{ "element.product_id": product_id }],
          multi: false,
        },
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const addNewProduct = async (warehouse_id, product_id, qty) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Warehouse.updateOne(
        {
          _id: Types.ObjectId(warehouse_id),
        },
        {
          $push: {
            products: {
              product_id: product_id,
              qty: qty,
            },
          },
        },
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const addProduct = async ({ warehouse_id, product_id, qty }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const warehouse = await getWarehouseProduct(warehouse_id, product_id);
      if (warehouse.length > 0) {
        await updateProductQty(warehouse_id, product_id, qty);
        resolve();
      } else {
        await addNewProduct(warehouse_id, product_id, qty);
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { getWarehouseProduct, addProduct, updateProductQty };
