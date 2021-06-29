import express from "express";

import updateIdentityRouter from "./update-identity";

const router = express.Router({ mergeParams: true });

router.use("/update-identity", updateIdentityRouter);

export default router;
