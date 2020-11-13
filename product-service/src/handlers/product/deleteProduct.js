import { connectToDatabase } from "../../db";
import Product from "../../models/product.model";
import { returnError, returnSuccess } from "../../lib/helpers";

const deleteProduct = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Product.findByIdAndRemove(event.pathParameters.id))
    .then((product) => {
      return returnSuccess({
        body: {
          message: "Removed product with id: " + product._id,
          product: product,
        },
      });
    })
    .catch((error) => {
      return returnError({ error, message: "Warehouse not exist!" });
    });
};

export const handler = deleteProduct;
