import express from "express";

import validateRequest from "../../Middlewares/validateRequest";
import { BookValidation } from "./booking.validation";
import { BlogController } from "./booking.controller";

const router = express.Router();

router.post(
  "/create-booking",
  validateRequest(BookValidation.createBookZodSchema),
  BlogController.createBook
);

router.get("/", BlogController.getAllBookings);

router.delete("/:id", BlogController.deleteBook);

export const BookingRoutes = router;
