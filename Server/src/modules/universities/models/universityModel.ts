import { Schema, model } from 'mongoose';

export interface University {
    name: string;
    type: 'Public' | 'Private' | 'State' | 'Central' | 'Deemed';
    state: string;
    city: string;
    establishedYear: number;
}

const universitySchema = new Schema<University>(
    {
        name: { type: String, required: true, trim: true, unique: true },
        type: { 
            type: String, 
            required: true, 
            enum: ['Public', 'Private', 'State', 'Central', 'Deemed'] 
        },
        state: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        establishedYear: { type: Number, required: true, min: 1800, max: new Date().getFullYear() },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const University = model<University>('University', universitySchema);

