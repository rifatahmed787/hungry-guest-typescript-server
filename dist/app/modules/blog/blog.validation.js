"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        tags: zod_1.z.array(zod_1.z.string(), {
            required_error: "Tags is required",
        }),
        category: zod_1.z.string({
            required_error: "Category is required",
        }),
        image: zod_1.z.array(zod_1.z.string(), {
            required_error: "Image is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
    }),
});
const updateBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        tags: zod_1.z.array(zod_1.z.string(), {
            required_error: "Tags is required",
        }),
        category: zod_1.z.string({
            required_error: "Category is required",
        }),
        image: zod_1.z.array(zod_1.z.string(), {
            required_error: "Image is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
    }),
});
exports.BlogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema,
};
