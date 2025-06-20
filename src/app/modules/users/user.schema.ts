import { model, Schema } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import configs from "../../configs";

const user_schema = new Schema<TUser, IUserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, required: false },
    isDeleted: { type: Boolean, required: false, default: false },
    passwordChangedAt: { type: Date, required: false, default: Date.now() },
    status: { type: String, enum: ['active', 'blocked'], default: "active" },

}, {
    timestamps: true,
    versionKey: false
})


user_schema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(configs.bcrypt_salt_rounds),
    );
    next();
});


user_schema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

user_schema.statics.isUserExistsByCustomId = async function (id: string) {
    return await UserModel.findOne({ _id: id }).select('+password');
};

user_schema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

user_schema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};


export const UserModel = model<TUser, IUserModel>("user", user_schema)