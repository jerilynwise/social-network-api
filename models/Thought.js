const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          },
    },
    {
        toJSON: {
          getters: true
        }
      }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        userName: {
            type: String,
            required: true
        },
        reaction: [reactionSchema]
    },
    {toJSON: {
        getters: true
    },
    id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactionId;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;

