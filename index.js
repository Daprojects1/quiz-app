let startBtn = document.querySelector(".start-btn");
let wrapper = document.querySelector(".wrapper");
let contentDiv = document.querySelector(".main-content");

let index = 0;
let mainArr = [];
let correctNumber = 0;
let grabQuestions = (url) => {
    fetch(url)
    .then(result => result.json())
        .then(data => mainArr.push(data))
        .catch((e) => {
        console.log(e)
    })
}

let interval; 
let checkIfArrIsEmpty = () => {
    if (mainArr.length === 0) {
        wrapper.innerText = "Loading ..."
    } else {
        wrapper.innerHTML = "";
        createBoard();
        clearInterval(interval)
    }
}

let valueCreator = (name) => {
    return document.createElement(name)
}

let appender = ( appendee,...items) => {
    items.map(item=> appendee.appendChild(item))
}

let createBoard = () => {
    let containerDiv = valueCreator("div");
    containerDiv.classList.add("containerDiv")
    let h2 = valueCreator("h2");
    h2.classList.add("mainH2");
    let li1 = valueCreator("li");
    let li2 = valueCreator("li");
    let li3 = valueCreator("li");
    let li4 = valueCreator("li");
    let containerUl = valueCreator("ul");
    containerUl.classList.add("SCD")
    let questionsArr = [h2, li1, li2, li3, li4]
    setQuestions(questionsArr)
    appender(containerUl, li1, li2, li3, li4)
    appender(containerDiv, h2, containerUl)
    appender(wrapper, containerDiv);
}

// setInterval(() => {
//     return num+= 1
// }, 5000)

let setQuestions = (arr) => {
    let { results } = mainArr[0];
    const resultsLength = results.length; 
    let [h2, li1, li2, li3, li4] = arr;
    let answersDiv = [li1, li2, li3, li4]
    let { question, correct_answer, incorrect_answers } = results[index];
    h2.innerHTML = question;
    let questionsArr = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5)
    clickFunctionforAnswers(answersDiv, correct_answer, arr, resultsLength);
    loopthroughQuestions(answersDiv, questionsArr);
    index+=1
}

const loopthroughQuestions = (divs, questions) => {
    for (let div of divs) {
        div.innerHTML = "";
        div.classList.add("main-li")
        for (let question of questions) {
            div.innerHTML = question;
            questions.splice(questions.indexOf(question), 1)
            break;
        }
    }
}

const clickFunctionforAnswers = (arr, correctAnswer, questionsArr, resultsLength) => {
    console.log(correctAnswer)
    function checkWin(item) {
    console.log(item.innerHTML)
    if (item.innerHTML === correctAnswer){
        correctNumber+1
        item.classList.add("green")
        return;
    } else return item.classList.add("red");
    
}
function reset(item) {
    item.classList.remove("green")
    item.classList.remove("red");
}
function updateQs(item) {
    reset(item)
    setQuestions(questionsArr)              
}
arr.map(item => {
    item.addEventListener("click", (e) => { 
        e.stopImmediatePropagation();
        arr.map(item => item.classList.remove("main-li"))
        checkWin(item)
        setTimeout(() => updateQs(item), 500)
    })
})

}



startBtn.addEventListener("click",(e)=> {
    e.preventDefault();
   interval = setInterval(checkIfArrIsEmpty, 500)
})

setTimeout( () => {
   grabQuestions("https://opentdb.com/api.php?amount=5")
}, 2000)


// class Quiz {
//     constructor() {
//     this.start = 0;
//     this.startBtn= document.querySelector(".start-btn");
//     this.wrapper = document.querySelector(".wrapper");
//     this.contentDiv = document.querySelector(".main-content");
//     this.index = 0;
//     this.mainArr = [];
//     this.amountCorrect = 0;
//     }
//     setQuestions = (url) => {
//         if (this.start === 0) {
//             fetch(url)
//             .then(result => result.json())
//                 .then(data => this.mainArr.push(data))
//                 .catch((e) => {
//                 console.log(e)
//                 })
//             this.start = 1;
//         } else {
//             throw new Error("done already")
//         }

//     }
//     static grabQuestions() {
//         return new Quiz().setQuestions("https://opentdb.com/api.php?amount=5");
//     }
// }

// let newQuiz = new Quiz();
// newQuiz.setQuestions("https://opentdb.com/api.php?amount=5")


// console.log(correctAnswer)
// function checkWin(item) {
//     if (item.innerText === correctAnswer){
//         correctNumber+1
//         item.classList.add("green")
//         return;
//     } else return item.classList.add("red");
    
// }
// function reset(item) {
//     item.classList.remove("green")
//     item.classList.remove("red");
// }
// function updateQs(item) {
//     reset(item)
//     setQuestions(questionsArr)              
// }
// arr.map(item => {
//     item.addEventListener("click", () => { 
//         arr.map(item => item.classList.remove("main-li"))
//         checkWin(item)
//         setTimeout(() => updateQs(item), 500)
//     })
// })