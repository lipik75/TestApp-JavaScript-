//массив вопросов - ответов
const questions = [
    {
        title: 'Что из перечисленного не является языком программирования?',
        answers: ['HTML', 'Java', 'Python', 'DevOps'],
        rightAnswersIndexes: [1, 4]
    },
    {
        title:'Какие из перечисленных видов тестирования могут быть автоматизированы?',
        answers: ['UI-тестрирование', 'Юзабилити тестирование', 'Тестирование совместимостей', 'Unit тестирование'],
        rightAnswersIndexes: [1, 3, 4]
    },
    {
        title: 'Выберите вариант, который соответствует следующему предложению: "Известно, что Грымзик обязательно или полосат, или рогат, или то и другое вместе',
        answers: ['Грымзик не может быть безрогим', 'Грымзик не может быть однотонным и безрогим одновременно', 'Грымзик не может быть полосатым и безрогим одновременно', 'Грымзик не может быть однотонным и рогатым одновременно'],
        rightAnswersIndexes: [2]
    },
    {
        title: 'Выберите тип алгоритмов, которые не существуют',
        answers: ['Алгоритм с ветвлением', 'Циклический безусловный', 'Циклический с параметром', 'Алгоритм с углублением'],
        rightAnswersIndexes: [2, 4]
    },
  {
        title: 'Какая (какие) из следующих конструкций используется (используются) для ветвления?',
        answers: ['swich case', 'if else', 'do while', 'for'],
        rightAnswersIndexes: [2]
    },
];

// ответы на тесты
let testAnswers = {};

// неверные ответы
let invalidAnswers = [];

// добавляем свой вопрос
function addQuestion() {
    const question = { title: "", answers: [], rightAnswersIndexes: [] };
    const questionTitle = prompt("Введите текст вопроса:");

    if (questionTitle !== "" && questionTitle !== null) {
        question.title = questionTitle;

        for (let i = 1; i <= 4; i++) {
            const answerInput = prompt(`Введите ${i} ый вариант ответа:`);

            if (answerInput !== "" && answerInput !== null) {
                question.answers.push(answerInput);
            } else {
                return alert("Вы не ввели текст " + i + " варианта ответа. Попробуйте добавить вопрос заново.");
            }
        }

        if (question.answers.length === 4) {
            const rightAnswersInput = prompt(
                "Введите номера правильных ответов через запятую. Нумерация начинается с 1"
            );
      if  (rightAnswersInput !== null && rightAnswersInput !== ""){
        const rightAnswersIndexes = rightAnswersInput.split(",");
        if (rightAnswersIndexes !== null &&  rightAnswersIndexes !== "") {

                  let previousAnswerIndex = 0;

                  for (let i = 0; i < rightAnswersIndexes.length; i++) {
                      const rightAnswerIndex = +parseInt(rightAnswersIndexes[i]);

                      const isValid =
                          !isNaN(rightAnswerIndex) &&
                          rightAnswerIndex > 0 &&
                          rightAnswerIndex <= 4 &&
                          rightAnswerIndex !== previousAnswerIndex;

                      if (isValid && rightAnswersIndexes.length > 0 && rightAnswersIndexes.length <= 4) {
                          question.rightAnswersIndexes.push(rightAnswerIndex);
                      } else {
                          return alert("Поле может содержать только уникальные цифры 1, 2, 3, 4 разделенные запятой. Попробуйте добавить вопрос заново.");
                       }
                  }
                  questions.push(question);
        }
              } else {
                  return alert("Вы не ввели правильные варианты ответа. Попробуйте добавить вопрос заново.");
              }
          }
      } else {
          return alert("Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.");
    }
}


function startTest() {
    disableButtons(true);
    const container = document.getElementById('tests-section');

    questions.forEach(function (question, questionIndex) {
        const br = document.createElement("br");
        const label = createLabel(questionIndex + 1 + ". " + question.title);
        container.append(label, br);

        question.answers.forEach(function (answer, answerIndex) {
            const checkbox = createCheckbox(questionIndex, answerIndex + 1);
            const answerLabel = createLabel(" " + answer);
            const brr = document.createElement("br");
            container.append(checkbox, answerLabel, brr);
        });
    });

    const submitButton = createSubmitButton();
    container.appendChild(submitButton);
}

function createLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;

    return label;
}

function disableButtons(isDisabled) {
    const actionButtons = document.getElementsByClassName('action-button');

    for(let i = 0; i < actionButtons.length; i++) {
        actionButtons[i].disabled = isDisabled
    }
}

function createCheckbox(questionIndex, answerIndex) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onclick = (event) => {
        const checked = event.target.checked;

        if (checked) {
            const answersMap = testAnswers[questionIndex] || {};

            testAnswers[questionIndex] = { ...answersMap, [answerIndex]: answerIndex }
        } else {
            delete testAnswers[questionIndex][answerIndex];

            const answerIndexes = Object.values(testAnswers[questionIndex]);

            if (!answerIndexes.length) {
                delete testAnswers[questionIndex];
            }
        }
    };

    return checkbox;
}

function createSubmitButton() {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'отправить'
    submitButton.onclick = checkAnswer;

    return submitButton;
}

function checkAnswer() {
    const isAnyQuestionNotAnswered = Object.values(testAnswers).length !== questions.length

    if (isAnyQuestionNotAnswered) {
        return alert('Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения');
    }

    for(let i = 0; i < questions.length; i++) {
        const rightAnswersIndexes = questions[i].rightAnswersIndexes;
        const isIncorrect = rightAnswersIndexes.length !== Object.keys(testAnswers[i] || {}).length
            || rightAnswersIndexes.some(rightAnswerIndex => !(testAnswers[i] && testAnswers[i][rightAnswerIndex]))

        if (isIncorrect) {
            invalidAnswers.push(i);
        }
    }

    if (invalidAnswers.length) {
        const questionsNumber = questions.length;
        const invalidAnswersLength = invalidAnswers.length;

        const errorQuestions = invalidAnswers.map(invalidAnswerIndex => {
            return `${invalidAnswerIndex + 1}) ${questions[invalidAnswerIndex].title}`
        });

        const errorQuestionsTitle = errorQuestions.join('\n');

        return alert(`
            Вы неправильно ответили на вопросы:\n ${errorQuestionsTitle}
            Ваш результат ${questionsNumber - invalidAnswersLength} / ${questionsNumber}
        `);
    } else {
        const questionsNumber = questions.length;
        alert(`Ваш результат ${questionsNumber} / ${questionsNumber}. Вы молодец!`)
    }

    testAnswers = {};
    invalidAnswers = [];
    disableButtons(false);
    const container = document.getElementById('tests-section');
    container.innerHTML = "";
}
