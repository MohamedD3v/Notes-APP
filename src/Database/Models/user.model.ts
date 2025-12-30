import  { HydratedDocument, model, models, Schema, Types } from "mongoose";

export enum GenderEnum {
  male = "male",
  female = "female",
}
export interface IUser {
  _id: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender?: GenderEnum;
}
export const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true , minLength:5 , maxLength:15 },
    lastName: { type: String, required: true, trim: true , minLength:5 , maxLength:15 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, minLength: 8, required: true, trim: true },
    gender: {
      type: String,
      enum:
        Object.values (GenderEnum),
        default: GenderEnum.male,
      
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
export const UserModel = model("User", userSchema) || models.User
export type HUserDocument = HydratedDocument<IUser>