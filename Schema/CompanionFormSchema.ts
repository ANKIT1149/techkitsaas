import { z } from "zod"

const CompanionFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    topic: z.string().min(1, "Topic is required"),
    voice: z.string().min(1, "Voice is required"),
    subject: z.string().min(1, "Subjects is required"),
    style: z.string().min(1, "Subjects is required"),
    duration: z.coerce.number().min(1, "Duration is required"),
})

export default CompanionFormSchema