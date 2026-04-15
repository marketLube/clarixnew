import { Schema, model, Document } from 'mongoose';

interface IExam extends Document {
    shortName: string;
    fullName: string;
    registrationDate: Date;
    examDate: Date;
    resultPublishDate: Date;
    qualificationRequired: string[];
    collegesAccepting: number;
    officialWebsite: string;
    description: string;
    isActive: boolean;
    logo: string;
    stream?: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const examSchema = new Schema<IExam>(
    {
        shortName: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        registrationDate: {
            type: Date,
            required: true,
        },

        examDate: {
            type: Date,
            required: true,
        },

        resultPublishDate: {
            type: Date,
            required: true,
        },

        qualificationRequired: {
            type: [String],
            required: true,
        },

        collegesAccepting: {
            type: Number,
            required: true,
        },

        officialWebsite: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        logo: {
            type: String,
            required: true,
        },
        stream: {
            type: Schema.Types.ObjectId,
            ref: 'Stream',
        },
    },
    { timestamps: true }
);

examSchema.index({ createdAt: -1 });
examSchema.index({ title: 'text' });

export const Exam = model<IExam>('Exam', examSchema);
