import { getDB, insertDB, saveDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = { content: note, id: Date.now(), tags };
  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes; //check here!!!!
};

export const findNotes = async (filter) => {
  const notes = await getAllNotes();
  return notes.filter((item) =>
    item.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const modified = notes.filter((note) => note.id !== id);
    await saveDB({ notes: modified });
    return id;
  }
};

export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
