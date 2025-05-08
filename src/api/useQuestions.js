import { useState, useEffect } from "react";

function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  function addQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((savedQuestion) => {
        setQuestions([...questions, savedQuestion]);
      });
  }

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function updateQuestion(id, updatedData) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((questions) =>
          questions.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q
          )
        );
      });
  }

  return { questions, loading, addQuestion, deleteQuestion, updateQuestion };
}

export default useQuestions;
