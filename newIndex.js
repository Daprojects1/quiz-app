(() => {
  const startBtn = document.querySelector(".start-btn");
  const wrapper = document.querySelector(".wrapper");

  function* generator(totalLength) {
    for (let i = 0; i < totalLength; i++) {
      yield i;
    }
  }
  const elemCreator = (name) => {
    return document.createElement(name);
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

        containerDiv.append(h2, spanInfo, containerUl);
        wrapper.append(containerDiv);

        h2.innerText = question;
        spanInfo.innerText = `${value + 1}/${data?.results?.length}`;

        const listItems = answersArr.map((ans) => {
          const li = elemCreator("li");
          li.classList.add("main-li");
          li.innerText = ans;
          containerUl.append(li);

          return li;
        });

        (() => {
          function handleClick() {
            if (this.innerText !== correct_answer) {
              // Wrong answer handling
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

            // Creates a button to generate next quizQuestion or reset
            const completed = value === data?.results?.length - 1;
            const btn = elemCreator("button");

            btn.innerText = completed ? "Get Score" : "Next";
            btn.classList.add("reset-btn");
            containerDiv.append(btn);

            btn.addEventListener("click", () => {
              if (completed) {
                runQuiz(`https://opentdb.com/api.php?amount=10`, {
                  start: true,
                });
              }
              createQuiz(data, generator);
            });
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

    // for resets after initial event listener click.
    if (options?.start) grabQuestions(createQuiz);
  };

  runQuiz(`https://opentdb.com/api.php?amount=10`);
})();
