import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNotes,
  removeNote,
} from "./notes.js";

const listNotes = (notes) => {
  notes.forEach(({ id, content, tags }) => {
    console.log("\n");
    console.log("id: ", id);
    console.log("tags: ", tags);
    console.log("content: ", content);
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create an new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags
        ? argv.tags
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [];
      const note = await newNote(argv.note, tags);
      listNotes([{ ...note }]);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags to add to note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    "find <filter>", //the <> at the edges of the parameter shows that it is required, whereas [] means that it is optional
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const found = await findNotes(argv.filter);

      if (found) listNotes(found);
      else console.log("No such files in the Db");
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const deletedNoteId = await removeNote(argv.id);

      if (deletedNoteId) console.log("Deleted:", deletedNoteId);
      else console.log(`Note with ID: ${argv.id} does not exist`);
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {}
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async () => {
      await removeAllNotes();
      console.log("Db reseted");
    }
  )
  .demandCommand(1)
  .parse();
