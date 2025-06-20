import { z } from "zod";

const update = z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional()
})


export const user_validation = {
    update
}