import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  return res.status(200).json({
    message: "UP",
  });
});

export { router as healthRouter };
