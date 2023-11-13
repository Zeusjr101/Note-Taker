const fs = require("fs");
const util = require("util");

const readFileSync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileSync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let displayNotes;
      try {
        displayNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        displayNotes = [];
      }
      return displayNotes;
    });
  }
  addNote(note) {
    return this.getNotes().then((notes) => {
      notes.push(note);
      return this.write(notes);
    })
    
  };
//   removeNote(id) {}
}
module.exports = new Store();
