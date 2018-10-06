let lastActiveNavItem;

let navItemElemArr = [];

let sectionWrapperElem,
    sectionItemHeight;

function activeNavItem(i) {
    navItemElemArr[lastActiveNavItem].classList.remove('active');
    lastActiveNavItem = i;
    navItemElemArr[i].classList.add('active');
}

// JS animation
function easeInOutCubic(t) { 
    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
}

function animationMove(option) {
    let startTime = performance.now();

    requestAnimationFrame(function animationMove(time) {
        t = (time - startTime) / option.durationAnimation;
        if (t > 1 || t == Infinity || t == -Infinity) t = 1;
        option.drawFunc(easeInOutCubic(t));
        if (t < 1) {
            requestAnimationFrame(animationMove)
        } else {
            document.addEventListener('scroll', scrollHandler);
        };
    });   
}

function animationMoveSection (numberSection) {
    let sectionWrapperElemBeginPos = Math.abs(sectionWrapperElem.getBoundingClientRect().top),
        sectionWrapperElemEndPos = numberSection * sectionItemHeight,
        durationAnimation = Math.abs(sectionWrapperElemEndPos - sectionWrapperElemBeginPos) / sectionItemHeight * 200;

    document.removeEventListener('scroll', scrollHandler);

    animationMove({
        durationAnimation: durationAnimation,
        drawFunc: (timeAfterBiginAnimation) => {
            window.scrollTo(0, sectionWrapperElemBeginPos + (sectionWrapperElemEndPos - sectionWrapperElemBeginPos) * timeAfterBiginAnimation);
        }
    })
}

// Scroll handler
sectionWrapperElem = document.querySelector('.wrapper-section');
sectionItemHeight = document.querySelector('.section').getBoundingClientRect().height;

function scrollHandler () {
    let topSectionWrapperElem = sectionWrapperElem.getBoundingClientRect().top;
    
    nowActiveNavItem = Math.floor(Math.abs(topSectionWrapperElem / sectionItemHeight));

    if (nowActiveNavItem != lastActiveNavItem) {
        activeNavItem(nowActiveNavItem);
    }
}

document.addEventListener('scroll', scrollHandler);

// Nav item handler
navItemElemArr = document.querySelectorAll('.nav__item');

lastActiveNavItem = 0;
navItemElemArr[0].classList.add('active');

for (let i = 0; i < navItemElemArr.length; i++) {
    navItemElemArr[i].addEventListener('click', () => {
        animationMoveSection(i);
        activeNavItem(i)
    });
}

