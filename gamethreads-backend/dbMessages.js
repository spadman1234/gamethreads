import mongoose from "mongoose";

const gamethreadsSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  flair: String,
  received: Boolean,
  chatroom: String,
});

export default mongoose.model("messagecontents", gamethreadsSchema);
