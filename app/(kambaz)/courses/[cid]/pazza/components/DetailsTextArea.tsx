import { ContentEditableEvent, Editor, EditorProvider, Toolbar, BtnBold, BtnItalic } from "react-simple-wysiwyg";

export default function DetailsTextArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {

  function handleChange(e: ContentEditableEvent) {
    onChange(e.target.value);
  }

  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={handleChange}
        placeholder="Add more details to your post..."
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}