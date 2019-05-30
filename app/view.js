import Sidebar  from "./components/Sidebar";
import Editor   from "./components/Editor";

class View {
    constructor() {
        this.sidebar = new Sidebar();
        this.editor = new Editor();
    }

    async render() {
        const sidebarComponent = await this.sidebar.render();
        const editorComponent = this.editor.render();

        const content = `
            <div class="container">
                ${sidebarComponent}
                ${editorComponent}
            </div>
        `;

        document.getElementById('app').innerHTML = content;
    }
}

export default View;
