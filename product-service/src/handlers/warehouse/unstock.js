import commonMiddleware from "../../lib/commonMiddleware";
import { connectToDatabase } from "../../db";
import { Product, Warehouse } from "../../models";
import { getWarehouseProduct, updateProductQty } from "../../logic/warehouse";
import { returnError, returnSuccess } from "../../lib/helpers";

const unstock = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { warehouse_id, product_id } = event.pathParameters;
    const { qty } = event.body;

    if (qty < 1) {
      return returnError({ message: "Qty should be more then 1" });
    }

    await connectToDatabase();

    const warehouse = await Warehouse.findById(warehouse_id);
    if (!warehouse) {
      return returnError({ message: "Warehouse not exist!" });
    }

    const product = await Product.findById(product_id);
    if (!product) {
      return returnError({ message: "Product not exist!" });
    }

    await updateProductQty(warehouse_id, product_id, -Math.abs(qty));
    const resBody = await getWarehouseProduct(warehouse_id, product_id);

    return returnSuccess({ body: resBody });
  } catch (error) {
    return returnError({ error, message: "Internal server error!" });
  }
};

export const handler = commonMiddleware(unstock);
