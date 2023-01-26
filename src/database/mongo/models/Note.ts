import mongoose from "mongoose";
import AutoIncrement from 'mongoose-sequence';

interface INote{
  user: mongoose.Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500
});

const Note = mongoose.model<INote>('Note', noteSchema);

export { Note, INote }