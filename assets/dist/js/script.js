// let category = document.querySelector(".category span");
// let QuizCountSpan = document.querySelector(".count span");
// let QuestionH2 = document.querySelector(".quiz-area h2");
// let answersArea = document.querySelector(".answers-area");
// let countdown = document.querySelector(".countdown");
// let bullets = document.querySelector(".bullets .spans");
// let btn = document.querySelector(".submit-button");

// // Get Data From API
// let Data;
// async function getData() {
//   let fetchData = await fetch(
//     "https://api.myjson.online/v1/records/6ab5bffb-d598-445e-9d91-9101fecd2333"
//   );
//   let res = await fetchData.json();
//   Data = res.data.Quiz;
//   console.log(Data);
//   showData();
//   btn.addEventListener("click", btnSubmit);
// }
// getData();

// function showData() {
//   let countQuestions = Data.length;
//   let Question = 1;

//   QuizCountSpan.textContent = countQuestions;
//   category.textContent = Data[Question - 1].Category;
//   QuestionH2.innerHTML = Data[Question - 1].Question;
//   answersArea.innerHTML = "";
//   Data[Question - 1].choices.forEach((el, i) => {
//     answersArea.innerHTML += `
//     <div class="answer">
//       <input type="radio" name="q" id="${i}" value="${el}">
//       <label id="${i}">${el}</label>
//     </div>`;
//   });

//   let elements = document.querySelectorAll(".answer");
//   console.log(elements);

//   elements.forEach((el) => {
//     el.addEventListener("click", () => {
//       elements.forEach((el) => {
//         el.removeAttribute("check");
//       });
//       el.setAttribute("check", "checked");
//     });
//   });
//   for (let i = 0; i < countQuestions; i++) {
//     let span = document.createElement("span");
//     bullets.append(span);
//   }
//   // console.log(Data[Question - 1].choices)
// }

// function btnSubmit() {
//   let elements = document.querySelectorAll(".answer");
//   elements.forEach((el, i) => {
//     if (el.hasAttribute("check")) {

//       console.log(document.querySelector(`input#${i}`) )

//     }
//   })
// }

// countdown;
// =================================

// // Select Elements
// let countSpan = document.querySelector(".count span");
// let bulletsSpanContainer = document.querySelector(".bullets .spans");
// let quizArea = document.querySelector(".quiz-area");
// let answersArea = document.querySelector(".answers-area");
// let submitButton = document.querySelector(".submit-button");

// // Set Options
// let currentIndex = 0;
// let rightAnswers = 0;

// function getQuestions() {
//   let myRequest = new XMLHttpRequest();

//   myRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       let questionsObject = JSON.parse(this.responseText);
//       let qCount = questionsObject.length;

//       // Create Bullets + Set Questions Count
//       createBullets(qCount);

//       // Add Queston Data
//       addQuestionData(questionsObject[currentIndex], qCount);

//       // Click On Submit
//       submitButton.addEventListener("click", () => {
//         // Get Right Answer
//         let theRightAnswer = questionsObject[currentIndex].right_answer;

//         // Increase Index
//         currentIndex++;
//         checkAnswer(theRightAnswer, qCount);
//       });
//     }
//   };

//   myRequest.open("GET", "json.json", true);
//   myRequest.send();
// }

// getQuestions();

// function createBullets(num) {
//   countSpan.innerHTML = num;

//   // Create Spans
//   for (let i = 0; i < num; i++) {
//     // Create Bullet
//     let theBullet = document.createElement("span");

//     // Check If Its First Span
//     if (i === 0) {
//       theBullet.className = "on";
//     }

//     // Append Bullets To Main
//     bulletsSpanContainer.append(theBullet);
//   }
// }

// function addQuestionData(obj, count) {
//   // Create H2 Question Title
//   let qusetionTitle = document.createElement("h2");

//   // Create Question Text
//   let questionText = document.createTextNode(obj.title);

//   // Apend Text To H2
//   qusetionTitle.append(questionText);

//   // Append The H2 The Quiz Area
//   quizArea.append(qusetionTitle);

