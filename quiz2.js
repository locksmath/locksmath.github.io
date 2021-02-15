// QuizItems is an array. Question zero is empty. Start with question 1.
// If there's a "none of the above" or "all of the above" answer, it should be option[0].
// Otherwise, option[0] should be a blank string, which is ignored.
var main = document.getElementById('chapter');
var scoreBoard = document.getElementById('score')
var i, points, possible, correct, quizItems, endOfQuiz, tally;


fetch(quizFileName)
    .then(x => x.json())
    .then(data => load(data));
function load(questions) { quizItems = questions }

main.innerHTML = `<br><br><button onclick="startQuiz()">Start</button>`

function startQuiz() {

    points = 0;
    possible = 0;
    correct = 0;
    tally = "Results: ";
    scoreBoard.innerHTML = `<h3>Your score so far: ${points} out of ${possible}</h3>`;
    endOfQuiz = quizItems.length
    i = 1; // Ready for first question.
    askQuestion();
}

function askQuestion() {
    if (i == endOfQuiz) {
        scoreBoard.innerHTML = `<h3>Your final score: ${points} out of ${possible}</h3>`;
        tally += `  ${points}/${possible} = ${Math.round(100 * points / possible)}%`;
        main.innerHTML = `<h3>Finished!</h3><br>${tally}`;
        main.innerHTML += '<br><br><button onclick="startQuiz()">Try again?</button>';
        main.innerHTML += '<br><br><button onclick="submit()">Submit</button>';
    }
    else {
        main.innerHTML = `<h3>Question #${i}</h3>`;
        main.innerHTML += quizItems[i].question + "<br>";
        // random order, except option[0] always goes last (if it exists).
        qty = quizItems[i].howMany;
        show = [0]; for (a = 1; a <= qty; a++) { show[a] = a };
        for (a = qty; a > 1; a--) {
            b = Math.floor(Math.random() * (a) + 1);
            temp = show[a]; show[a] = show[b]; show[b] = temp;
        }; // List is now shuffled.
        function rightAnswer(x) { return (x == 1) };
        correct = show.findIndex(rightAnswer);
        if (quizItems[i].isOther) { correct = 0 };
        clicked = false;
        for (j = 1; j <= qty; j++) {
            main.innerHTML += `<button id="b${j}" class="choice" onclick=
                    "toggle(${j})">${quizItems[i].option[show[j]]}</button><br>`;
        }
        if (quizItems[i].option[0] != "") {
            main.innerHTML += `<button id="b0" class="choice" onclick=
                    "toggle(0)">${quizItems[i].option[0]}</button><br>`;
        }
    }
}

function toggle(n) {
    // Turn the clicked button green if it's correct, or red if it's incorrect.
    // Then show the "Next" button.
    if (!clicked) { // Only take the first click.
        var selectedButton = document.getElementById(`b${n}`);
        if (n == correct) {
            selectedButton.style.backgroundColor = "#CFFFCF"; // green = correct
            points++;
            possible++;
            tally += i + ".\u2714 ";
            scoreBoard.innerHTML = `<h3>Your score so far: ${points} out of ${possible}</h3>`;
            main.innerHTML += `<br>Correct!<br>`;
        }
        else {
            selectedButton.style.backgroundColor = "#FFBFBF"; // red = incorrect
            possible++;
            tally += i + ".\u2718 ";
            scoreBoard.innerHTML = `<h3>Your score so far: ${points} out of ${possible}</h3>`;
            main.innerHTML += `<br>Incorrect.<br>`;
        }
        main.innerHTML += `<button onclick="nextQuestion()">Next</button>`;
        clicked = true; // Ignore subsequent clicks on this same question.
    }
}

function nextQuestion() { i++; askQuestion() }
function submit() {
    fetch('quizresults.json',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tally)
    })
    // win = window.open(`mailto:locksmath@outlook.com?subject=Ch1_quiz_results&body=${tally}`);
    // chapterNumber ++;
    // window.location.href = `chapter${chapterNumber}.html`
}