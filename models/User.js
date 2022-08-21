const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
},
    {
        toJSON: { virtuals: true },
        id: false
    });

userSchema.virtual("friendCount").get(function() {
    return this.friends.length
});

const User = model('User', userSchema);

model.exports = User;
