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

  update(data: IUpdateNoteDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(data: IDeleteNoteDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { MongoNotesRepository };
