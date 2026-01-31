import Link from "next/link";
import { Card, FormControl } from "react-bootstrap";
import { IoIosLogOut } from "react-icons/io";
export default function Profile() {
  return (
    <div id="wd-profile-screen" className="w-50 mx-auto mt-5" style={{ minWidth: '400px' }}>
      <Card className="w-75 p-5 mb-3 d-flex align-items-center gap-2">
        <h3>Profile</h3>
        <FormControl defaultValue="alice" placeholder="username" className="wd-username" />
        <FormControl defaultValue="123" placeholder="password" type="password" className="wd-password" />
        <FormControl defaultValue="Alice" placeholder="First Name" id="wd-firstname" />
        <FormControl defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" />
        <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" />
        <FormControl defaultValue="alice@wonderland" type="email" id="wd-email" />
        <FormControl as="select" defaultValue="FACULTY" id="wd-role">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormControl>
        <Link href="/account/signin" className="btn btn-danger d-flex flex-row align-items-center mt-4" >
          <IoIosLogOut className="me-1" />
          Sign Out
        </Link>
      </Card>
    </div>
  );
}
