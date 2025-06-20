type TCategory = "Arts and Craft" | "Nature" | "Family" | "Sport" | "Friends" | "Meditation"
export type TStatus = "Ongoing" | "Pending" | "Done"
export type TTask = {
    taskName: string,
    category: TCategory,
    description: string,
    dueDate: string,
    status: TStatus
    userEmail?:string
}