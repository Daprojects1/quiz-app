let startBtn = document.querySelector(".start-btn");
let wrapper = document.querySelector(".wrapper");
let contentDiv = document.querySelector(".main-content");


let mainArr = [];
let grabQuestions = (url) => {
    fetch(url)
    .then(result => result.json())
    .then(data => mainArr.push(data))
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
    let questionDiv = valueCreator("div");
    let answerDiv1 = valueCreator("div");
    let answerDiv2 = valueCreator("div");
    let answerDiv3 = valueCreator("div");
    let questionsArr = [h2, questionDiv, answerDiv1, answerDiv2, answerDiv3]
    setQuestions(questionsArr)
    appender(containerDiv, h2, questionDiv, answerDiv1, answerDiv2, answerDiv3)
    appender(wrapper, containerDiv);
}

let setQuestions = (arr) => {
    let { results } = mainArr[0];
    let [h2Div] = arr;
    console.log(results)
}

startBtn.addEventListener("click",(e)=> {
    e.preventDefault();
   interval = setInterval(checkIfArrIsEmpty, 500)
})

setTimeout(() => {
    grabQuestions("https://opentdb.com/api.php?amount=5")
}, 2000)




