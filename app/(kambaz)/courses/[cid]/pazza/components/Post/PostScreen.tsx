import InstructorAnswer from "./InstructorAnswer";
import PostDetails from "./PostDetails";

// interface PostScreenProps {

// }

export default function PostScreen() {
  return (
    <div className="p-2">
      <PostDetails
        type={"question"}
        title={"My assignment is not showing as graded"}
        author={"John Doe"}
        body={"hello so for some reason on canvas it says that my assignment is not graded but i submitted it on time"}
        folders={["hw1"]}
      />

      {/* if post is a question, then show the instructor answer section and student answers section */}

      {/* <StudentAnswers /> */}

      <InstructorAnswer
        answerText="
        Hi John, TAs are currently looking into this and will get back to you shortly,

        Thanks,
        Alice Wonderland
        "
        onChange={() => { }}
      />
    </div>
  )
}