import { ContentEditableEvent, Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStyles, Separator, HtmlButton, BtnClearFormatting, BtnLink, BtnBulletList, BtnNumberedList, BtnStrikeThrough, BtnUndo, BtnRedo } from "react-simple-wysiwyg";

export default function RichTextEditor({
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
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}