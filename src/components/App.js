import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import useQuestions from "../api/useQuestions";

function App() {
  const [page, setPage] = useState("List");
  const { questions, loading, addQuestion, deleteQuestion, updateQuestion } = useQuestions();

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          loading={loading}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
