import commonMiddleware from "../../lib/commonMiddleware";
import { connectToDatabase } from "../../db";
import Warehouse from "../../models/warehouse.model";
import { returnError, returnSuccess } from "../../lib/helpers";

const deleteWarehouse = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Warehouse.findByIdAndRemove(event.pathParameters.id))
    .then((warehouse) => {
      return returnSuccess({
        body: {
          message: "Removed warehouse with id: " + warehouse._id,
          warehouse: warehouse,
        },
      });
    })
    .catch((error) => {
      return returnError({ error, message: "Warehouse not exist!" });
    });
};

export const handler = commonMiddleware(deleteWarehouse);
