let obj = {};
let object;
pastries = [
    {"id": 55,"pId": {"baker": 'Noella Cara',"aId": 56},"qty": 2},
    {"id":5,"pId": {"baker": 'Mah Ngeche',"aId":57,},"qty": 1},
    {"id":53,"pId": {"baker": 'Mah Ngeche',"aId": 5},"qty": 2},
    {"id": 55,"pId": {"baker": 'Noella Cara',"aId": 56},"qty": 2},
    {"id": 55,"pId": {"baker": 'peter gray',"aId": 56},"qty": 2},
    {"id": 55,"pId": {"baker": 'Noella Cara',"aId": 56},"qty": 2},
    {"id": 55,"pId": {"baker": 'Noella henry',"aId": 56},"qty": 2},
    {"id": 55,"pId": {"baker": 'Ella henry',"aId": 56},"qty": 2}
];


pastries.map((i) => {
    let baker = i.pId.baker.toString();
    if(obj[baker] === undefined) {
        obj[baker] = [i];
        
    } else {
        obj[baker].push(i);  
    }
});

for (let bakers of Object.values(obj)) {
    console.log(bakers.length);
    for (let i = 0; i < bakers.length; i++){
        // console.log(bakers[i]);
    }
}

const _pastries = pastries.filter(pastry => pastry.pId.baker !== 'Noella Cara');
console.log(_pastries);



// console.log(obj[""]);
