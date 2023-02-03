import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../../../../errors';
import { NoteModel } from '../../../../models/Note';
import { UserModel } from '../../../../models/User';
import { Note } from '../../model/Note';
import {
  ICreateNoteDTO,
  IDeleteNoteDTO,
  INotesRepository,
  IUpdateNoteDTO,
} from '../INotesRepository';

class MongoNotesRepository implements INotesRepository {
  async getAll(): Promise<Note[]> {
    const notes = await NoteModel.find().lean();

    if (!notes) {
      throw new NotFoundError('No notes found');
    }

    const notesWithUser = await Promise.all(
      notes.map(async (note) => {
        const user = await UserModel.findById(note.userId)
          .select('-password')
          .lean()
          .exec();
        return {
          ...note,
          user,
        };
      })
    );

    return notesWithUser;
  }

  async create(data: ICreateNoteDTO): Promise<Note> {
    const { id, ...newNote } = new Note(data);

    const duplicate = await NoteModel.findOne({ title: newNote.title })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      throw new ConflictError('Duplicate note title');
    }

    const note = await NoteModel.create({
      ...newNote,
      _id: id,
    });

    return note;
  }

  async update(data: IUpdateNoteDTO): Promise<void> {
    const note = await NoteModel.findById(data.id).exec();

    if (!note) {
      throw new NotFoundError('Note not found');
    }

    const duplicate = await NoteModel.findOne({ title: data.title })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicate && duplicate._id !== data.id) {
      throw new ConflictError('Duplicate note title');
    }

    const user = await UserModel.findById(data.userId).lean().exec();

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.active) {
      throw new BadRequestError('Cannot assign notes to inactive users');
    }

    note.title = data.title;
    note.userId = data.userId;
    note.text = data.text;
    note.completed = data.completed;

    await note.save();
  }

  async delete(data: IDeleteNoteDTO): Promise<void> {
    const note = await NoteModel.findById(data.id).exec();

    if (!note) {
      throw new NotFoundError('Note not found');
    }

    await note.deleteOne();
  }
}

export { MongoNotesRepository };
