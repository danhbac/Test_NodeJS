import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
}

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: [15, "độ dài tối đa 15 kí tự"],
      },
      lastName: {
        type: String,
        required: true,
        max: [15, "độ dài tối đa 15 kí tự"],
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: function (v: string) {
          return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            v
          );
        },
        message: (props: any) => `${props.value} email ko đúng với định dạng!`,
      },
      mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        validate: function (v: string) {
          const phoneRegex = /(0[3|5|7|8|9])([0-9]{8})/i;
          return phoneRegex.test(v);
        },
        message: `số điện thoại không đúng`,
      },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;