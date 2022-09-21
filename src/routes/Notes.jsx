import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Note from "../components/Note";

const NotesWrapper = styled.div`
  flex-grow: 1;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export default function Notes() {
  const {
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

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
            Authorization: `Bearer ${accessToken}`
          }
        });

        const notes = await notesResponse.json();

        setNotes(notes);
      } catch(e) {
        console.error(e.message);
      }
    }

    if (isAuthenticated) getUserNotes();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <NotesWrapper>
      {isAuthenticated && notes && (
        notes.map((note, i) => <Note title={note.title} body={note.body} key={i} />)
      )}
    </NotesWrapper>
  );
}
