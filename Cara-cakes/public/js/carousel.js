
$(function() {
    var prevIndex = 0;
    var currentIndex = 1;
    var nextIndex = 2;
    var lastIndex = $('.frame').find('.frame__carousel').length - 1;

    $('.frame').on('click', '.frame__previous', showFrame);
    $('.frame').on('click', '.frame__next', showFrame);
    $('.indicators').on('click', '.indicate', showIndicatorFrame);

    generateIndicators();
    setLeftClass(); 

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

    function showFrame() {
        if ($(event.target).hasClass('.frame__carousel')) {
            var target = $(event.target);
        }
        else {
            var target = $(event.target).parent();
        }
        var index = $('.frame__carousel').index(target);
        updatePos(index);

        clearTimeout(carouselRestart);
        carouselRunning = false;
        carouselRestart = setTimeout(() => {
            carouselRunning = true;
        }, 7000);
    }

    function updatePos(index) {
        prevIndex = index == 0 ? lastIndex : index - 1;
        currentIndex = index;
        nextIndex = index == lastIndex ? 0 : index + 1;

        updateCaroPos();
        setLeftClass();
        updateIndicators();
    }

    function updateCaroPos() {
        $('.frame').find('.frame__previous').removeClass('frame__previous');
        $('.frame').find('.frame__current').removeClass('frame__current');
        $('.frame').find('frame__next').removeClass('frame__next');

        var allFrames = $('.frame').find('.frame__carousel');
        $(allFrames[prevIndex]).addClass('frame__previous');
        $(allFrames[currentIndex]).addClass('frame__current');
        $(allFrames[nextIndex]).addClass('frame__next');
    }

    function generateIndicators() {
        var indicatorsContainer = $('.indicator-list').find('div');
        for (var i = lastIndex; i>=0; i--){
            var newIndicator = $('<span class="ind"></span>');
            $(indicatorsContainer).append(newIndicator);
        }
        updateIndicators();
    }

    function updateIndicators() {
        $('.indicator-list').find('.frame__previous').removeClass('frame__previous');
        $('.indicator-list').find('.frame__current').removeClass('frame__current');
        $('.indicator-list').find('.frame__next').removeClass('frame__current');

        var allIndicators = $('.indicator-list').find('pip');
        $(allIndicators[prevIndex]).addClass('frame__previous');
        $(allIndicators[currentIndex]).addClass('frame__current');
        $(allIndicators[nextIndex]).addClass('frame__next');
    }

    function showIndicatorFrame(next) {
        var index = $('.indicator-list span').index(event.target);
        updateIndicators();
    }

    function setLeftClass() {
        var allFrames = $('frame').find('frame__carousel');
        $('carousel.left').removeClass('left');

        if (prevIndex > 0) {
            var index = prevIndex - 1;
            $(allFrames[index]).addClass('left');
        } else {
            $(allFrames[lastIndex]).addClass('left');
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
