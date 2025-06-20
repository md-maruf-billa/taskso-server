import { z } from "zod";

const create = z.object({
    taskName: z.string().nonempty("Task name is required"),
    description: z.string().nonempty("Description is required"),
    dueDate: z.string().nonempty("Due date is required"),
    category: z.enum([
        "Arts and Craft",
        "Nature",
        "Family",
        "Sport",
        "Friends",
        "Meditation"
    ]),
    status: z.enum(["Ongoing", "Pending", "Done"]).default("Pending")
});

const update = z.object({
    taskName: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    category: z.enum([
        "Arts and Craft",
        "Nature",
        "Family",
        "Sport",
        "Friends",
        "Meditation"
    ]).optional(),
    status: z.enum(["Ongoing", "Pending", "Done"]).optional()
});

export const task_validation = {
    create,
    update
}