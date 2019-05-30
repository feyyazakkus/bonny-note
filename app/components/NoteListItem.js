import { toRelativeDate } from "../utils";

class NoteListItem {
    constructor(note) {
        this.note = note;
    }

    getTitle() {
        if (this.note.title.length <= 40) {
            return this.note.title;
        }
        return this.note.title.substring(0, 40) + '...';
    }

    render() {
        return `
            <div class="item note" data-note-id="${this.note.id}">
                <div class="title">${this.getTitle()}</div>
                <div class="text">${this.note.text}</div>
                <div class="date">${toRelativeDate(this.note.updated_at)}</div>
            </div>
        `;
    }
}

export default NoteListItem;
