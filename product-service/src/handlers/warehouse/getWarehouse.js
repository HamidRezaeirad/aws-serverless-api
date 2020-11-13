import { connectToDatabase } from "../../db";
import Warehouse from "../../models/warehouse.model";
import commonMiddleWare from "../../lib/commonMiddleware";

async function getWarehouses(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    let result = await Warehouse.findById(event.pathParameters.id);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch the warehouses.",
    };
  }
}

export const handler = commonMiddleWare(getWarehouses);
