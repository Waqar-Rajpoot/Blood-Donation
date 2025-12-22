// import mongoose from "mongoose";

// export async function connect() {
//   try {
//     mongoose.connect(process.env.MONGO_URI!);
//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully");
//     });
//     connection.on("error", (err) => {
//       console.log("MongoDB connection error" + err);
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Something went wrong in dbConn!", error);
//   }
// }






import mongoose from "mongoose";

// 1. Define the shape of our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Add the cached variable to the NodeJS global type to avoid TS errors
declare global {  
  var mongoose: MongooseCache | undefined;
}

// 3. Initialize or retrieve the cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  // If we already have a connection, return it immediately
  if (cached?.conn) {
    return cached.conn;
  }

  // If no connection attempt is in progress, start one
  if (!cached?.promise) {
    const opts = {
      bufferCommands: false, // Prevents hanging if the connection is slow
    };

    console.log("📡 Initializing new MongoDB connection...");

    cached!.promise = mongoose.connect(process.env.MONGO_URI!, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    // Await the existing or new promise
    cached!.conn = await cached!.promise;
  } catch (error) {
    // If connection fails, reset the promise so we can try again
    cached!.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw error; 
  }

  return cached!.conn;
}