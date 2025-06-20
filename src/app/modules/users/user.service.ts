import { TUser } from "./user.interface"
import { UserModel } from "./user.schema"

const get_me_from_db = async (email: string) => {
    const result = await UserModel.findOne({ email }).lean()
    return result
}

const update_profile_into_db = async (email: string, payload: Partial<TUser>) => {
    const result = await UserModel.findOneAndUpdate(
        { email },
        {
            name: payload?.name,
            profilePhoto: payload?.profilePhoto
        },
        { new: true });
    return result;
}
const delete_user_form_db = async (email: string) => {
    const result = await UserModel.findOneAndUpdate({ email }, { isDeleted: true })
    return result;
}







export const user_services = {
    get_me_from_db,
    update_profile_into_db,
    delete_user_form_db

}