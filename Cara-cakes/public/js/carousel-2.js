$(function() {
    var pprevIndex = 0;
    var prevIndex =1;
    var currentIndex = 2;
    var nextIndex = 3;
    var nnextIndex = 4;
    var nnnextIndex = 5;
    var lastIndex = $('#bds').find('.slide__frame').length - 1;

    setLeftClass();
    setRightClass(); 


    var carouselRunning = true;
    var carouselRestart;
    var interval = setInterval(function() {
        if (carouselRunning) {
            showNextFrame();
        }
    }, 4000);

    function showNextFrame() {
        if (currentIndex == lastIndex) {
            currentIndex = 0;
        } else {
            currentIndex +=1; 
        }
        updatePos(currentIndex);
    }


    function updatePos(index) {

        prevIndex = index == 0 ? lastIndex : index - 1;
        pprevIndex = prevIndex == 0 ? lastIndex : prevIndex -1;
        currentIndex = index;
        nextIndex = index == lastIndex ? 0 : index + 1;
        nnextIndex = nextIndex == lastIndex ? 0 : nextIndex + 1;
        nnnextIndex = nnextIndex == lastIndex ? 0 : nnextIndex + 1;

        
        updateCaroPos();
        setLeftClass();
        setRightClass();
    }

    function updateCaroPos() {
        $('#bds').find('.frame--1st').removeClass('frame--1st');
        $('#bds').find('.frame--2nd').removeClass('frame--2nd');
        $('#bds').find('.frame--3rd').removeClass('frame--3rd');
        $('#bds').find('.frame--4th').removeClass('frame--4th');
        $('#bds').find('.frame--5th').removeClass('frame--5th');
        $('#bds').find('.frame--6th').removeClass('frame--6th');

        $('#pan').find('.frame--1st-2nd').removeClass('frame--1st-2nd');
        $('#pan').find('.frame--2nd-2nd').removeClass('frame--2nd-2nd');
        $('#pan').find('.frame--3rd-2nd').removeClass('frame--3rd-2nd');
        $('#pan').find('.frame--4th-2nd').removeClass('frame--4th-2nd');
        $('#pan').find('.frame--5th-2nd').removeClass('frame--5th-2nd');
        $('#pan').find('.frame--6th-2nd').removeClass('frame--6th-2nd');

        $('#cookies').find('.frame--1st').removeClass('frame--1st');
        $('#cookies').find('.frame--2nd').removeClass('frame--2nd');
        $('#cookies').find('.frame--3rd').removeClass('frame--3rd');
        $('#cookies').find('.frame--4th').removeClass('frame--4th');
        $('#cookies').find('.frame--5th').removeClass('frame--5th');
        $('#cookies').find('.frame--6th').removeClass('frame--6th');

        var allBds = $('#bds').find('.slide__frame');
        $(allBds[pprevIndex]).addClass('frame--1st');
        $(allBds[prevIndex]).addClass('frame--2nd');
        $(allBds[currentIndex]).addClass('frame--3rd');
        $(allBds[nextIndex]).addClass('frame--4th');
        $(allBds[nnextIndex]).addClass('frame--5th');
        $(allBds[nnnextIndex]).addClass('frame--6th');

        var allPan = $('#pan').find('.slide__frame');
        $(allPan[pprevIndex]).addClass('frame--1st-2nd');
        $(allPan[prevIndex]).addClass('frame--2nd-2nd');
        $(allPan[currentIndex]).addClass('frame--3rd-2nd');
        $(allPan[nextIndex]).addClass('frame--4th-2nd');
        $(allPan[nnextIndex]).addClass('frame--5th-2nd');
        $(allPan[nnnextIndex]).addClass('frame--6th-2nd');

        var allCookies = $('#cookies').find('.slide__frame');
        $(allCookies[pprevIndex]).addClass('frame--1st');
        $(allCookies[prevIndex]).addClass('frame--2nd');
        $(allCookies[currentIndex]).addClass('frame--3rd');
        $(allCookies[nextIndex]).addClass('frame--4th');
        $(allCookies[nnextIndex]).addClass('frame--5th');
        $(allCookies[nnnextIndex]).addClass('frame--6th');
        
    }


    function setLeftClass() {
        var allBds = $('#bds').find('.slide__frame');
        $('.frame--previous').removeClass('frame--previous');

        var allPan = $('#pan').find('.slide__frame');
        $('.frame--previous-2nd').removeClass('frame--previous-2nd');

        var allCookies = $('#cookies').find('.slide__frame');
        $('.frame--previous').removeClass('frame--previous');
    
        if (pprevIndex > 0) {
            var index = pprevIndex - 1;
            $(allBds[index]).addClass('frame--previous');
            $(allPan[index]).addClass('frame--previous-2nd');
            $(allCookies[index]).addClass('frame--previous');
        } else {
            $(allBds[lastIndex]).addClass('frame--previous');
            $(allPan[index]).addClass('frame--previous-2nd');
            $(allCookies[index]).addClass('frame--previous');
        }
    }

    function setRightClass() {
        var allBds = $('#bds').find('.slide__frame');
        var allCookies = $('#cookies').find('.slide__frame');
        $('.frame--next').removeClass('frame--next');

        var allPan = $('#pan').find('.slide__frame');
        $('.frame--next-2nd').removeClass('frame--next-2nd');
        

        if (nnnextIndex < lastIndex) {
            var index = nnnextIndex + 1;
            $(allBds[index]).addClass('frame--next');
            $(allCookies[index]).addClass('frame--next');
            $(allPan[index]).addClass('frame--next-2nd');
        } else {
            $(allBds[index]).addClass('frame--next');
            $(allCookies[index]).addClass('frame--next');
            $(allPan[index]).addClass('frame--next-2nd');
        }
    }

    document.addEventListener('visibilitychange', () => {
        if(document.hidden){
            carouselRunning = false;
        } else{
            carouselRunning = true;
        }
    })
});