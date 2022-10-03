import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
`;

const ListControlsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0.5rem;
  border-bottom: solid 1px #ddd;
  padding-left: 1.5rem;
`;

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

const ControlLink = styled(Link)`
  padding: 0.3rem 0.4rem;
  display: flex;
  gap: 0.2rem;
  border-radius: 6px;
  border: solid 1px #ddd;
  text-decoration: none;
  color: black;
`;

const ControlButton = styled.button`
  padding: 0.3rem 0.4rem;
  display: flex;
  gap: 0.3rem;
  border-radius: 6px;
  border: solid 1px ${props => props.active ? "red" : "#ddd"};
  text-decoration: none;
  color: ${props => props.active ? "red" : "black"};
  font-size: inherit;
  background-color: white;
  cursor: pointer;

  & i {
    color: ${props => props.active ? "red" : "black"}
  }
`;

export default function NoteList() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [notes, setNotes] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

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
    <Container>
      <ListControlsContainer>
        <ControlLink to="new">
          <i className="ri-add-line" />
          New Note
        </ControlLink>
        <ControlButton onClick={() => setIsDeleteMode(!isDeleteMode)} active={isDeleteMode}>
          {isDeleteMode ? <i className="ri-close-line" /> : <i className="ri-delete-bin-7-line" />}
          Delete Note
        </ControlButton>
      </ListControlsContainer>
      <NotesWrapper>
        {isAuthenticated &&
          notes &&
          notes.map((note, i) => (
            <Note title={note.title} body={note.body} key={i} />
          ))}
      </NotesWrapper>
    </Container>
  );
}
