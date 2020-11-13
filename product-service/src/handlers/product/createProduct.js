import validator from "@middy/validator";
import commonMiddleware from "../../lib/commonMiddleware";
import { connectToDatabase } from "../../db";
import Product from "../../models/product.model";
import createProductSchema from "../../lib/schemas/createProduct.schema";
import { returnError, returnSuccess } from "../../lib/helpers";

const createProduct = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();

    let newProduct = event.body;
    const resBody = await Product.create(newProduct);

    return returnSuccess({ body: resBody });
  } catch (error) {
    return returnError({ error, message: "Internal server error!" });
  }
};

export const handler = commonMiddleware(createProduct).use(
  validator({ inputSchema: createProductSchema, useDefaults: true }),
);
