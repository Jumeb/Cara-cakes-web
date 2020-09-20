const fPass = document.getElementById('password');
const sPass = document.getElementById('conPassword');
const msg = document.querySelectorAll('.pAuth');
let len = 0;
// const matNum = document.getElementById('matNum');
fPass.addEventListener('keyup', ()=>{
    if(fPass.value.length < 5 && fPass.value.length > 3){
        msg[0].style.display = 'inline';
    }
    else if(fPass.value.length >= 5){
        msg[0].style.display = 'none';
        len = fPass.value.length;
    }
})
sPass.addEventListener('keyup', ()=>{
    if(fPass.value != sPass.value && sPass.value.length >= len){
        msg[1].style.display = 'inline';
    }
    else{
        msg[1].style.display = 'none';
    }
})

// matNum.addEventListener('keyup', () => {
//     if(matNum.value.length < 8){
//         msg[0].style.display = 'inline';
//     }
//     else if(matNum.value.length <= 1 || matNum.value.length >= 8){
//         msg[0].style.display = 'none';
//     }
// })
