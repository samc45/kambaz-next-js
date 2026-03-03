import { useEffect } from "react";
import { Post } from "../types";
import StatRow from "./StatRow";
import StatusRow from "./StatusRow";

export default function ClassAtAGlance({ posts }: { posts: Post[] }) {

  const numberOfUnreadPosts = 0; // Placeholder, implement logic as needed
  const numberOfUnansweredQuestions = posts.filter(post => post.type === 'question' && !post.instructorAnswered).length;
  const studentResponses = posts.reduce((count, post) => { post.answers?.forEach(answer => { if (!answer.isInstructor) count++; }); return count; }, 0);
  const instructorResponses = posts.reduce((count, post) => { post.answers?.forEach(answer => { if (answer.isInstructor) count++; }); return count; }, 0);

  useEffect(() => {
    console.log("ClassAtAGlance got posts:", posts);
  }, [posts]);

  return (
    <div className="border rounded bg-light">
      <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
        <strong className="me-2">Class at a Glance</strong>
      </div>
      <div className="p-3 bg-white">
        <div className="row">
          <div className="col-md-6">
            <StatusRow
              type={(numberOfUnreadPosts === 0 ? "success" : "warning")}
              text={`${numberOfUnreadPosts === 0 ? "no" : numberOfUnreadPosts} unread posts`}
            />
            <StatusRow
              type={(numberOfUnansweredQuestions === 0 ? "success" : "warning")}
              text={`${numberOfUnansweredQuestions === 0 ? "no" : numberOfUnansweredQuestions} unanswered questions`}
            />
          </div>
          <div className="col-md-6">
            <StatRow label="total posts" value={`${posts.length}`} />
            <StatRow label="instructors' responses" value={`${instructorResponses}`} />
            <StatRow label="students' responses" value={`${studentResponses}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
