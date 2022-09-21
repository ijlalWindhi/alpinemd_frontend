import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import { Link } from "react-router-dom";

const NotesWrapper = styled.div`
  flex-grow: 1;
  padding: 1.5rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  gap: 1.5rem;

  & .new-note-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    padding: 1.5rem;
    border: solid 1px #ddd;
    border-radius: 16px;

    font-size: large;

    color: black;
    text-decoration: none;
  }
`;

const NewNoteButton = styled.a``;

export default function NoteList() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const getUserNotes = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://alpinemd.com/",
          scope: "read:notes",
        });

        const notesByUrl = "http://localhost:8080/notes";

        const notesResponse = await fetch(notesByUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const notes = await notesResponse.json();

        setNotes(notes);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (isAuthenticated) getUserNotes();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <NotesWrapper>
      {isAuthenticated &&
        notes &&
        notes.map((note, i) => (
          <Note title={note.title} body={note.body} key={i} />
        ))}
      <Link to="new" className="new-note-btn">
        <i className="ri-add-line" />
        New Note
      </Link>
    </NotesWrapper>
  );
}
