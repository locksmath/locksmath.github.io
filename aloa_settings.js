var main = document.getElementById("upper");
main.innerHTML += `${displayName}.<br><br>`
for (i=0;i<=16;i++) {
    if (localStorage.getItem(`score${i}`)) {
        main.innerHTML += localStorage.getItem(`score${i}`);
        if (localStorage.getItem(`prog${i+2}`) == 3) {main.innerHTML += ` <img src="goldstar.png"; height= 12px> `}
        if (localStorage.getItem(`sent${i}`)) {main.innerHTML += ` <img src="envelope.png"; height= 12px> submitted`}
        main.innerHTML += `<br>`
    }
}
main.innerHTML += `<p>The above information is stored in your local browser, <em>not on our server</em>.
When you take a quiz and click "submit", your display name, and your score for that quiz, is sent to your instructor via
<strong>liveformhq.com</strong>. After you click "submit", your display name and your score will be stored temporarily on
the liveformhq server. Keep this in mind when you decide what your display name should be.</p>
<p>For you to get credit for taking the quizzes, you should select a display name that makes it easy for us to identify
you. For example, you could use your first name plus your ALOA membership number. You can enter a name below, or you can
have the computer select a random Guest number for you. You can also erase all your scores, which means your browser will
completely forget about which quizzes you have taken and what scores you earned, but you'll keep your display name.</p>
<p>If you think some of your quiz scores were not submitted, you can click "Resubmit all scores" below.</p> 
<p>If you prefer not to use liveformhq, you may take a screenshot of your quiz scores and email it to your instructor,
using whatever email program you like.</p>
your name: <input type="text" id="userName" value=${displayName}><button onclick="changeName()">Enter</button><br>
<br><button id="random" onclick="randomName()">Random name</button><br>
<br><button id="resubmit" onclick="resubmit()">Resubmit all scores</button><br>
<br><button id="reset" onclick="reset()">Erase all scores</button><br>
<br><br><button onclick="location.href='aloa_main.html'">Return to main page</button>`;
function changeName() {
    displayName = document.getElementById("userName").value;
    localStorage.setItem(`userName`,displayName);
    location.reload()
};
function randomName() {
    var displayName = "Guest"+Math.floor(Math.random()*900000+100000);
    localStorage.setItem(`userName`,displayName);
    location.reload() 
};
function resubmit() {
    reportCard = "";
    for (i=0;i<=16;i++) {
        if (localStorage.getItem(`score${i}`)) {
            reportCard += localStorage.getItem(`score${i}`) + "\n";
            localStorage.setItem(`sent${i}`,"yes")
        }
    }


main.innerHTML += `<br><br>Are you sure?
<form action="https://liveformhq.com/form/0c3f090f-bd7a-4efc-8a98-99cf77ea3f14" method="POST" accept-charset="utf-8">
<input type="hidden" name="_utf8" value="✓">
<input type="hidden" value="https://locksmath.github.io/aloa_settings.html" name="_redirect" />
<input type="hidden" id="name" name="name" value="${localStorage.getItem("userName")}" />
<input type="hidden" id="message" name="message" value="${reportCard}" />
<button type="submit" onclick="submitted()">Yes, resubmit all scores</button></form>`;
}
function submitted() {
    for (i=0;i<=16;i++) {
        if (localStorage.getItem(`score${i}`)) {
            localStorage.setItem(`sent${i}`,"yes")}

    }
}
function reset() {
    localStorage.clear();
    localStorage.setItem(`userName`,displayName);
    location.reload() 
}
