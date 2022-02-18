const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [
                true,
                `Username is required`
            ],
            trim: true,
            match: [
                /^([\w\.-]){6,16}$/i,
                `Username invalid. \nOnly alphanumeric and "-", "_", and "."`
            ]
        },
        email: {
            type: String,
            unique: true,
            required: [
                true, 
                `Email is required`
            ],
            trim: true,
            match: [
                /^([\w\.-]+)@([\w\.-][^_]+)\.([\w\.][^_]{2,6})$/i, 
                'Email must be in the proper format. \nEx: ex.ample_user@domain-name3.com'
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true,
            versionKey: false
        }
    }
);
const friendCount = UserSchema.virtual('friendCount');
friendCount.get(function (value, virtual, doc) {
    return this.friends.length;
})

const User = model('User', UserSchema);

const test = new User({username: 'GameGuyBeardMan', email: 'email@address.com'});

module.exports = User;
