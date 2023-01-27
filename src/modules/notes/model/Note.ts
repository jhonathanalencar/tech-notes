import { v4 as uuidv4 } from 'uuid';

class Note {
  id?: string;
  userId: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({ title, text, userId }: Partial<Note>) {
    Object.assign(this, {
      userId,
      title,
      text,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Note };
