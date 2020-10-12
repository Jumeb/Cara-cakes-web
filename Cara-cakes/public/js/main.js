$(function () {
    let max;

    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let viewInfo = $('.events').find('.events__view-display');
    let viewOptions = $('.admin__dashboard').find('.admin__options');
    let addPastry = $('.shop__control').find('.shop__adder');
    let incPastry = $('.shop__control').find('.shop__increment');
    let decPastry = $('.shop__control').find('.shop__decrement');
    let details = $('.shop__control').find('.shop__details');
    let currentNumber = $('.shop__control').find('.shop__num');
    let eventYear = $('.panel__event').find('.year');
    let eventMonth = $('.panel__event').find('.month');
    let eventDay = $('.panel__event').find('.day');
    let eventHour = $('.panel__event').find('.hour');
    let dayName = $('.panel__event').find('.dayName');
    let pos = $('.panel__event').find('.pos');
    let eventMins = $('.panel__event').find('.mins');
    let preHour = $('.panel__event').find('.hour');
    let hour = $('.panel__event').find('.pre-hour');
    let numEvents = $('.panel__event').find('.events').length - 1;
    let Dday = $('.panel__event').find('.events__day');
    let Dhours = $('.panel__event').find('.events__hours');
    let Dmin = $('.panel__event').find('.events__mins');
    let Dsec = $('.panel__event').find('.events__sec');
    window.addEventListener('scroll', () => {
        max = pageYOffset
        console.log(max);
        checkPos(max);
        navInfo(max);
    })

    checkPos = pos => {
        if (pos < 38) {
            hideNav();
        } 
        else if (pos < 350) {
            hideNavigation();
        }
        else if (pos > 350) {
            showNavigation();
        } else {
            showNav();
        }
    }

    navInfo = pos => {
        if (pos >= 0 && pos < 680) {
            showHome();
        } else if (pos > 680 && pos < 1360) {
            showOffers();
        } else if (pos > 1360 && pos < 2120) {
            showFlvs();
        } else if (pos > 2120 && pos < 2840) {
            showStories();
        } else if (pos > 2840 && pos < 3340) {
            showInfo();
        } else if (pos > 3340 && pos < 6000) {
            showGall();
        }
    }

    hideNav = () => {
        $('.body').find('.dynamic-nav').removeClass('navi');
        $('.body').find('.dynamic-nav').addClass('navi__hidden')
    }

    hideNavigation = () => {
        $('.body').find('.container').removeClass('container__show');
    }


    showNav = () => {
        $('.body').find('.dynamic-nav').removeClass('navi__hidden');
        $('.body').find('.dynamic-nav').addClass('navi');
    }

    showNavigation = () => {
        $('.body').find('.container').addClass('container__show');
    }

    showHome = () => {
        $('.container').find('.home').addClass('container__nav--active');
        $('.container').find('.offers').removeClass('container__nav--active');
        $('.container').find('.information').removeClass('container__nav--active');
        $('.container').find('.flvs').removeClass('container__nav--active');
        $('.container').find('.stry').removeClass('container__nav--active');
        $('.container').find('.gall').removeClass('container__nav--active');
    }

    showOffers = () => {
        $('.container').find('.offers').addClass('container__nav--active');
        $('.container').find('.home').removeClass('container__nav--active');
        $('.container').find('.flvs').removeClass('container__nav--active');
        $('.container').find('.information').removeClass('container__nav--active');
        $('.container').find('.stry').removeClass('container__nav--active');
        $('.container').find('.gall').removeClass('container__nav--active');
    }

    showFlvs = () => {
        $('.container').find('.flvs').addClass('container__nav--active');
        $('.container').find('.offers').removeClass('container__nav--active');
        $('.container').find('.home').removeClass('container__nav--active');
        $('.container').find('.information').removeClass('container__nav--active');
        $('.container').find('.stry').removeClass('container__nav--active');
        $('.container').find('.gall').removeClass('container__nav--active');
    }

    showStories = () => {
        $('.container').find('.stry').addClass('container__nav--active');
        $('.container').find('.information').removeClass('container__nav--active');
        $('.container').find('.flvs').removeClass('container__nav--active');
        $('.container').find('.home').removeClass('container__nav--active');
        $('.container').find('.offers').removeClass('container__nav--active');
        $('.container').find('.gall').removeClass('container__nav--active');
    }

    showGall = () => {
        $('.container').find('.gall').addClass('container__nav--active');
        $('.container').find('.information').removeClass('container__nav--active');
        $('.container').find('.flvs').removeClass('container__nav--active');
        $('.container').find('.stry').removeClass('container__nav--active');
        $('.container').find('.offers').removeClass('container__nav--active');
        $('.container').find('.home').removeClass('container__nav--active');
    }

    showInfo = () => {
        $('.container').find('.information').addClass('container__nav--active');
        $('.container').find('.stry').removeClass('container__nav--active');
        $('.container').find('.home').removeClass('container__nav--active');
        $('.container').find('.flvs').removeClass('container__nav--active');
        $('.container').find('.offers').removeClass('container__nav--active');
        $('.container').find('.gall').removeClass('container__nav--active');
    }

    $('.events').on('click', '.click', showDets);

    function showDets() {
        var index = $('.click a').index(event.target);
        updateViews(index);
    }

    updateViews = index => {
        for (let i = 0; i < viewInfo.length; i++) {
            if (i === index) {
                $(viewInfo[i]).removeClass('events__view-display');
                $(viewInfo[i]).addClass('events__view');
            } else {
                $(viewInfo[i]).addClass('events__view-display');
            }
        }
    }

    $('.admin__dashboard').on('click', '.admin__navigate', showOpts);

    function showOpts() {
        var index = $('.admin__navigate b').index(event.target);
        updateOptions(index);
    }

    updateOptions = index => {
        for (let i = 0; i <= viewOptions.length; i++) {
            if (i === index) {
                $(viewOptions[i]).removeClass('admin__options--hidden');
                // $(viewOptions[i]).addClass('admin__options');
            } else {
                $(viewOptions[i]).addClass('admin__options--hidden');
            }
        }
    }

    $('.shop__control').on('click', '.shop__adder', addItem);

    function addItem() {
        var index = $('.shop__adder button').index(event.target);
        updateAddedItem(index);
    }

    updateAddedItem = item => {
        $(addPastry[item]).removeClass('shop__add');
        $(addPastry[item]).addClass('shop__add-done');
        $(incPastry[item]).removeClass('shop__hide');
        $(incPastry[item]).removeClass('shop__centered-inc');
        $(decPastry[item]).removeClass('shop__hide');
        $(decPastry[item]).removeClass('shop__centered-dec');
        $(currentNumber[item]).removeClass('shop__hide');
        $(details[item]).removeClass('shop__hide');
        $(currentNumber[item]).removeClass('shop__display');
    }

    $('.shop__control').on('click', '.shop__decrement', decItem);

    function decItem() {
        let index = $('.shop__decrement button').index(event.target);
        let operand = '-';
        updateNumber(index, operand);
    }

    $('.shop__control').on('click', '.shop__increment', incItem);

    function incItem() {
        let index = $('.shop__increment button').index(event.target);
        let operand = '+';
        updateNumber(index, operand);
    }

    updateNumber = (num, op) => {
        let value = $(currentNumber[num]).text();
        value = parseInt(value);
        if (op === '-') {
            value -= 1;
            $(currentNumber[num]).html(value);

            if (value == 0) {
                $(addPastry[num]).addClass('shop__add');
                $(addPastry[num]).removeClass('shop__add-done');
                $(incPastry[num]).addClass('shop__hide');
                $(incPastry[num]).addClass('shop__centered-inc');
                $(decPastry[num]).addClass('shop__hide');
                $(details[num]).addClass('shop__hide');
                $(decPastry[num]).addClass('shop__centered-dec');
                $(currentNumber[num]).addClass('shop__hide');
                $(currentNumber[num]).addClass('shop__display');
                $(currentNumber[num]).html('1');
            }
        } else if (op === '+') {
            value += 1;
            $(currentNumber[num]).html(value);
        }
    }

    for (i = 0; i <= numEvents; i++) {

        let completeDate = $(eventMonth[i]).text() + " " + $(eventDay[i]).text() + ", " + $(eventYear[i]).text() + " " + $(eventHour[i]).text() + ":" + $(eventMins[i]).text() + ":00";
        let countDown = new Date(completeDate);
        let pHour = $(preHour[i]).text();
        updateHour(i, pHour);
        updateTime(i, countDown);

        // var mon = ;

        var name = month[parseInt($(eventMonth[i]).text() - 1)];

        $(eventMonth[i]).html(name);

        $(dayName[i]).html(day[countDown.getUTCDay() - 1]);

        if (parseInt($(eventDay[i]).text().toString().split("").length) == 2) {
            if (parseInt($(eventDay[i]).text().toString().split("")[1]) == 1 && parseInt($(eventDay[i]).text().toString().split("")[0]) != 1) {
                $(pos[i]).html('st');
            } else if (parseInt($(eventDay[i]).text().toString().split("")[1]) == 2 && parseInt($(eventDay[i]).text().toString().split("")[0]) != 1) {
                $(pos[i]).html('nd');
            } else if (parseInt($(eventDay[i]).text().toString().split("")[1]) == 3 && parseInt($(eventDay[i]).text().toString().split("")[0]) != 1) {
                $(pos[i]).html('rd');
            } else {
                $(pos[i]).html('th');
            }
        }
    }

    function updateTime(event, date) {
        var x = setInterval(() => {
            let currentDate = new Date().getTime();
            let duration = date - currentDate;

            let days = Math.floor(duration / (1000 * 60 * 60 * 24));
            let hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((duration % (1000 * 60)) / 1000);

            if (duration < 0) {
                clearInterval(x);
            }


            $(Dmin[event]).html(minutes);
            $(Dsec[event]).html(seconds);
            $(Dhours[event]).html(hours);
            $(Dday[event]).html(days);
        }, 1000);
    }

    function updateHour(event, prehour) {
        if (prehour > 13) {
            preHour -= 12;
            $(hour[event]).html(prehour);
        } else {
            $(hour[event]).html(prehour);
        }
    }
});


function getRadioVal() {
    let val;
    let form = document.getElementById('form')
    let name = 'type';
    var radios = form.elements[name];
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) {
            val = radios[i].value; 
            break; 
        }
    }
    
    document.getElementById('choosen').innerHTML = val;
    document.getElementById('category').checked = false;
}
