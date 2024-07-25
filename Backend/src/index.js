import "dotenv/config";
import { app } from "./app.js";
import connectDb from "./db/index.js";

const port = 4000 || process.env.PORT

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server firing at ${port}`);
    });
});
