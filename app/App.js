import View  from "./view";
import state from "./state";

class App {
    constructor() {
        this.view = new View();
    }

    init() {
        this.view.render().then(() => {
            state.events.publish('afterRender');
        });
    }
}

export default App;
