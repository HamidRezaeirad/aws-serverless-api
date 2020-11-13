import { connectToDatabase } from "../../db";
import Product from "../../models/product.model";
import commonMiddleWare from "../../lib/commonMiddleware";
import { returnError, returnSuccess } from "../../lib/helpers";

const getProducts = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();

    const resBody = await Product.find({});
    return returnSuccess({ body: resBody });
  } catch (error) {
    return returnError({ error, message: "Internal server error!" });
  }
};

export const handler = commonMiddleWare(getProducts);
