import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.array(z.string(), {
      required_error: "Email is required",
    }),
    phone: z.string({
      required_error: "Phone number is required",
    }),
    date: z.array(z.string(), {
      required_error: "Date is required",
    }),
    time: z.string({
      required_error: "Time is required",
    }),
    people: z.string({
      required_error: "People number is required",
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
