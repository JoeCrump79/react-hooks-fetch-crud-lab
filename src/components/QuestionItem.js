import React, { useState } from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const [localCorrectIndex, setLocalCorrectIndex] = useState(correctIndex);

  function handleDeleteClick() {
    deleteQuestion(id);
  }

  function handleCorrectAnswerChange(event) {
    const updatedIndex = parseInt(event.target.value);
    setLocalCorrectIndex(updatedIndex); // 👉 immediately update UI
    updateQuestion(id, { correctIndex: updatedIndex }); // still send PATCH
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={localCorrectIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
