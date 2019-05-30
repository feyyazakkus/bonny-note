import PubSub from "./lib/pubsub";

const initialState = {
    selectedNote: {},
    noteTextChanged: false,
    isNewNote: false,
    noteTitleInput: '',
    isEdit: false,
    quill: null,
    editor: null,
    isFullScreen: false,
    events: new PubSub()
};

const handler = {
    get: function(target, name) {
        return name in target ? target[name] : 'property does not exist';
    },
    set: function(state, key, value) {
        state[key] = value;
        state.events.publish('stateChange');
        return true;
    }
};

export default new Proxy(initialState, handler);
