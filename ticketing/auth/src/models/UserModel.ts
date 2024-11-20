import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttr {
    email: String;
    password: String;
}

interface UserModel extends mongoose.Model<UserDoc> {
        build(attrs: UserAttr): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: String;
    password: String;
    updatedAt: Date
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type:  String,
        required: true
    }
}, {
    toJSON: {
            transform(doc, ret){
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;

            }

    }
})
userSchema.pre("save", async function(done) {
    if(this.isModified('password')){
       const hased = await Password.toHash(this.get('password'))
        this.set("password", hased)
    }

    done()
})
userSchema.statics.build = (attrs: UserAttr) => {
        return new User(attrs)
}
const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export {User}