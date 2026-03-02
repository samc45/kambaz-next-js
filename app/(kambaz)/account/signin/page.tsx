"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../database";
import { FormControl, Card, Button } from "react-bootstrap";


export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/dashboard");
  };

  return (
    <div id="wd-signin-screen" className="w-50 mx-auto mt-5" style={{ minWidth: '400px' }}>
      <Card className="w-75 p-5 mb-3 d-flex align-items-center gap-2">
        <h3 className="mb-3">Sign In</h3>
        <FormControl defaultValue={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-2" placeholder="username" id="wd-username" />
        <FormControl defaultValue={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-2" placeholder="password" type="password" id="wd-password" />
        <Button onClick={signin} id="wd-signin-btn" className="w-100 btn-danger" > Sign in </Button>
      </Card>
      <Link id="wd-signup-link" href="/account/signup">Sign Up</Link>
    </div>
  );
}