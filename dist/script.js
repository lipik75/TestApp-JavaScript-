//массив кастомных вопросов
const questions = ['Что из перечисленного не является языком программирования?', 
                   'Какие из перечисленных видов тестирования могут быть автоматизированы?', 
                   'Выберите вариант, который соответствует следующему предложению: "Известно, что Грымзик обязательно или полосат, или рогат, или то и другое вместе"', 
                   'Выберите тип алгоритмов, которые не существуют',
                   'Какая (какие) из следующих конструкций используется (используются) для ветвления?']

//массив вариантов ответов
const answers = ['HTML, Java, Python, DevOps',
                 'UI-тестрирование, Юзабилити тестирование, Тестирование совместимостей, Unit тестирование',
                 'Грымзик не может быть безрогим, Грымзик не может быть однотонным и безрогим одновременно, Грымзик не может быть полосатым и безрогим одновременно, Грымзик не может быть однотонным и рогатым одновременно',
                 'Алгоритм с ветвлением, Циклический безусловный, Циклический с параметром, Алгоритм с углублением',
                'swich case, if else, do while, for']

//массив правильных ответов
var rightAnswers = ["1, 4", "1, 3, 4", "2", "2, 4", "2"]

//добавляем свой вопрос
function addQuestion() {
  var question;
  var answersVariants;
  var rightAnswer;
  question = prompt("Введите текст вопроса:")
  if (question !== ""){
    answersVariants = prompt("Введите 4 варианта ответов через запятую")
    rightAnswer = prompt("Введите номера правильных ответов от 1 до 4 через запятую")
    if (answersVariants !== "" && answersVariants.split(",").length === 4) {
      questions.push(question)
      answers.push(answersVariants)
      if (rightAnswer !== ""){
        rightAnswers.push(rightAnswer) 
      }
      else {
        alert("Вы не ввели правильные варианты")
      }
      
    }
    else {
      alert("Вы не ввели текст вариантов ответов. Попробуйте добавить вопрос заново")
    }
  }
  else {
    alert("Вы не ввели текст вопроса. Попробуйте добавить вопрос заново")
  }
}


function startTest() {
  questions.forEach(function(item, i, arr) {
    var br = document.createElement("br")
    var label = createLabel((i + 1) + ". " + item)
    document.body.append(label, br)
    const arrAnswer =  answers[i].split(",")
    
    arrAnswer.forEach(function(it, j, ar) {
      var checkbox = createCheckbox()
      var answerLabel = createLabel(" " + it)
      var brr = document.createElement("br")
      document.body.append(checkbox, answerLabel, brr)
      
    });   
  });
  var inputs = document.getElementsByTagName('input')
  console.log(inputs)
}

function createLabel (text) {
  var label = document.createElement("label")
  label.textContent = text
  return label
}

function createCheckbox () {
  var checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  return checkbox
}

//метод для проверки ответов, в котором я так и не понял как проверить каждый чекбокс
function checkAnswer() {
  //правильные ответы берем из массива ответов
  var answer;
  for (var i = 0; i < rightAnswers.length; i++) {
    answer = rightAnswers[i].split();
    // считаем что ответы правильные
    var error = false;
    // чекбоксы
    var inputs = document.getElementsByTagName('input'); //не могу понять как привзяать чекбоксы к вариантам ответов
    for (var j = 0; j < inputs.length; j++) {
        // галка
        var checked = inputs[j].checked; //по идее тут булевское значение, не пойму как сравнить значиния из массива правильных ответов с проверяемым чекбоксом
        
      // является ли вариант правильным
        var right = answer[j+1] == true;
        // если отметка не является правильной
        if (checked !== right) {
            error = true;
            // дальше можно не проверять
            break;
        }
    }
  }
 //я так полагаю, что здесь нужно добавит кнопку "Отправить"
  
  //вывод не по условия, просто для примера
    var output = document.getElementById('output');
    output.value = error ? 'Ошибка' : 'Верно';
    // предотвращаем отправку формы
    return false;
}