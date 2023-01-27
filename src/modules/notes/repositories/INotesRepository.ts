import { Note } from '../model/Note';

interface ICreateNoteDTO {
  userId: string;
  title: string;
  text: string;
}

interface IUpdateNoteDTO {
  id: string;
  title: string;
  text: string;
  completed: boolean;
}

interface IDeleteNoteDTO {
  id: string;
}

interface INotesRepository {
  getAll(): Promise<Note[]>;
  create(data: ICreateNoteDTO): Promise<Note>;
  update(data: IUpdateNoteDTO): Promise<void>;
  delete(data: IDeleteNoteDTO): Promise<void>;
}

export { INotesRepository, ICreateNoteDTO, IUpdateNoteDTO, IDeleteNoteDTO };
