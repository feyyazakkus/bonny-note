import NoteListItem from "./NoteListItem";
import DataService  from "../services/DataService";
import Component    from "../lib/component";

import { addSelectedClass } from "../utils";
import state from "../state";

class NoteList extends Component {
    constructor() {
        super();
        state.events.subscribe('noteChange', this.onNoteChange.bind(this));
    }

    onNoteClick(e) {
        const selectedItem = e.target.closest('[data-note-id]');

        DataService.getNote(selectedItem.dataset.noteId)
            .then(note => {
                state.selectedNote = note;
                state.isNewNote = false;
                state.noteTitleInput.value = note.title;
                state.editor.innerHTML = note.html;
            });

        addSelectedClass(selectedItem);
    }

    onNoteChange() {
        this.render().then(html => {
            document.getElementById('note-list').innerHTML = html;
            state.noteTextChanged = false;
            this.afterRender();
        });
    }

    async render() {
        const notes = await DataService.getAllNotes();
        const items = notes.map((note) => {
            return new NoteListItem(note).render();
        });
        return items.join(' ');
    }

    afterRender() {
        const notes = document.querySelectorAll('.note');
        document.getElementById('note-count').innerHTML = notes.length;

        Array.from(notes).forEach(element => {
            element.addEventListener('click', this.onNoteClick);
        });
    }
}

export default new NoteList();
