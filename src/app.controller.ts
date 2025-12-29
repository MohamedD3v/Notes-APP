import express, { Request, Response, Express } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
configDotenv({ path: "./.env" });
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: Number(process.env.LIMIT),
  message: {
    status: 429,
    message: "Please Try Agian Later",
  },
});
export const bootstrap = async () => {
  const app: Express = express();
  const port: number = Number(process.env.PORT);
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(limiter);
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Welcome to back <3" });
  });
  app.all("{/*NULL}", (req: Request, res: Response) => {
    return res.status(404).json({ msg: "Page Not Found!!!" });
  });
  app.listen(port, () => {
    console.log(`Server Running on Port :${port}`);
  });
};
