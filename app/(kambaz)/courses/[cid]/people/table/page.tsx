import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

interface Person {
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

const people: Person[] = [
  {
    firstName: "Tony",
    lastName: "Stark",
    loginId: `${Number(Math.random() * 100000000).toFixed(0)}S`,
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    loginId: `${Number(Math.random() * 100000000).toFixed(0)}S`,
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  },
  {
    firstName: "Bruce",
    lastName: "Banner",
    loginId: `${Number(Math.random() * 100000000).toFixed(0)}S`,
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  },
  {
    firstName: "Natasha",
    lastName: "Romanoff",
    loginId: `${Number(Math.random() * 100000000).toFixed(0)}S`,
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  }
]

export default function PeopleTable() {

  function renderPersonRow(person: Person) {
    return (
      <tr key={person.loginId}>
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
          {people.map((person) => renderPersonRow(person))}
        </tbody>
      </Table>
    </div>);
}