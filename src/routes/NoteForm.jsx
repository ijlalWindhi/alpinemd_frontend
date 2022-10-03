import { Form } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled(Form)`
  flex-grow: 1;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  font-family: monospace;
  line-height: 1.1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  min-width: 20rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  min-width: 20rem;
`;

const SubmitInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const Label = styled.label`
  display: none;
  font-size: large;
  font-weight: 500;
`;

export default function NoteForm() {
  return (
    <StyledForm method="post" action="/notes">
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" placeholder="Title" />
        <Label htmlFor="body">Body</Label>
        <Textarea name="body" id="body" placeholder="Write your note here">
        </Textarea>
        <SubmitInput type="submit" value="Add Note" />
    </StyledForm>
  );
}
