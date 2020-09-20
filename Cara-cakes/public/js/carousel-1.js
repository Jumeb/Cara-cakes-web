$(function() {
    var pprevIndex = 0;
    var prevIndex =1;
    var currentIndex = 2;
    var nextIndex = 3;
    var nnextIndex = 4;
    var lastIndex = $('.carousel').find('.carousel__frame').length - 1;

    $('.carousel').on('click', '.carousel__previous', showFrame);
    $('.carousel').on('click', '.carousel__pprevious', showFrame);
    $('.carousel').on('click', '.carousel__next', showFrame);
    $('.carousel').on('click', '.carousel__nnext', showFrame);
    $('.index').on('click', '.index__time', showIndicatorFrame);

    generateIndicators();
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

    function showFrame() {
        if ($(event.target).hasClass('carousel__frame')) {
            var target = $(event.target);
        }
        else {
            var target = $(event.target).parent();
        }
        var index = $('.carousel__frame').index(target);
        updatePos(index);

        clearTimeout(carouselRestart);
        carouselRunning = false;
        carouselRestart = setTimeout(() => {
            carouselRunning = true;
        }, 7000);
    }

    function updatePos(index) {

        prevIndex = index == 0 ? lastIndex : index - 1;
        pprevIndex = prevIndex == 0 ? lastIndex : prevIndex -1;
        currentIndex = index;
        nextIndex = index == lastIndex ? 0 : index + 1;
        nnextIndex = nextIndex == lastIndex ? 0 : nextIndex + 1;
        updateCaroPos();
        setLeftClass();
        setRightClass();
        updateIndicators();
    }

    function updateCaroPos() {
        $('.carousel').find('.carousel__pprevious').removeClass('carousel__pprevious');
        $('.carousel').find('.carousel__previous').removeClass('carousel__previous');
        $('.carousel').find('.carousel__current').removeClass('carousel__current');
        $('.carousel').find('.carousel__next').removeClass('carousel__next');
        $('.carousel').find('.carousel__nnext').removeClass('carousel__nnext');

        var allFrames = $('.carousel').find('.carousel__frame');
        $(allFrames[pprevIndex]).addClass('carousel__pprevious');
        $(allFrames[prevIndex]).addClass('carousel__previous');
        $(allFrames[currentIndex]).addClass('carousel__current');
        $(allFrames[nextIndex]).addClass('carousel__next');
        $(allFrames[nnextIndex]).addClass('carousel__nnext');

        var infoCurrent = $('.info__1').find('.info__1--main');
        $(infoCurrent[currentIndex]).addClass('info__enter info__enter_main');
        $(infoCurrent[pprevIndex]).removeClass('info__enter info__enter_main');

        var infoCurrentSub = $('.info__1').find('.info__1--sub');
        $(infoCurrentSub[currentIndex]).addClass('info__enter info__enter_sub');
        $(infoCurrentSub[nextIndex]).removeClass('info__enter info__enter_sub');
        
    }

    function generateIndicators() {
        var indicatorsContainer = $('.index').find('div');
        for (var i = lastIndex; i>=0; i--){
            var newIndicator = $('<span class="index__time"></span>');
            $(indicatorsContainer).append(newIndicator);
        }
        updateIndicators();
    }

    function updateIndicators() {
        $('.index').find('.index__previous').removeClass('index__previous');
        $('.index').find('.index__current').removeClass('index__current');
        $('.index').find('.index__next').removeClass('index__next');

        var allIndicators = $('.index').find('.index__time');
        $(allIndicators[prevIndex]).addClass('index__previous');
        $(allIndicators[currentIndex]).addClass('index__current');
        $(allIndicators[nextIndex]).addClass('index__next');
    }

    function showIndicatorFrame(next) {
        var index = $('.show span').index(event.target);
        updatePos(index);
        clearTimeout(carouselRestart);
        carouselRunning = false;
        carouselRestart = setTimeout(() => {
            carouselRunning = true;
        }, 4000);
    }

    function setLeftClass() {
        var allFrames = $('.carousel').find('.carousel__frame');
        $('.carousel__left').removeClass('carousel__left');

        if (pprevIndex > 0) {
            var index = pprevIndex - 1;
            $(allFrames[index]).addClass('carousel__left');
        } else {
            $(allFrames[lastIndex]).addClass('carousel__left');
        }
    }

    function setRightClass() {
        var allFrames = $('.carousel').find('.carousel__frame');
        $('.carousel__right').removeClass('carousel__right');

        if (nnextIndex < lastIndex) {
            var index = nnextIndex + 1;
            $(allFrames[index]).addClass('carousel__right');
        } else {
            $(allFrames[0]).addClass('carousel__right');
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