let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion () {
 
  if (questionNumber < quesetionsAndAnswersBank.length) {
     
    return `<div class="question-${questionNumber}">
    <h2>${quesetionsAndAnswersBank[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${quesetionsAndAnswersBank[questionNumber].answers[0]}" name="answer" required>
    <span>${quesetionsAndAnswersBank[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${quesetionsAndAnswersBank[questionNumber].answers[1]}" name="answer" required>
    <span>${quesetionsAndAnswersBank[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${quesetionsAndAnswersBank[questionNumber].answers[2]}" name="answer" required>
    <span>${quesetionsAndAnswersBank[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${quesetionsAndAnswersBank[questionNumber].answers[3]}" name="answer" required>
    <span>${quesetionsAndAnswersBank[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

//increment question number
function changeQuestionNumber () {
     questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}

//increment score
function changeScore () {
  score ++;
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
     $('.quizStart').hide(1000);
     $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function quizRestart(){
  // restart button 
  restartQuiz();
}

// render question in DOM
function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${quesetionsAndAnswersBank[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${quesetionsAndAnswersBank[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="image"><img src="${quesetionsAndAnswersBank[questionNumber].image}" alt="${quesetionsAndAnswersBank[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${quesetionsAndAnswersBank[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${quesetionsAndAnswersBank[questionNumber].image}" alt="${quesetionsAndAnswersBank[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}

//when quiz is over this is the html for the page
function renderResults () {
  if (score > 7) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Wow You Really Do Know President Obama!</h3><img src="https://theredphoenix.files.wordpress.com/2012/11/barack-obama-re-elected-as-us-president-pg.jpg" alt="president obama with a bg grin"/><p>You got ${score} / 10</p><p>My Appologies I Thought You Were A Silly Troll</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You Don't Know Obama!!!</h3><img src="https://www.usnews.com/dims4/USNEWS/c2227bb/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fa2%2Fd4%2F5444ef744b9d970725f064b9c01e%2F160105-obama-guns.jpg" alt="president obama crying"/><p>You got ${score} / 10</p><p>You Need To Inform Yourself,<br />Try Again Buddy</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', (event) => {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);



