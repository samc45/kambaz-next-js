import Link from "next/link";
import { Card, FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen" className="w-50 mx-auto mt-5">
      <Card className="w-75 p-5 mb-3 d-flex align-items-center gap-2">
        <h3 className="mb-3">Sign Up</h3>
        <FormControl placeholder="username" className="wd-username" /><br />
        <FormControl placeholder="password" type="password" className="wd-password" /><br />
        <FormControl placeholder="verify password"
          type="password" className="wd-password-verify" /><br />
        <Link id="wd-signup-btn"
          href="/account/profile"
          className="btn btn-danger w-100 mb-2">
          Sign Up
        </Link>
      </Card>
      <Link href="signin" id="wd-signin-link"> Sign In </Link>
    </div>
  );
}
