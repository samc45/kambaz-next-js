import { Badge } from "react-bootstrap";

interface FolderProps {
  name: string;
  selected: boolean;
  onClick: (name: string) => void;
}

export default function FolderPill(props: FolderProps) {
  return (
    <Badge
      key={props.name}
      className={
        props.selected
          ? "new-post-folder-selected"
          : "new-post-folder-not-selected"
      }
      style={{
        cursor: "pointer",
        fontWeight: "normal"
      }}
      onClick={() => props.onClick(props.name)}
    >
      {props.name}
    </Badge>
  );
}