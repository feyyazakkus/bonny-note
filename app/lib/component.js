import state from "../state";

/**
 * Base component class
 */
export default class Component {
    constructor() {
        state.events.subscribe('afterRender', this.afterRender.bind(this));
    }

    afterRender() { }
}
