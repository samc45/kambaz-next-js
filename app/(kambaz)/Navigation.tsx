"use client";

import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TfiDashboard } from "react-icons/tfi";

type NavigationOptionProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  id: string;
  className?: string;
};

/**
 * A navigation option for the sidebar (to prevent code duplication)
 * @param props the properties of the navigation option
 * @returns a navigation option component
 */
function NavigationOption(props: NavigationOptionProps) {
  // its selected if the current navigation option href matches the current path
  const pathname = usePathname();
  const isActive = pathname.includes(props.href);

  const iconColor = props.label == "Account"
    ? isActive ? "text-danger" : "text-white"
    : "text-danger"

  return (
    <ListGroupItem className={`border-0 bg-black text-center ${isActive ? 'bg-white' : ''}`} as="div">
      <Link
        href={props.href}
        id={props.id}
        className={`text-decoration-none ${isActive ? 'text-danger' : 'text-white'}`}
      >
        <span className={`fs-1 d-block ${isActive ? "font-bold" : ""} ${iconColor}`}>
          {props.icon}
        </span>
        {props.label}
      </Link>
    </ListGroupItem >
  );
}

export default function KambazNavigation() {
  // possible navigation options to show to the user
  const navigationOptions: NavigationOptionProps[] = [
    { href: "/account", icon: <FaRegCircleUser />, label: "Account", id: "wd-account-link" },
    { href: "/dashboard", icon: <TfiDashboard />, label: "Dashboard", id: "wd-dashboard-link" },
    { href: "/courses", icon: <LiaBookSolid />, label: "Courses", id: "wd-courses-link" },
    { href: "/calendar", icon: <IoCalendarOutline />, label: "Calendar", id: "wd-calendar-link" },
    { href: "/inbox", icon: <FaInbox />, label: "Inbox", id: "wd-inbox-link" },
    { href: "/labs", icon: <LiaCogSolid />, label: "Labs", id: "wd-settings-link" },
  ];

  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
      id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <Image src="/images/NEU.png" width={75} height={75} alt="Northeastern University" />
      </ListGroupItem>
      <br />

      {navigationOptions.map((option) => (
        <NavigationOption key={option.id} {...option} />
      ))}
    </ListGroup>
  );
}
