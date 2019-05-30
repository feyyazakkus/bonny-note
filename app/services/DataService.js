import { API_URL } from "../config";

const DataService = {
    getAllNotes() {
        return new Promise((resolve, reject) => {
            fetch(API_URL + '/notes')
                .then(this.handleResponse)
                .then(response => resolve(response));
        });
    },

    getNote(id) {
        return new Promise((resolve, reject) => {
            fetch(API_URL + '/notes/' + id)
                .then(this.handleResponse)
                .then(response => resolve(response));
        });
    },

    addNote(data) {
        return new Promise((resolve, reject) => {
            fetch(API_URL + '/notes', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(this.handleResponse)
                .then(response => resolve(response));
        });
    },

    updateNote(id, data) {
        return new Promise((resolve, reject) => {
            fetch(API_URL + '/notes/' + id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(this.handleResponse)
                .then(response => resolve(response));
        });
    },

    deleteNote(id) {
        return new Promise((resolve, reject) => {
            fetch(API_URL + '/notes/' + id, {
                method: 'DELETE'
            }).then(this.handleResponse)
                .then(response => resolve(response));
        });
    },

    handleResponse(response) {
        if (!response.ok) {
            alert("An error occurred. Please try again.");
            throw response;
        }
        return response.json();
    }
}

export default DataService;
