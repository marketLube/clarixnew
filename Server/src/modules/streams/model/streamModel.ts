import { Schema, model } from 'mongoose';

interface Stream {
    name: string;
    image: string;
    collegesCount: number;
    examsCount: number;
    enabled: boolean;
}

const streamSchema = new Schema<Stream>({
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    collegesCount: { type: Number, required: true, min: 0 },
    examsCount: { type: Number, default: 0, min: 0 },
    enabled: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export const Stream = model<Stream>('Stream', streamSchema);