import validator from "@middy/validator";
import commonMiddleware from "../../lib/commonMiddleware";
import { connectToDatabase } from "../../db";
import Warehouse from "../../models/warehouse.model";
import createWarehouseSchema from "../../lib/schemas/createWarehouse.schema";
import { returnError, returnSuccess } from "../../lib/helpers";

const createWarehouse = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const resBody = await Warehouse.create(event.body);

    return returnSuccess({ body: resBody });
  } catch (error) {
    return returnError({ error, message: "Product not exist!" });
  }
};

export const handler = commonMiddleware(createWarehouse).use(
  validator({ inputSchema: createWarehouseSchema, useDefaults: true }),
);
