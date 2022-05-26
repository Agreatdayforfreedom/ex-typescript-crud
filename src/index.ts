import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { itemsRouter } from "./items/items.routes";
import { errorHandler } from "./middlewares/error";
import { notFoundHandler } from "./middlewares/notFound";

dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


const app = express();


/* 
*  middlewares
*/

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.use(notFoundHandler);

/*
*  routes
*/

app.use('/api/items', itemsRouter);

app.listen(PORT, () => {
    console.log(`listening on port, ${PORT}`);
});