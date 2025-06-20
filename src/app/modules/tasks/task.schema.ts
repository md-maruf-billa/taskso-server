import { model, Schema } from "mongoose";
import { TTask } from "./task.interface";


const taskSchema = new Schema<TTask>({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    category: { type: String, enum: ["Arts and Craft", "Nature", "Family", "Sport", "Friends", "Meditation"], required: true },
    status: { type: String, enum: ["Ongoing", "Pending", "Done"], default: "Pending" },
}, {
    versionKey: false,
    timestamps: true
})

export const TaskModel = model<TTask>("task", taskSchema)