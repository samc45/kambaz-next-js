import { FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { PiPlusCircleLight } from "react-icons/pi";
import ThreadItem from "./ThreadItem";
import SectionHeader from "./SectionHeader";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import React from "react";
import { Post } from "../types";

// Get start of day for a given date (00:00:00)
function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Convert string to Date, with fallback to current date if invalid
function toDate(value: string) {
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date;
  return new Date();
}

// Check if two dates are on the same calendar day
function isSameDay(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

// Get Monday of the week for a given date to help format week ranges
function getMonday(date: Date) {
  const monday = new Date(date);
  const day = monday.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + offset);
  return startOfDay(monday);
}

// Get Sunday of the week for a given date to help format week ranges
function getSunday(date: Date) {
  const monday = getMonday(date);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return sunday;
}

// Format week range as "MM/DD - MM/DD"
function formatWeekRange(date: Date) {
  const monday = getMonday(date);
  const sunday = getSunday(date);
  const start = `${monday.getMonth() + 1}/${monday.getDate()}`;
  const end = `${sunday.getMonth() + 1}/${sunday.getDate()}`;
  return `${start} - ${end}`;
}

function formatPostTime(postDate: Date, now: Date) {
  const today = startOfDay(now);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(postDate, today) || isSameDay(postDate, yesterday)) {
    return postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return postDate.toLocaleDateString();
}

interface ListOfPostsSidebarProps {
  posts: Post[];
  selectedPost: Post | null;
  onNewPostClick: () => void;
}

export default function ListOfPostsSidebar({
  posts,
  onNewPostClick,
}: ListOfPostsSidebarProps) {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

  const groupedPosts = React.useMemo(() => {
    const now = new Date();
    const today = startOfDay(now);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);

    const sortedPosts = [...posts].sort(
      (left, right) => toDate(right.createdAt).getTime() - toDate(left.createdAt).getTime()
    );

    const todayPosts: Post[] = [];
    const yesterdayPosts: Post[] = [];
    const lastWeekPosts: Post[] = [];
    const olderByWeek = new Map<string, Post[]>();

    sortedPosts.forEach((post) => {
      const postDate = toDate(post.createdAt);
      const postDay = startOfDay(postDate);

      if (isSameDay(postDay, today)) {
        todayPosts.push(post);
        return;
      }

      if (isSameDay(postDay, yesterday)) {
        yesterdayPosts.push(post);
        return;
      }

      if (postDay >= lastWeekStart) {
        lastWeekPosts.push(post);
        return;
      }

      const weekLabel = formatWeekRange(postDate);
      const existing = olderByWeek.get(weekLabel) ?? [];
      olderByWeek.set(weekLabel, [...existing, post]);
    });

    return {
      now,
      todayPosts,
      yesterdayPosts,
      lastWeekPosts,
      olderByWeek,
    };
  }, [posts]);

  return (
    <div className="position-relative" style={{ height: "100%" }}>
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className="position-absolute border-0 justify-content-center align-items-center d-flex z-top"
        style={{
          top: "0",
          left: "0",
          width: "20px",
          height: "20px",
          background: "var(--pazza-gray)",
          cursor: "pointer",
        }}
        title={isSidebarVisible ? "Hide Posts List" : "Show Posts List"}
      >
        <span className="text-white d-flex justify-content-center align-items-center">
          {isSidebarVisible ? <RxTriangleLeft className="fs-4" /> : <RxTriangleRight className="fs-4" />}
        </span>
      </button>

      {isSidebarVisible && (
        <div className="small h-100 d-flex flex-column border-end bg-white"
          style={{ width: "300px", boxShadow: "2px 0 8px rgba(0,0,0,0.08)", paddingTop: "14px" }}
        >
          <div className="p-2 border-bottom">
            <div className="d-flex align-items-center gap-2 mb-2">
              <button className="btn btn-primary btn-sm d-flex align-items-center"
                style={{ height: "32px", whiteSpace: "nowrap" }}
                onClick={onNewPostClick}
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
            {groupedPosts.todayPosts.length > 0 && (
              <SectionHeader title="Today">
                {groupedPosts.todayPosts.map((post) => (
                  <ThreadItem
                    key={post.id}
                    title={post.title}
                    subtitle={post.body}
                    time={formatPostTime(toDate(post.createdAt), groupedPosts.now)}
                    instructorPosted={post.instructorPosted}
                    instructorEndorses={post.instructorEndorses}
                    instructorAnswered={post.instructorAnswered}
                  />
                ))}
              </SectionHeader>
            )}

            {groupedPosts.yesterdayPosts.length > 0 && (
              <SectionHeader title="Yesterday">
                {groupedPosts.yesterdayPosts.map((post) => (
                  <ThreadItem
                    key={post.id}
                    title={post.title}
                    subtitle={post.body}
                    time={formatPostTime(toDate(post.createdAt), groupedPosts.now)}
                    instructorPosted={post.instructorPosted}
                    instructorEndorses={post.instructorEndorses}
                    instructorAnswered={post.instructorAnswered}
                  />
                ))}
              </SectionHeader>
            )}

            {groupedPosts.lastWeekPosts.length > 0 && (
              <SectionHeader title="Last Week">
                {groupedPosts.lastWeekPosts.map((post) => (
                  <ThreadItem
                    key={post.id}
                    title={post.title}
                    subtitle={post.body}
                    time={formatPostTime(toDate(post.createdAt), groupedPosts.now)}
                    instructorPosted={post.instructorPosted}
                    instructorEndorses={post.instructorEndorses}
                    instructorAnswered={post.instructorAnswered}
                  />
                ))}
              </SectionHeader>
            )}

            {[...groupedPosts.olderByWeek.entries()].map(([weekRange, weekPosts]) => (
              <SectionHeader key={weekRange} title={weekRange}>
                {weekPosts.map((post) => (
                  <ThreadItem
                    key={post.id}
                    title={post.title}
                    subtitle={post.body}
                    time={formatPostTime(toDate(post.createdAt), groupedPosts.now)}
                    instructorPosted={post.instructorPosted}
                    instructorEndorses={post.instructorEndorses}
                    instructorAnswered={post.instructorAnswered}
                  />
                ))}
              </SectionHeader>
            ))}

            {posts.length === 0 && (
              <div className="p-3 text-muted small">No posts yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
