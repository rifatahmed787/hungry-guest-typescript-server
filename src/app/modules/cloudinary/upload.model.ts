// models/Image.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  imageUrl: string;
}

const ImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
});

export default mongoose.model<IImage>("Image", ImageSchema);
