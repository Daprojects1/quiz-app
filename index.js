let startBtn = document.querySelector(".start-btn");
let wrapper = document.querySelector(".wrapper");
let contentDiv = document.querySelector(".main-content");

let index = 0;
let mainArr = [];
let appendeeItems;
let correctNumber = 0;
const grabQuestions = (url) => {
    fetch(url)
    .then(result => result.json())
        .then(data => mainArr.push(data))
        .catch((e) => {
        console.log(e)
    })
}

let interval; 
const checkIfArrIsEmpty = () => {
    if (mainArr.length === 0) {
        wrapper.innerText = "Loading ..."
    } else {
        wrapper.innerHTML = "";
        createBoard();
        clearInterval(interval)
    }
}

const checkIndex = (arrayLength) => {
    // index is the value that changes each time an answer is clicked
    return (index >= arrayLength) ? wrapper.innerHTML = `<h1>You have completed the Quiz with ${correctNumber} points!</h1>` : false;    
}
const valueCreator = (name) => {
    return document.createElement(name)
}

const appender = ( appendee,...items) => {
    items.map(item=> appendee.appendChild(item))
}

const createBoard = () => {
    let containerDiv = valueCreator("div");
    containerDiv.classList.add("containerDiv")
    let h2 = valueCreator("h2");
    h2.classList.add("mainH2");
    let containerUl = valueCreator("ul");
    containerUl.classList.add("SCD")
    let questionsH2 = h2
    appendeeItems = [questionsH2, containerUl]
    setQuestions()
    appender(containerDiv, h2, containerUl)
    appender(wrapper, containerDiv);
}

// setInterval(() => {
//     return num+= 1
// }, 5000)

let setQuestions = () => {
    let { results } = mainArr[0];
    const resultsLength = results.length; 
    let { question, correct_answer, incorrect_answers } = results[index];
    let [questionsH2, containerUl] = appendeeItems;
    questionsH2.innerHTML = question;
    let questionsArr = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5)
    loopthroughQuestions(questionsArr, correct_answer, resultsLength)
    index+=1
}

const loopthroughQuestions = (questions, correctAnswer, resultsLength) => {
    let [questionsH2, containerUl] = appendeeItems
    containerUl.innerHTML = "";
    let listItems = questions.map(question => valueCreator("li"));
    appender(containerUl, ...listItems)
    for (let list of listItems) {
        list.innerText = "";
        list.classList.add("main-li")
        for (let question of questions) {
            list.innerHTML = question;
            questions.splice(questions.indexOf(question), 1)
            break;
        }
    }
    clickFunctionforAnswers(listItems, correctAnswer, resultsLength);
}

const clickFunctionforAnswers = (listItems, correctAnswer, resultsLength) => {
    console.log(correctAnswer)
    const checkWin = (e, item) =>{
    if (item.innerHTML === correctAnswer){
        correctNumber += 1;
        item.classList.add("green")
    } else return item.classList.add("red");
    
}
const reset=(item) =>{
    item.classList.remove("green")
    item.classList.remove("red");
}
const updateQs =(item) =>{
    reset(item)
    setQuestions()              
}
    
const runCheck = (e, item) => {
    e.stopPropagation()
    e.stopImmediatePropagation();
    listItems.map(item => item.classList.remove("main-li"))
    checkWin(e, item)
    if (!checkIndex(resultsLength)) setTimeout(() => updateQs(item), 500)

} 
listItems.map(item => {
    item.addEventListener("click", (e) => { runCheck(e, item) })
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