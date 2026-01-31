import Link from "next/link";
import { Card, FormControl } from "react-bootstrap";
export default function Signin() {
  return (
    <div id="wd-signin-screen" className="w-50 mx-auto mt-5">
      <Card className="w-75 p-5 mb-3 d-flex align-items-center gap-2">
        <h3 className="mb-3">Sign In</h3>
        <FormControl id="wd-username"
          placeholder="username"
          className="mb-2" />
        <FormControl id="wd-password"
          placeholder="password" type="password"
          className="mb-2" />
        <Link id="wd-signin-btn"
          href="/account/profile"
          className="btn btn-danger w-100 mb-2">
          Sign In
        </Link>
      </Card>
      <Link id="wd-signup-link" href="/account/signup">Sign Up</Link>
    </div>
  );
}