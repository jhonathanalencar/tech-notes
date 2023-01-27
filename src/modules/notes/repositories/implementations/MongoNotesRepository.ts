import { NotFoundError } from '../../../../errors';
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

    note.title = data.title;
    note.text = data.text;
    note.completed = data.completed;

    await note.save();
  }

  delete(data: IDeleteNoteDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { MongoNotesRepository };
