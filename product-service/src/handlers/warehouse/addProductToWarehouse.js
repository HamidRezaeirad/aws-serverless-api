import commonMiddleware from "../../lib/commonMiddleware";
import { connectToDatabase } from "../../db";
import { Product, Warehouse } from "../../models";
import { getWarehouseProduct, addProduct } from "../../logic/warehouse";
import { returnError, returnSuccess } from "../../lib/helpers";

const addProductToWarehouse = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();

    const { warehouse_id, product_id } = event.pathParameters;
    const { qty } = event.body;

    if (qty < 1) {
      return returnError({ message: "Qty is should be more then 1" });
    }

    const warehouse = await Warehouse.findById(warehouse_id);
    if (!warehouse) {
      return returnError({ message: "Warehouse not exist!" });
    }

    const product = await Product.findById(product_id);
    if (!product) {
      return returnError({ message: "Product not exist!" });
    }

    const params = { warehouse_id, product_id, qty };
    await addProduct(params);
    const resBody = await getWarehouseProduct(warehouse_id, product_id);
    return returnSuccess({ body: resBody });
  } catch (error) {
    return returnError({ error, message: "Product not exist!" });
  }
};

export const handler = commonMiddleware(addProductToWarehouse);
