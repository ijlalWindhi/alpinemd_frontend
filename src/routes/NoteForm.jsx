import { Form } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.div`
  flex: 0.25 1 25em;
  padding: 1.5rem;
  border-left: solid 1px #ddd;
`;

const InnerFormWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  font-family: monospace;
  line-height: 1.1rem;
`;

const Input = styled.input`
  border: solid 1px #ccc;
  border-radius: 16px 16px 0px 0px;
  border-bottom: none;
  padding: 0.5rem;
  min-width: 20rem;
`;

const Textarea = styled.textarea`
  border: solid 1px #ccc;
  border-radius: 0px 0px 16px 16px;
  border-top: none;
  padding: 0.5rem;
  min-width: 20rem;
`;

const SubmitInput = styled.input`
  margin-top: 0.5rem;
  border: none;
  background-color: #ddd;
  padding: 0.5rem;
`;

const Label = styled.label`
  display: none;
  font-size: large;
  font-weight: 500;
`;

export default function NoteForm() {
  return (
    <FormWrapper>
      <Form method="post" action="/notes">
        <InnerFormWrapper>
          <Label htmlFor="title">Title</Label>
          <Input name="title" id="title" placeholder="Title" />
          <Label htmlFor="body">Body</Label>
          <Textarea name="body" id="body" placeholder="Write your note here">
          </Textarea>
          <SubmitInput type="submit" value="Add Note" />
        </InnerFormWrapper>
      </Form>
    </FormWrapper>
  );
}
