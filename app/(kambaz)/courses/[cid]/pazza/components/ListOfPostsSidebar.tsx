import { FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { PiPlusCircleLight } from "react-icons/pi";
import ThreadItem from "./ThreadItem";
import SectionHeader from "./SectionHeader";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import React from "react";

export default function ListOfPostsSidebar() {

  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

  return (
    <div className="position-relative" style={{ height: "100%" }}>
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className="position-absolute border-0 justify-content-center align-items-center d-flex z-top"
        style={{
          top: "0",
          left: "0",
          width: "20px",
          height: "20px",
          background: "var(--pazza-gray)",
          cursor: "pointer",
        }}
        title={isSidebarVisible ? "Hide Posts List" : "Show Posts List"}
      >
        <span className="text-white d-flex justify-content-center align-items-center">
          {isSidebarVisible ? <RxTriangleLeft className="fs-4" /> : <RxTriangleRight className="fs-4" />}
        </span>
      </button>

      {isSidebarVisible && (
        <div className="small h-100 d-flex flex-column border-end bg-white"
          style={{ width: "300px", boxShadow: "2px 0 8px rgba(0,0,0,0.08)", paddingTop: "14px" }}
        >
          <div className="p-2 border-bottom">
            <div className="d-flex align-items-center gap-2 mb-2">
              <button className="btn btn-primary btn-sm d-flex align-items-center"
                style={{ height: "32px", whiteSpace: "nowrap" }}
              >
                <PiPlusCircleLight className="me-1 fs-6" />
                New Post
              </button>
              <InputGroup size="sm">
                <InputGroupText className="bg-white">
                  <BsSearch />
                </InputGroupText>
                <FormControl
                  placeholder="Search posts..."
                  className="border-start-0"
                />
              </InputGroup>
            </div>
          </div>

          {/* Scrollable thread list */}
          <div className="flex-grow-1 overflow-auto">

            <SectionHeader title="Today" />
            <ThreadItem
              title="How to make buttons sit on the right side of "
              subtitle="In Homework one, we are implementing an assignment editor page..."
              time="04:09 PM"
              instructorAnswered
            />
            <ThreadItem
              title="Clarification on Lab1"
              subtitle="In the anchor tag part of lab1..."
              time="02:43 PM"
              instructorEndorses
            />

            <SectionHeader title="Yesterday" />
            <ThreadItem
              title="Heet Kanani - Office hours"
              subtitle="Hello everyone, I'm holding office hours..."
              time="06:56 AM"
              instructorPosted
            />

            <SectionHeader title="Last Week" />
            <ThreadItem
              title="Aryan Mehta - Office Hours"
              subtitle="Good Evening, I am holding office hours today today 
              today today today today today today today today today today today today cool coool coooooool coool"
              time="Friday"
              instructorPosted
            />

            {/* 
              Additional category accordions list posts grouped by what week they were posted in
              The name of the category should be Monday's Date of Week - Sunday's Date of Week, 
              e.g., if a week starts on Monday January 7, then the name of the category would be 1/7 - 1/13
            */}
            <SectionHeader title="1/7 - 1/13" />
            <ThreadItem
              title="Sahil Patel - Office Hours"
              subtitle="Hi all, I will be holding office hours this week on..."
              time="1/10/2024"
              instructorPosted
            />
          </div>
        </div>
      )}
    </div>
  );
}
