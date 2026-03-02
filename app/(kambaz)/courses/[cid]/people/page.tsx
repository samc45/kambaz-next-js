"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../../database";
import { useParams } from "next/navigation";

interface Person {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function PeopleTable() {
  const { cid } = useParams();
  const { users, enrollments } = db;

  function renderPersonRow(person: Person) {
    return (
      <tr key={person._id}>
        <td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">{person.firstName}</span>{" "}
          <span className="wd-last-name">{person.lastName}</span></td>
        <td className="wd-login-id">{person.loginId}</td>
        <td className="wd-section">{person.section}</td>
        <td className="wd-role">{person.role}</td>
        <td className="wd-last-activity">{person.lastActivity}</td>
        <td className="wd-total-activity">{person.totalActivity}</td>
      </tr>
    );
  }

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((usr) =>
              enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
            )
            .map((person) => renderPersonRow(person))}
        </tbody>
      </Table>
    </div>);
}