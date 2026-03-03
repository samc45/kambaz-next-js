"use client";

import { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { addFolder, deleteFolder, updateFolder } from '../../reducer';
import FolderPill from '../FolderPill';
import { v4 as uuidv4 } from 'uuid';


export default function ManageFoldersTab() {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.pazzaReducer.foldersList);

  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");

  const onAddFolder = () => {
    const folderName = newFolderName.trim();
    if (!folderName) return;
    dispatch(addFolder({ id: uuidv4(), name: folderName }));
    setNewFolderName("");
  };

  const onFolderNameChange = (folderId: string, newName: string) => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;
    dispatch(updateFolder({ id: folderId, name: trimmedName }));
  };

  const onStartEditingFolder = (folderId: string, folderName: string) => {
    setEditingFolder(folderId);
    setEditingFolderName(folderName);
  };

  const onCancelEditingFolder = () => {
    setEditingFolder(null);
    setEditingFolderName("");
  };

  const onSaveEditingFolder = (folderId: string) => {
    onFolderNameChange(folderId, editingFolderName);
    onCancelEditingFolder();
  };

  const onDeleteFolder = (folderId: string) => {
    dispatch(deleteFolder(folderId));
  };

  return (
    <Container fluid className="px-0">
      <h2 className="h4 fw-bold mb-3">Configure Class Folders</h2>
      <p className="mb-4">
        Folders allow you to keep class content organized. When students and instructors add a new post,
        <br />
        they will be required to specify at least one folder for their post.
      </p>

      <Row className="g-2 align-items-start mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(event) => setNewFolderName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onAddFolder();
              }
            }}
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={onAddFolder}>
            Add Folder
          </Button>
        </Col>
      </Row>

      <h3 className="h5 fw-semibold mb-3">Manage Folders</h3>
      <ListGroup>
        {folders.length === 0 ? (
          <ListGroup.Item className="text-muted">No folders have been created yet.</ListGroup.Item>
        ) : (
          folders.map((folder) => (
            <ListGroup.Item key={folder.id} className="d-flex align-items-center justify-content-between">
              {editingFolder === folder.id ? (
                <div className="d-flex gap-2 align-items-center">
                  <Form.Control
                    type="text"
                    value={editingFolderName}
                    onChange={(event) => setEditingFolderName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        onSaveEditingFolder(folder.id);
                      } else if (event.key === "Escape") {
                        onCancelEditingFolder();
                      }
                    }}
                  />
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onSaveEditingFolder(folder.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={onCancelEditingFolder}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <FolderPill
                  name={folder.name}
                  selected={false}
                  onClick={() => { }}
                />
              )}
              <div className='d-flex gap-2'>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onStartEditingFolder(folder.id, folder.name)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDeleteFolder(folder.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
}