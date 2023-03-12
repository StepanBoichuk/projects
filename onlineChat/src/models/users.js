const {Schema, model, SchemaTypes, Types} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    birth_date: {
        type: SchemaTypes.Date,
        required: false
    },
    password: {
        type: SchemaTypes.String,
        required: false
    },
    verified: {
        type: SchemaTypes.Boolean,
        default: false
    },
    verifyingKey: {
        type: SchemaTypes.String,
        default: () => {
            return (new Types.ObjectId()).toString();
        }
    }
});


const User = model('User', UserSchema, 'users');

module.exports = User;