const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextbutton = document.querySelector('.carousel__button-right');
const prevbutton = document.querySelector('.carousel__button-left');
const dotsnav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsnav.children);



const slidewidth = slides[0].getBoundingClientRect().width;


// arrange the slides next to one another
const setslideposition = (slides, index) => {
    slides.style.left = slidewidth * index + 'px';
};
slides.forEach(setslideposition);

const movetoslide = (track, currentslide, targetslide) => {
    track.style.transform = 'translateX(-' + targetslide.style.left + ')';
    currentslide.classList.remove('current-slide');
    targetslide.classList.add('current-slide');
}


const updatedots = (currentdot, targetdot) => {
    currentdot.classList.remove('current-slide');
    targetdot.classList.add('current-slide');
}


const hideshowarrows = (slides, prevbutton, nextbutton, targetindex) => {
    if (targetindex === 0) {
        prevbutton.classList.add('is-hidden');
        nextbutton.classList.remove('is-hidden');
    } else if (targetindex === slides.length - 1) {
        prevbutton.classList.remove('is-hidden');
        nextbutton.classList.add('is-hidden');
    } else {
        prevbutton.classList.remove('is-hidden');
        nextbutton.classList.remove('is-hidden');
    }
}


// when I click left, move slides to the left
prevbutton.addEventListener('click', e => {
    const currentslide = track.querySelector('.current-slide');
    const prevslide = currentslide.previousElementSibling;
    const currentdot = dotsnav.querySelector('.current-slide');
    const prevdot = currentdot.previousElementSibling;
    const previndex = slides.findIndex(slide => slide === prevslide);

    movetoslide(track, currentslide, prevslide);
    updatedots(currentdot, prevdot);
    hideshowarrows(slides, prevbutton, nextbutton, previndex);
});


// when I click right, move slides to the right

nextbutton.addEventListener('click', e => {
    const currentslide = track.querySelector('.current-slide');
    const nextslide = currentslide.nextElementSibling;
    const currentdot = dotsnav.querySelector('.current-slide');
    const nextdot = currentdot.nextElementSibling;
    const nextindex = slides.findIndex(slide => slide === nextslide);

    movetoslide(track, currentslide, nextslide);
    updatedots(currentdot, nextdot);
    hideshowarrows(slides, prevbutton, nextbutton, nextindex);

});

// when I click the nav indicators, move to that slide

dotsnav.addEventListener('click', e => {
    const targetdot = e.target.closest('li');

    if (!targetdot) return;

    const currentslide = track.querySelector('.current-slide');
    const currentdot = dotsnav.querySelector('.current-slide');
    const targetindex = dots.findIndex(dot => dot === targetdot);
    const targetslide = slides[targetindex];

    movetoslide(track, currentslide, targetslide);
    updatedots(currentdot, targetdot);
    hideshowarrows(slides, prevbutton, nextbutton, targetindex);

});
