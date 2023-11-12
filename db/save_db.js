const fs = require("fs");
const util = require("util");
// const { v4: uuid } = require("uuid");

const readFileSync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileSync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getnotes() {
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
//   addnote(note) {}
//   removenote(id) {}
}
module.exports = new Store();
