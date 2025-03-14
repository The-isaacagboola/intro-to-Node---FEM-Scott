import { expect, jest, test } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("new note inserts data and returns it", async () => {
  const note = {
    content: "",
    id: 1,
    tags: ["hello"],
  };
  insertDB.mockResolvedValue(note);
  const result = await newNote(note.content, note.tags);
  expect(result).toEqual(note);
});
