//import validator from "@middy/validator";
import { connectToDatabase } from "../../db";
import Warehouse from "../../models/warehouse.model";
//import getWarehouseSchema from "../../lib/schemas/getWarehouses.schema";
import commonMiddleWare from "../../lib/commonMiddleware";

async function getWarehouses(event, context, callback) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToDatabase();

    let result = await Warehouse.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ message: err.message }),
    };
  }
}

export const handler = commonMiddleWare(getWarehouses);
// .use(
//   validator({ inputSchema: getWarehouseSchema, useDefaults: true }),
// );
