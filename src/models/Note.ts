import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

interface INote {
  userId: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    userId: {
      type: String,
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
      default: false,
    },
  },
  { timestamps: true }
);

const AutoIncrement = Inc(mongoose);

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
});

const NoteModel = mongoose.model<INote>('Note', noteSchema);

export { NoteModel, INote };
