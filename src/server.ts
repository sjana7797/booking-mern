import "dotenv/config";
import { app } from "./app";
import { connectDb } from "./lib/database";

app.listen(5000, async () => {
  await connectDb();
  console.log("Server listening on port 5000");
});
