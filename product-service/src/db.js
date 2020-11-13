import mongoose from "mongoose";

mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  console.log("process.env.DB: ", process.env.DB);
  return mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      isConnected = db.connections[0].readyState;
      const cleanDatabase = async () => {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
          const collection = collections[key];
          await collection.deleteMany();
        }
      };
      if (process.env.NODE_ENV == "test") {
        cleanDatabase();
      }
    });
};

export { connectToDatabase };
