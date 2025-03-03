interface data{
    username: string
    password: string
}

interface test extends data {
    id: number
    age: number
}
const mapping: test[] = [

{
    id: 1,
    age: 12,
    username: "adinda",
    password: "test12344"
}
];

console.log(mapping);
