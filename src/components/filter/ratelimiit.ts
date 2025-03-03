function Createlimiiter(limit:number, interval:number){
    let Timestamp: number[] = [];

    return function isAllowed() : boolean{
const time: number = Date.now();
const hasilwaktu: number = time - interval;

Timestamp = Timestamp.filter(timestamps => timestamps > hasilwaktu);

if(Timestamp.length > limit){
    return false;
} else {
    Timestamp.push(time);
    return true;
}
    };
};
export default Createlimiiter;
