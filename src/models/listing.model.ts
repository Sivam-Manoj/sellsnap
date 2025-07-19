import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
    userId: string;
    listingData: mongoose.Schema.Types.Mixed;
    platform: string;
    imageUrls?: string[];
    priceDetails?: mongoose.Schema.Types.Mixed; // Optional field
    finalPrice?: number; // Optional field
    createdAt: Date;
    updatedAt: Date;
    country: string;
    currency: string;
    language: string;
}

const ListingSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        listingData: {
            type: Schema.Types.Mixed,
            required: true,
        },
        imageUrls: {
            type: [String],
            required: false,
        },
        country: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        priceDetails: {
            type: Schema.Types.Mixed,
            required: false, // This field is optional
        },
        finalPrice: {
            type: Number,
            required: false, // This field is optional
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields
    }
);

export default mongoose.model<IListing>('Listing', ListingSchema);
