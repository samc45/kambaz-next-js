/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControlButtons from "./ModulesControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  function Module({ module }: { module: any }) {
    return (
      <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary">
          {!module.editing && module.name}
          {module.editing && (
            <FormControl className="w-50 d-inline-block"
              onChange={(e) =>
                dispatch(
                  updateModule({ ...module, name: e.target.value })
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(updateModule({ ...module, editing: false }));
                }
              }}
              defaultValue={module.name} />
          )}
          <ModulesControlButtons
            isFaculty={true}
            moduleId={module._id}
            deleteModule={() => dispatch(deleteModule(module._id))}
            editModule={() => dispatch(editModule(module._id))}
          />
        </div>
        {module.lessons && (
          <ListGroup className="wd-lessons rounded-0">
            {module.lessons.map((lesson: any) => (
              <ListGroupItem className="wd-lesson p-3 ps-1" key={lesson._id}>
                <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </ListGroupItem>
    );
  }

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <Module key={module._id} module={module} />
        ))}
      </ListGroup>
    </div>
  );
}
