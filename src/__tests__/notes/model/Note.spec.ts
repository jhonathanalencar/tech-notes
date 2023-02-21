import { v4 as uuidv4, validate } from 'uuid';

import { Note } from '../../../modules/notes/model/Note';

describe('Note model', () => {
  it('should be able to create a note with all props', () => {
    const note = new Note({
      userId: uuidv4(),
      title: 'new note title',
      text: 'new note text',
    });

    expect(note).toEqual(
      expect.objectContaining({
        title: 'new note title',
        text: 'new note text',
        completed: false,
      })
    );
    expect(validate(note.id as string)).toBe(true);
    expect(note.createdAt).toBeInstanceOf(Date);
    expect(note.updatedAt).toBeInstanceOf(Date);
  });
});
