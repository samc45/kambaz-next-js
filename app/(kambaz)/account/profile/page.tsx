import Link from "next/link";
import { Card, Form, FormControl } from "react-bootstrap";
import { IoIosLogOut } from "react-icons/io";
export default function Profile() {
  return (
    <div id="wd-profile-screen" className="w-50 mx-auto mt-5">
      <Card className="w-75 p-5 mb-3 d-flex align-items-center gap-2">
        <h3>Profile</h3>
        <FormControl defaultValue="alice" placeholder="username" className="wd-username" /><br />
        <FormControl defaultValue="123" placeholder="password" type="password"
          className="wd-password" /><br />
        <FormControl defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br />
        <FormControl defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br />
        <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" /><br />
        <FormControl defaultValue="alice@wonderland" type="email" id="wd-email" /><br />
        <FormControl as="select" defaultValue="FACULTY" id="wd-role">
          <option value="USER">User</option>       <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
        </FormControl>
        <Link href="signin" className="d-flex flex-row align-items-center mt-4" > <IoIosLogOut className="me-1" /> Sign Out </Link>
      </Card>
    </div>
  );
}
