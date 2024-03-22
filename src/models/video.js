import mongoose, { Schema } from "mongoose";
import { User } from "./userModel";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String,
            required: true
        },
        thumbnail:{
            type: String,
            required: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        title:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        description:{
            type: String
        },
        duration:{
            type: Number,
            required: true
        },
        views:{
            type: Number,
            default: 0
        },
        isPublished:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const Video = mongoose.model("Video", videoSchema);
