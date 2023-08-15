"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const upload_route_1 = require("../modules/cloudinary/upload.route");
const booking_route_1 = require("../modules/BookTable/booking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/upload",
        route: upload_route_1.UploadRoute,
    },
    {
        path: "/book",
        route: booking_route_1.BookingRoutes,
    },
    // { path: "/blog", route: BlogRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
