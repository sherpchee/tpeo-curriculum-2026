const questions = [
  {
    prompt: "Which HTML element is best for grouping related quiz answers?",
    helpText: "Think about semantic structure and accessibility.",
    choices: ["div", "fieldset", "span", "section"],
    answerIndex: 1,
    explanation: "fieldset is the best semantic choice for grouping related controls.",
  },
  {
    prompt: "Which CSS property adds space inside an element's border?",
    helpText: "This is one of the main box model concepts from Week 2.",
    choices: ["margin", "padding", "gap", "position"],
    answerIndex: 1,
    explanation: "Padding creates space inside the border and around the content.",
  },
  {
    prompt: "Which JavaScript method attaches an event handler to an element?",
    helpText: "This is the event-listening pattern from the classwork demo.",
    choices: ["addEventListener", "querySelector", "textContent", "appendChild"],
    answerIndex: 0,
    explanation: "addEventListener is how you tell the browser what code to run on an event.",
  },
  {
    prompt: "Which event is best when you want feedback while someone types?",
    helpText: "The answer should feel responsive without needing a submit button.",
    choices: ["click", "keyup", "input", "mouseenter"],
    answerIndex: 2,
    explanation: "The input event is ideal for live typing feedback because it fires as the value changes.",
  },
];

// TEMPLATE POINT 5: Explore how question data drives the quiz.

const quizTitle = document.getElementById("quiz-title");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const questionHelp = document.getElementById("question-help");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const scorePill = document.getElementById("score-pill");
const nextButton = document.getElementById("next-button");
const resetButton = document.getElementById("reset-button");
const quizForm = document.getElementById("quiz-form");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let questionLocked = false;

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  quizTitle.textContent = `Question ${questionNumber} of ${questions.length}`;
  questionText.textContent = question.prompt;
  questionHelp.textContent = question.helpText;
  progressText.textContent = `Question ${questionNumber} of ${questions.length} is ready.`;
  progressFill.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
  scorePill.textContent = `Score: ${score}`;

  selectedAnswerIndex = null;
  questionLocked = false;
  nextButton.textContent = "Check Answer";
  nextButton.disabled = true;
  resetButton.hidden = true;
  feedback.className = "feedback";
  feedback.textContent = "Choose one answer to continue.";

  choicesContainer.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const choiceId = `choice-${currentQuestionIndex}-${index}`;
    const choiceWrapper = document.createElement("div");
    choiceWrapper.className = "choice";

    choiceWrapper.innerHTML = `
      <input type="radio" name="question-choice" id="${choiceId}" value="${index}" />
      <label for="${choiceId}">${choice}</label>
    `;

    const input = choiceWrapper.querySelector("input");
    input.addEventListener("change", handleSelection);

    choicesContainer.appendChild(choiceWrapper);
  });
}

function handleSelection(event) {
  // TEMPLATE POINT 7: Respond to an answer selection and prepare it to be checked.
  if(questionLocked){
    return;
  }

  selectedAnswerIndex = Number(event.target.value);
  nextButton.disabled = false;
  feedback.textContext = "Now check your answer";
}

function lockChoices() {
  const choiceNodes = [...choicesContainer.querySelectorAll(".choice")];
  choiceNodes.forEach((choiceNode) => {
    const input = choiceNode.querySelector("input");
    input.disabled = true;

    const answerIndex = Number(input.value);
    choiceNode.classList.remove("correct", "incorrect");

    if (answerIndex === questions[currentQuestionIndex].answerIndex) {
      choiceNode.classList.add("correct");
    }

    if (answerIndex === selectedAnswerIndex && answerIndex !== questions[currentQuestionIndex].answerIndex) {
      choiceNode.classList.add("incorrect");
    }
  });
}

function showResult() {
  quizTitle.textContent = "Quiz Complete";
  questionText.textContent = `You scored ${score} out of ${questions.length}.`;
  questionHelp.textContent = "Restart the quiz to walk through the lesson again.";
  progressText.textContent = "The quiz is finished.";
  progressFill.style.width = "100%";
  choicesContainer.innerHTML = "";
  feedback.className = "feedback good";
  feedback.textContent = score === questions.length
    ? "Perfect score. Nice work."
    : "Good effort. Use the restart button to try again.";
  nextButton.hidden = true;
  resetButton.hidden = false;
}

function handlePrimaryAction() {
  if (questionLocked) {
    currentQuestionIndex += 1;

    if (currentQuestionIndex >= questions.length) {
      showResult();
      return;
    }

    renderQuestion();
    return;
  }

  questionLocked = true;

  const correctAnswerIndex = questions[currentQuestionIndex].answerIndex;
  const isCorrect = selectedAnswerIndex === correctAnswerIndex;

  if (isCorrect) {
    score += 1;
    feedback.className = "feedback good";
    feedback.textContent = `Correct. ${questions[currentQuestionIndex].explanation}`;
  } else {
    feedback.className = "feedback bad";
    feedback.textContent = `Not quite. ${questions[currentQuestionIndex].explanation}`;
  }

  scorePill.textContent = `Score: ${score}`;
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question";
  progressText.textContent = "Answer locked in. Move to the next question.";
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  lockChoices();
}

function restartQuiz() {
  // TEMPLATE POINT 8: Return the quiz to its starting state.

  currentQuestionIndex = 0;
  score = 0;
  nextButton.hidden = false;
  selectedAnswerIndex = null;
  questionLocked = false;
  renderQuestion();
}

// TEMPLATE POINT 6: Connect the quiz controls to their behavior.
nextButton.addEventListener("click", handlePrimaryAction);
resetButton.addEventListener("click", restartQuiz);

quizForm.addEventListener("submit", (event) => event.preventDefault());

renderQuestion();
