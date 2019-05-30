import Component from '../lib/component';
import DataService from "../services/DataService";

import state from '../state';
import { debounce, addSelectedClass } from "../utils";
import fullScreenIcon from '../assets/images/full_screen_icon.png';


class Editor extends Component {
    constructor() {
        super();
    }

    loadFirstNote() {
        const firstNote = document.querySelector('.note');
        if (firstNote) {
            DataService.getNote(firstNote.dataset.noteId).then(note => {
                state.selectedNote = note;
                state.noteTitleInput.value = note.title;
                state.editor.innerHTML = note.html;
                addSelectedClass(firstNote);
            });
        }
    }

    initTextChangeEvent() {
        const onTextChange = debounce((delta, oldDelta, source) => {
            if (state.selectedNote.id && source == 'user' && state.isEdit) {
                const data = {
                    text: state.quill.getText().length > 100 ? 
                        state.quill.getText().substring(0, 100) + '...' : state.quill.getText(),
                    html: state.editor.innerHTML,
                    updated_at: new Date()
                };
                DataService.updateNote(state.selectedNote.id, data).then(() => {
                    state.noteTextChanged = true;
                });
            }
        }, 1000);

        state.quill.on('text-change', onTextChange);
    }

    /**
     * Note title events
     */
    initNoteTitleInputEvent() {
        state.noteTitleInput = document.getElementById('current-note-title');

        state.noteTitleInput.addEventListener('blur', e => {
            if (state.isNewNote) {
                const data = {
                    title: e.target.value.length > 0 ? e.target.value : 'Untitled',
                    text: '...',
                    html: '',
                    created_at: new Date(),
                    updated_at: new Date()
                };
                DataService.addNote(data).then(response => {
                    state.selectedNote = response;
                    state.isNewNote = false;
                    state.events.publish('noteChange');
                });
                return;
            }

            if (e.target.value.length > 0 && e.target.value !== state.selectedNote.title) {
                const data = {
                    title: e.target.value,
                    updated_at: new Date()
                };
                DataService.updateNote(state.selectedNote.id, data).then(() => {
                    state.events.publish('noteChange');
                });
            }
        });
    }

    removeNote() {
        DataService.deleteNote(state.selectedNote.id).then(() => {
            state.events.publish('noteChange');
            this.loadFirstNote();
        });
    }

    showMenu() {
        if (!this.visible) {
            this.visible = true;
            this.menuEl.classList.add('show-more-menu');
            document.addEventListener('mousedown', this.hideMenu.bind(this));
        }
    }

    hideMenu(e) {
        if (this.moreBtn.contains(e.target)) {
            return;
        }
        if (this.visible) {
            this.visible = false;
            this.menuEl.classList.remove('show-more-menu');
            document.removeEventListener('mousedown', this.hideMenu.bind(this));
        }
    }

    toggleFullScreen() {
        if (state.isFullScreen) {
            state.isFullScreen = false;
            document.body.classList.remove('full-screen');
        } else {
            state.isFullScreen = true;
            document.body.classList.add('full-screen');
        }
    }

    render() {
        return `
            <div class="editor-container">
                <div class="editor-top">
                    <div class="current-note-title">
                        <input type="text" id="current-note-title" value="" autocomplete="disabled" />
                    </div>
                    <div class="more">
                        <div class="more-btn" id="more-btn"></div>
                        <div class="more-menu">
                            <ul class="more-menu-items">
                                <li class="more-menu-item">
                                    <button type="button" class="more-menu-btn" id="remove-note">Remove</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="editor"></div>
                <div class="full-screen-icon">
                    <img src="${fullScreenIcon}" />
                </div>
            </div>
        `;
    }

    afterRender() {
        state.quill = new Quill('.editor', { theme: 'snow' });
        state.editor = state.quill.container.firstChild;

        state.editor.addEventListener('focus', () => {
            state.isEdit = true;
        });
        state.editor.addEventListener('blur', () => {
            state.isEdit = false;
            if (state.noteTextChanged) {
                state.events.publish('noteChange');
            }
        });

        // Remove note event
        const removeBtn = document.getElementById('remove-note');
        removeBtn.addEventListener('click', this.removeNote.bind(this));

        // More menu events
        this.visible = false;
        this.menuEl = document.querySelector('.more');
        this.moreBtn = this.menuEl.querySelector('.more-btn');
        this.menu = this.menuEl.querySelector('.more-menu');
        this.moreBtn.addEventListener('click', this.showMenu.bind(this));

        // Full screen event
        state.isFullScreen = false;
        const fullScreen = document.querySelector('.full-screen-icon');
        fullScreen.addEventListener('click', this.toggleFullScreen);

        this.initTextChangeEvent();
        this.initNoteTitleInputEvent();
        this.loadFirstNote();
    }
}

export default Editor;
