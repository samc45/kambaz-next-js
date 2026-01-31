"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  function currentlyActiveOption(path: string) {
    return pathname.includes(path) ? "active fw-bold" : "text-danger";
  }

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link href="signin" id="wd-signin-link"
        className={`list-group-item ${currentlyActiveOption("signin")} border-0`}> Signin
      </Link> <br />
      <Link href="signup" id="wd-signup-link"
        className={`list-group-item ${currentlyActiveOption("signup")} border-0`}> Signup
      </Link> <br />
      <Link href="profile" id="wd-profile-link"
        className={`list-group-item ${currentlyActiveOption("profile")} border-0`}> Profile
      </Link> <br />
    </div>
  );
}
