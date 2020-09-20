const day = document.querySelector(".day");
const dOpts = document.querySelector(".days");
const dList = document.querySelectorAll('.Days');
const selectedDay = document.getElementById('day');
const month = document.querySelector(".month");
const mOpts = document.querySelector(".months");
const mList = document.querySelectorAll(".Months");
const selectedMonth = document.getElementById('month');
const year = document.querySelector(".year");
const yOpts = document.querySelector(".years");
const yList = document.querySelectorAll(".Years");
const selectedYear = document.getElementById('year');
const hour = document.querySelector(".hour");
const hOpts = document.querySelector(".hours");
const hList = document.querySelectorAll(".Hours");
const selectedHour = document.getElementById('hour');
const mins = document.querySelector(".minute");
const minOpts = document.querySelector(".minutes");
const minList = document.querySelectorAll(".Minutes");
const selectedMinute = document.getElementById('mins');
const period = document.querySelector(".period");
const pOpts = document.querySelector(".periods");
const pList = document.querySelectorAll(".Periods");
const selectedPeriod = document.getElementById('per');
const locale = document.querySelector(".location");
const lOpts = document.querySelector(".locations");
const lList = document.querySelectorAll(".Locations");
const selectedLocation = document.getElementById('locale');

day.addEventListener('click', () => {
    dOpts.classList.toggle('sheet__active');
});

dList.forEach(o => {
    o.addEventListener('click', () => {
        let sDay = o.querySelector('label').innerHTML;
        day.innerHTML = sDay;
        selectedDay.value = sDay;
        dOpts.classList.remove('sheet__active');
    })
})

month.addEventListener('click', () => {
    mOpts.classList.toggle('sheet__active');
});

mList.forEach(o => {
    o.addEventListener('click', () => {
        let sMonth = o.querySelector('label').innerHTML
        month.innerHTML = sMonth;
        selectedMonth.value = sMonth;
        mOpts.classList.remove('sheet__active');
    })
})

year.addEventListener('click', () => {
    yOpts.classList.toggle('sheet__active');
});

yList.forEach(o => {
    o.addEventListener('click', () => {
        let sYear = o.querySelector('label').innerHTML;
        year.innerHTML = sYear;
        selectedYear.value = sYear;
        yOpts.classList.remove('sheet__active');
    })
})

hour.addEventListener('click', () => {
    hOpts.classList.toggle('sheet__active');
});

hList.forEach(o => {
    o.addEventListener('click', () => {
        let sHour = o.querySelector('label').innerHTML;
        hour.innerHTML = sHour;
        selectedHour.value = sHour;
        hOpts.classList.remove('sheet__active');
    })
});

mins.addEventListener('click', () => {
    minOpts.classList.toggle('sheet__active');
});

minList.forEach(o => {
    o.addEventListener('click', () => {
        let sMins = o.querySelector('label').innerHTML;
        mins.innerHTML = sMins;
        selectedMinute.value = sMins;
        minOpts.classList.remove('sheet__active');
    })
});

period.addEventListener('click', () => {
    pOpts.classList.toggle('sheet__active');
});

pList.forEach(o => {
    o.addEventListener('click', () => {
        let sPeriod = o.querySelector('label').innerHTML;
        period.innerHTML = sPeriod;
        selectedPeriod.value = sPeriod;
        pOpts.classList.remove('sheet__active');
    })
});

locale.addEventListener('click', () => {
    lOpts.classList.toggle('sheet__active');
});

lList.forEach(o => {
    o.addEventListener('click', () => {
        let sLocation = o.querySelector('label').innerHTML;
        locale.innerHTML = sLocation;
        selectedLocation.value = sLocation;
        lOpts.classList.remove('sheet__active');
    })
});

let Hour = parseInt(selectedHour.value);

if (selectedPeriod.value == 'PM' && Hour < 12) {
    Hour += 12;
    selectedHour.value = Hour;
} else {
    selectedHour.value = Hour;
}