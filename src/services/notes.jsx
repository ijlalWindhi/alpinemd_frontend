export const API = "http://localhost:8080";
export let accessToken = null;

export function getNotes() {
    return fetch(
        `${API}/notes`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
}

export function getNote(note_id, access_token) {
    return fetch(
        `${API}/notes/${note_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
}

export function createNote(note, access_token) {
    return fetch(
        `${API}/notes`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: {
                title: note.title,
                body: note.body
            }
        }
    );
}