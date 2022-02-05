const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    freinds: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // Enable Virtuals
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// friendCount
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.freinds.length;
  });
// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
