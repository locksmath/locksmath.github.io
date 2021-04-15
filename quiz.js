// QuizItems is an array. Question zero is empty. Start with question 1.
// If there's a "none of the above" or "all of the above" answer, it should be option[0].
// Otherwise, option[0] should be a blank string, which is ignored.
var scoreBoard = document.getElementById('upper')
var main = document.getElementById('lower');
var i, points, possible, correct, quizItems, finalQuestion, tally;

fetch(quizFileName)
    .then(x => x.json())
    .then(data => load(data));
function load(questions) { quizItems = questions }

if (localStorage.getItem('userName').substring(0,5) == "Guest") {
    main.innerHTML += `<br><br><code style="color: red">WARNING</code> Your display name is ${displayName}.
    If you take the quiz with this name, you will not be able to submit your score. Please click the [settings]
    button in the upper right corner to change your display name.`
}
firstTime = true;
if (localStorage.getItem(`score${classNumber}`)) {
    lastScore = localStorage.getItem(`score${classNumber}`);
    if (lastScore.length > 0) {
        main.innerHTML += `<br><br>You have already taken this quiz.<br>`;
        main.innerHTML += lastScore;
        if (localStorage.getItem(`prog${classNumber+2}`) == 3) {main.innerHTML += ` <img src="goldstar.png"; height= 12px> `};
        if (localStorage.getItem(`sent${classNumber}`)) {main.innerHTML += ` <img src="envelope.png"; height= 12px> submitted`};
        main.innerHTML += `<br><br>If you want to take it again`;
        firstTime = false
    }
};
if (firstTime) {main.innerHTML += `When you are ready`};
main.innerHTML += `, click "Start quiz."<br><br><button onclick="startQuiz()">Start quiz</button><br><br><button onclick="showPart2()">Show Homework part 2</button>`

function startQuiz() {

    points = 0;
    possible = 0;
    correct = 0;
    tally = `Quiz${classNumber} results: `;
    scoreBoard.innerHTML = `<h3>Your score so far: ${points} out of ${possible}</h3>`;
    finalQuestion = quizItems.length - 1 // Question zero is null.

    i = 1; // Ready for first question.
    askQuestion();
}

function askQuestion() {
    if (i > finalQuestion) { endOfQuiz() 
    } else {
        main.innerHTML = `<h3>Question #${i}</h3>`;
        main.innerHTML += quizItems[i].question + "<br>";
        // random order, except option[0] always goes last (if it exists).
        qty = quizItems[i].option.length - 1;
        show = [0]; for (a = 1; a <= qty; a++) { show[a] = a };
        for (a = qty; a > 1; a--) {
            b = Math.floor(Math.random() * (a) + 1);
            temp = show[a]; show[a] = show[b]; show[b] = temp;
        }; // List is now shuffled.
        function rightAnswer(x) { return (x == 1) };
        correct = show.findIndex(rightAnswer);
        if (quizItems[i].isOther) { correct = 0 };
        clicked = false; // ready to show the options
        for (j = 1; j <= qty; j++) {
            main.innerHTML += `<button id="b${j}" class="choice" onclick=
                    "toggle(${j})">${quizItems[i].option[show[j]]}</button><br>`;
        }
        if (quizItems[i].option[0] != "") {
            main.innerHTML += `<button id="b0" class="choice" onclick=
                    "toggle(0)">${quizItems[i].option[0]}</button><br>`;
        }
        main.innerHTML += `<br><br>`;
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
        main.innerHTML += `<button onclick="nextQuestion()">Next</button><br><br>`;
        clicked = true; // Ignore subsequent clicks on this same question.
    }
}

function nextQuestion() { i++; askQuestion() }

function endOfQuiz() {
    scoreBoard.innerHTML = `<h3>Your final score: ${points} out of ${possible}</h3>`;
    finalScore = Math.round(100 * points / possible);
    tally += `  ${points}/${possible} = ${finalScore}%`;
    main.innerHTML = `<h3>Finished!</h3><br>${tally}<br>`;
    localStorage.setItem(`score${classNumber}`,tally);
    console.log(`score${classNumber} `+tally);
    if (finalScore >= 70) { // pass
        main.innerHTML += `Congratulations, you passed.`;
        localStorage.setItem(`prog${classNumber+2}`, 2 );
        if (finalScore == 100) { // perfect
            main.innerHTML += ` And, you get a gold star!<img src="goldstar.png"; height= 42px>`;
            localStorage.setItem(`prog${classNumber+2}`, 3 )
        };
        localStorage.removeItem(`sent${classNumber}`);
        if (localStorage.getItem('userName').substring(0,5) == "Guest") {
            main.innerHTML += `<br>You cannot submit your score as a guest. If you want to change your diplay name, click
            [settings] in the upper right corner.`
        } else {
        main.innerHTML += `<br>Click here to submit your score:
        <form action="https://liveformhq.com/form/0c3f090f-bd7a-4efc-8a98-99cf77ea3f14" method="POST" accept-charset="utf-8">
        <input type="hidden" name="_utf8" value="✓">
        <input type="hidden" value="https://locksmath.github.io/class${classNumber}.html" name="_redirect" />
        <input type="hidden" id="name" name="name" value="${localStorage.getItem("userName")}" />
        <input type="hidden" id="message" name="message" value="${tally}" />
        <button type="submit" onclick="submitted()">Submit</button></form>`};
    } else { // <70 fail
        main.innerHTML += `Passing score is 70%. Please try again.`
    }
    main.innerHTML += `<br><br><button onclick="startQuiz()">Take the quiz again</button>`;
    if (returnTo) {main.innerHTML += `<br><br><button onclick="location.href='${returnTo}'">Return to Lesson ${returnTo}</button>`}
    else {main.innerHTML += `<br><br><button onclick="location.href='class${classNumber}.html'">Return to Lesson ${classNumber}</button>`};    
    main.innerHTML += `<br><br><button onclick="location.href='aloa_main.html'">Return to main page</button>`;    

}

function submitted() {localStorage.setItem(`sent${classNumber}`,"yes")}