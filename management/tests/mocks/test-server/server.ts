import express from "express";
import { FetchError } from "node-fetch";

import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.use(function (error, req, res, next) {
  //   console.log("error: ", error);

  if (error instanceof FetchError) {
    res.status(500).send({
      error: {
        status: 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
});

export { app };
