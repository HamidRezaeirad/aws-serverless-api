import commonMiddleware from "../../lib/commonMiddleware";
import { connectToDatabase } from "../../db";
import { getWarehouseProduct } from "../../logic/warehouse";
import { returnError, returnSuccess } from "../../lib/helpers";

const getStock = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { warehouse_id, product_id } = event.pathParameters;
    await connectToDatabase();
    const warehouse = await getWarehouseProduct(warehouse_id, product_id);

    if (warehouse.length > 0) {
      const stock = warehouse[0].qty;
      return returnSuccess({ body: { stock } });
    } else {
      return returnError({ message: "Could not find the Warehouse!" });
    }
  } catch (error) {
    return returnError({ error, message: "Insernal server error!" });
  }
};

export const handler = commonMiddleware(getStock);
