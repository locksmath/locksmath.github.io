var TOC = [ {} , {
    "fileName" : "welcome.html", "active" : true, "title" : "Introduction",
        "description" : "What to expect<br>from this class" } , {
    "fileName" : "class0.html", "active" : false, "title" : "Prerequisites",
        "description" : "locks, keys, and<br>basic vocabulary" } , {
    "fileName" : "class1.html", "active" : true, "title" : "Lesson 1",
        "description" : "Master Keying<br>Fundamentals" } , {
    "fileName" : "class2.html", "active" : true, "title" : "Lesson 2",
        "description" : "Key Schematics and<br>Keying Schedules" } , {
    "fileName" : "class3.html", "active" : true, "title" : "Lesson 3",
        "description" : "Progressing<br>from the KBA" } , {
    "fileName" : "class4.html", "active" : true, "title" : "Lesson 4",
        "description" : "Progressing<br>Multiple Pages" } , {
    "fileName" : "class5.html", "active" : true, "title" : "Lesson 5",
        "description" : "Cross Keying<br>without key interchange" } , {
    "fileName" : "class6.html", "active" : true, "title" : "Lesson 6",
        "description" : "Selective<br>Master keying" } , {
    "fileName" : "class7.html", "active" : true, "title" : "Lesson 7",
        "description" : "The Rotating<br>Constant Method" } , {
    "fileName" : "class8.html", "active" : true, "title" : "Lesson 8",
        "description" : "Rotating Constant<br>Three Levels" } , {
    "fileName" : "class9.html", "active" : true, "title" : "Lesson 9",
        "description" : "Designing<br>Master Key Systems" } , {
    "fileName" : "class10.html", "active" : true, "title" : "Lesson 10",
        "description" : "Master Keying with<br>SFIC and LFIC" } , {
    "fileName" : "class11.html", "active" : true, "title" : "Lesson 11",
        "description" : "Master Key System<br>Maintenance" } , {
    "fileName" : "class12.html", "active" : true, "title" : "Lesson 12",
        "description" : "Hacking and Decoding<br>MK Systems" } , {
    "fileName" : "class13.html", "active" : true, "title" : "Lesson 13",
        "description" : "Working with Large<br>Master Key Systems" } , {
    "fileName" : "class14.html", "active" : true, "title" : "Lesson 14",
        "description" : "Keeping Systems<br>Separate" } , {
    "fileName" : "class15.html", "active" : true, "title" : "Lesson 15",
        "description" : "Expanding an<br>Exhausted Master Key" } , {
    "fileName" : "class16.html", "active" : true, "title" : "Lesson 16",
        "description" : "Common Mistakes<br>in Master Keying" } , {
    "fileName" : "review.html", "active" : true, "title" : "Review",
        "description" : "Preparing for<br>The Final Exam" } , {
    "fileName" : "cert.html", "active" : true, "title" : "Final",
        "description" : "Requirements for<br>Designation" } ];
var main = document.getElementById("lessons");

for (i=1;i<=20;i++) {
    if (!(localStorage.getItem(`prog${i}`))) {
        if (TOC[i].active) {status = 1}
            else {status = 0};
        localStorage.setItem(`prog${i}`,status)
    } else {status = localStorage.getItem(`prog${i}`)};
    if (TOC[i].active && (status<1)) {status = 1};
    if (status > 0) {link = TOC[i].fileName} else {link = ""};
    main.innerHTML += `<a href="${link}" class="click"><div id="block${i}" class="block"></div></a>`;
    gridSquare = document.getElementById(`block${i}`);
    gridSquare.innerHTML = `<h2>${TOC[i].title}</h2>${TOC[i].description}`;
    if (status == 0) { // not available
        gridSquare.style.backgroundColor = "#DFDFAF";
        gridSquare.style.color = "gray";
    }
    if (status == 1) { // available
        gridSquare.style.backgroundColor = "lightblue";
        gridSquare.style.color = "blue";
    }
    if (status >= 2) { // passed
        gridSquare.style.backgroundColor = "lightgreen";
        if (status == 3) { // 100% gold star
            gridSquare.style.backgroundImage = "url(goldstar.png)";
            gridSquare.style.backgroundSize = "34px 34px";
            gridSquare.style.backgroundPosition = "95% 5%";
            gridSquare.style.backgroundRepeat = "no-repeat";            
        }        
    }
}
