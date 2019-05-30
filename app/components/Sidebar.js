import Component from "../lib/component";
import NoteList  from "./NoteList";
import logoUrl   from "../assets/images/logo.png";
import state     from "../state";

class Sidebar extends Component {
    constructor() {
        super();
    }

    onAddNoteClick() {
        state.selectedNote = {};
        state.isNewNote = true;
        state.noteTitleInput.value = '';
        state.noteTitleInput.placeholder = 'Enter note title..';
        state.noteTitleInput.focus();
        state.quill.setText('');
    }

    async render() {
        const noteList = await NoteList.render();

        return `
            <div class="sidebar">
                <div class="sidebar-top">
                    <div>
                        <div class="app-info">
                            <div class="logo">
                                <img src="${logoUrl}" />
                            </div>
                            <div class="app-name">
                                <div>BonnyNote</div>
                            </div>
                        </div>
                        <div class="note-count">
                            <span id="note-count">0</span> notes
                        </div>
                    </div>
                </div>
                <div class="note-list" id="note-list">
                    ${noteList}
                </div>
                <div class="add-note" id="add-note">
                    <div class="icon icon-plus"></div>
                </div>
            </div>
        `;
    }

    afterRender() {
        const addNote = document.getElementById('add-note');
        addNote.addEventListener('click', this.onAddNoteClick);
    }
}

export default Sidebar;
