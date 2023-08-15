"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/create-booking", (0, validateRequest_1.default)(booking_validation_1.BookValidation.createBookZodSchema), booking_controller_1.BlogController.createBook);
router.get("/", booking_controller_1.BlogController.getAllBookings);
router.delete("/:id", booking_controller_1.BlogController.deleteBook);
exports.BookingRoutes = router;
