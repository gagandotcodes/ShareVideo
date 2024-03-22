import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

(async () => {
  try {
    // connect to MongoDB
    const connectionInstance = await mongoose
      .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      .then((data) => {
        app.listen(process.env.PORT || 8000, () => {
          console.log('connected to Database');
          console.log("Server is running at Port", process.env.PORT);
        });
        return data;
      });
  } catch (error) {
    console.log("MONGO DB CONNECTION ERROR: ", error);
    throw error;
  }
})();