//   // Create The Answers
//   for (let i = 1; i <= 4; i++) {
//     // Create Main Answer Div
//     let mainDiv = document.createElement("div");

//     // Add Clas To Main Div
//     mainDiv.className = "answer";

//     // Create Radio Input
//     let radioInput = document.createElement("input");

//     // Add Type + Name + Id + Data-Attribute
//     radioInput.name = "question";
//     radioInput.type = "radio";
//     radioInput.id = `answer_${i}`;
//     radioInput.dataset.answer = obj[`answer_${i}`];

//     // Make First Option Selected
//     if (i === 1) {
//       radioInput.checked = true;
//     }

//     // Create Label
//     let theLabel = document.createElement("label");

//     // Add For Attribute
//     theLabel.htmlFor = `answer_${i}`;

//     // Create Label Text
//     let theLabelText = document.createTextNode(obj[`answer_${i}`]);

//     // Add The Text To Label
//     theLabel.appendChild(theLabelText);

//     // Add Input + Label To Main Div
//     mainDiv.append(radioInput);
//     mainDiv.append(theLabel);
//     answersArea.append(mainDiv);
//   }
// }

// function checkAnswer(rAnswer, Count) {
//   let answers = document.getElementsByName("question");
//   let theChoosenAnswer;

//   for (let i = 0; i < answers.length; i++) {
//     if (answers[i].checked) {
//       theChoosenAnswer = answers[i].dataset.answer;
//     }
//   }

//   if (rAnswer === theChoosenAnswer) {
//     // rightAnswers++;
//     console.log(rightAnswers);
//   }
// }

// Select Elements
let category = document.querySelector(".category span");
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdown = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;

async function getQuestions() {
  let fetchData = await fetch(
    "../../../json.json"
  );
  let data = await fetchData.json();
  let data2 = await data;

  let qCount = data2.length;

  // Create Bullets + Set Questions Count
  createBullets(qCount);

  // Add Queston Data
  addQuestionData(data2[currentIndex], qCount);

  // Get Right Answer
  let theRightAnswer;
  setInterval(() => {
    theRightAnswer = data2[currentIndex].right_answer;
  }, 1000);
  // Click On Submit
  submitButton.addEventListener("click", () => {
    // Increase Index
    currentIndex++;

    // Check The Answer
    checkAnswer(theRightAnswer, qCount);

    addQuestionData(data2[currentIndex], qCount);
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";
    // Add Queston Data
    addQuestionData(data2[currentIndex], qCount);

    // Handle Bullets Class
    handleBullets(qCount);

    // Show Results
    showResult(qCount);
  });

  let QuizTime = 1;
  let seconds = 40;
  QuizTime -= 1;

  let countDownVar = setInterval(() => {
    if (QuizTime === 0 && seconds === 0) {
      clearInterval(countDownVar);
      checkAnswer(theRightAnswer, qCount);
      quizArea.innerHTML = "";
      answersArea.innerHTML = "";
      quizArea.remove();
      answersArea.remove();
      submitButton.remove();
      bullets.remove();
      let theResults;
      if (rightAnswers > qCount / 2 && rightAnswers < qCount) {
        theResults = `<span class="good">Good</span>, ${rightAnswers} From ${qCount}`;
      } else if (rightAnswers === qCount) {
        theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
      } else {
        theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${qCount}`;
      }
      resultsContainer.innerHTML = theResults;
    }

    if (seconds === 0) {
      seconds = 59;
      QuizTime -= 1;
    } else {
      seconds--;
    }
    countdown.innerHTML = `${QuizTime}:${seconds}`;
  }, 1000);
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }

    // Append Bullets To Main
    bulletsSpanContainer.append(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    category.innerHTML = obj.category;
    // Create H2 Question Title
    let qusetionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj.title);

    // Apend Text To H2
    qusetionTitle.append(questionText);

    // Append The H2 The Quiz Area
    quizArea.append(qusetionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Clas To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.append(radioInput);
      mainDiv.append(theLabel);
      answersArea.append(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, Count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpan);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResult(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }
    resultsContainer.innerHTML = theResults;
  }
}
