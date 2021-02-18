localStorage.clear();
for (i=1;i<=20;i++) {
    localStorage.setItem(`prog${i}`,i)
}
console.log(localStorage.prog3)
localStorage.testItem = 3.14159
console.log(localStorage.testItem)
if (!localStorage.progress) {
    console.log('loop')
    localStorage.progress = [];
    for (i=1;i<=20;i++) {
        localStorage.progress[i] = {
            status: i,
            quizScore: 0
        }
    }
}
for (i=1;i<=20;i++) {
    gridSquare = document.getElementById(`block${i}`);
    switch(localStorage.progress[i].status) {
        case 1:
            gridSquare.style.backgroundColor = "lightblue";
            break;
        case 2:
            gridSquare.style.backgroundColor = "yellow";
            break;
        case 3:
            gridSquare.style.backgroundColor = "lightgreen";
            break;
        default:
            gridSquare.style.backgroundColor = "lightgray";

    }
}