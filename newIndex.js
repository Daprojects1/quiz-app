(() => {
  const startBtn = document.querySelector(".start-btn");
  const wrapper = document.querySelector(".wrapper");
  const contentDiv = document.querySelector(".main-content");

  function* generator(totalLength) {
    for (let i = 0; i < totalLength; i++) {
      yield i;
    }
  }
  const elemCreator = (name) => {
    return document.createElement(name);
  };
  const appender = (appendee, ...items) => {
    items.map((item) => appendee.appendChild(item));
  };

  const runQuiz = (url, options) => {
    let score = 0;
    const grabQuestions = (fn) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.results?.length)
            throw new Error(
              "Sorry, something went wrong with the server, please refresh"
            );

          const newGenerator = generator(data?.results?.length);
          fn(data, newGenerator);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    };

    const createQuiz = (data, generator) => {
      const { done, value } = generator.next();
      if (done) {
        const sum = data?.results?.length * 5;
        alert(`Well done, you have score ${score} points out of ${sum}`);
        return;
      }

      const displayQuestion = (singleData) => {
        console.log(singleData);
        wrapper.innerHTML = "";
        const { correct_answer, incorrect_answers, question } = singleData;
        const answersArr = [correct_answer, ...incorrect_answers].sort(
          () => Math.random() - 0.5
        );

        const containerDiv = elemCreator("div");
        const containerUl = elemCreator("ul");
        const h2 = elemCreator("h2");
        const spanInfo = elemCreator("span");

        containerDiv.classList.add("containerDiv");
        h2.classList.add("mainH2");
        containerUl.classList.add("SCD");
        spanInfo.classList.add("span-info");

        appender(containerDiv, h2, spanInfo, containerUl);
        appender(wrapper, containerDiv);

        h2.innerHTML = question;
        spanInfo.innerText = `${value + 1}/${data?.results?.length}`;

        const listItems = answersArr.map((ans) => {
          const li = elemCreator("li");
          li.classList.add("main-li");
          li.innerText = ans;
          appender(containerUl, li);

          return li;
        });

        (() => {
          function handleClick() {
            // pattern error handling
            if (this.innerText !== correct_answer) {
              this.classList.add("red");
              const item = listItems.find(
                (i) => i.innerText === correct_answer
              );
              item.classList.add("correct-border");
            } else {
              this.classList.add("green");
              score += 5;
            }

            listItems.forEach((i) => {
              i.removeEventListener("click", handleClick);
              i.classList.remove("main-li");
            });

            // add a button so that it can be used as a next btn
            const completed = value === data?.results?.length - 1;
            const btn = elemCreator("btn");
            btn.innerText = completed ? "reset" : "next";
            btn.classList.add("reset-btn");
            appender(containerDiv, btn);
            btn.addEventListener("click", () => {
              if (completed) {
                runQuiz(`https://opentdb.com/api.php?amount=10`, {
                  start: true,
                });
              }
              createQuiz(data, generator);
            });

            //   setTimeout(() => {
            //     createQuiz(data, generator);
            //   }, 500);
          }

          listItems.forEach((li) => {
            li.addEventListener("click", handleClick);
          });
        })();
      };

      displayQuestion(data.results[value]);
    };

    startBtn.addEventListener("click", () => grabQuestions(createQuiz), {
      once: true,
    });

    if (options?.start) grabQuestions(createQuiz);
  };

  runQuiz(`https://opentdb.com/api.php?amount=10`);
})();
