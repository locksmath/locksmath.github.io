var screen = document.getElementById("screen");
var notes = document.getElementById("notes");
var presentation;
fetch(presFileName)
    .then(x => x.json())
    .then(data => load(data));
function load(slides) { presentation = slides }
var i = 0; // title screen is slide zero
screen.innerHTML = `<img src="${currentSlide}">`;
notes.innerHTML = `When you're ready, click "Next Slide".`;
        
function showSlide(offset) {
    if (i+offset>0 && i+offset<=finalSlide) {
        i += offset;
        screen.style.backgroundImage = `url(${currentSlide})`;
        // moves current slide to backgroung
        // if (i<10) { slide = `pinlock/pinlock0${i}.png`}
        // else { slide = `pinlock/pinlock${i}.png` }
        // console.log(slide);
        currentSlide = presentation[i].image;
        screen.innerHTML = `<img src="${currentSlide}">`;
        notes.innerHTML = presentation[i].notes;
    }
}