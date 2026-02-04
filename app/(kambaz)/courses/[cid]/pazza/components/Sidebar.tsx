import { FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { PiPlusCircleLight } from "react-icons/pi";
import ThreadItem from "./ThreadItem";
import SectionHeader from "./SectionHeader";

export default function PazzaSidebar() {
  return (
    <div className="small h-100 d-flex flex-column"
      style={{ boxShadow: "2px 0 8px rgba(0,0,0,0.08)" }}
    >
      {/* Top actions */}
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

        {/* PINNED */}
        <SectionHeader title="Pinned" />

        <ThreadItem
          title="Search for Teammates!"
          subtitle="1 Open Teammate Search"
          time="1/3/25"
          pinned
        />

        {/* TODAY */}
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

        {/* YESTERDAY */}
        <SectionHeader title="Yesterday" />

        <ThreadItem
          title="Heet Kanani - Office hours"
          subtitle="Hello everyone, I'm holding office hours..."
          time="06:56 AM"
          instructorPosted
        />

        {/* LAST WEEK */}
        <SectionHeader title="Last Week" />

        <ThreadItem
          title="Aryan Mehta - Office Hours"
          subtitle="Good Evening, I am holding office hours today today today today today today today today today today today today today today"
          time="Friday"
          instructorPosted
        />
      </div>
    </div>
  );
}
