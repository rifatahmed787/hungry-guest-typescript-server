"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.array(zod_1.z.string(), {
            required_error: "Email is required",
        }),
        phone: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        date: zod_1.z.array(zod_1.z.string(), {
            required_error: "Date is required",
        }),
        time: zod_1.z.string({
            required_error: "Time is required",
        }),
        people: zod_1.z.string({
            required_error: "People number is required",
        }),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
};
