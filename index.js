let startBtn = document.querySelector(".start-btn");
let wrapper = document.querySelector(".wrapper");
let contentDiv = document.querySelector(".main-content");


let num = 0;
let mainArr = [];
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


let incrementer = () => {
    return num += 1;
}

let setQuestions = (arr, reset, item) => {
    if (reset && item ) reset(item)  
    let index = num;
    let { results } = mainArr[0];
    let [h2, li1, li2, li3, li4] = arr;
    let answersDiv = [li1, li2, li3, li4]
    let { question, correct_answer, incorrect_answers } = results[index];
    h2.innerHTML = question;
    let questionsArr = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5)
    loopthroughQuestions(answersDiv, questionsArr);
    clickFunctionforAnswers(answersDiv, correct_answer, arr)
}

const loopthroughQuestions = (divs, questions) => {
    for (let div of divs) {
        div.classList.add("main-li")
        for (let question of questions) {
            div.innerHTML = question;
            questions.splice(questions.indexOf(question), 1)
            break;
        }
    }

}

const clickFunctionforAnswers = (arr, correctAnswer, questionsArr) => {
    function checkWin(item) {
            if (item.innerText === correctAnswer) return item.classList.add("green");
            else return item.classList.add("red");
        
    }
    function reset(item) {
        item.classList.remove("green")
        item.classList.remove("red")
    }
    arr.map(item => {
        item.addEventListener("click", () => { 
            arr.forEach(item => item.classList.remove("main-li"))
            checkWin(item)
            incrementer();
            setTimeout(()=>setQuestions(questionsArr, reset, item), 2000)

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




