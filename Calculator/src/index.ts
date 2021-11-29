type user = {
    name: string,
    id: number
}

function addUser(u: user): user{
    return u; 
}

console.log(addUser({
    name: "Ray",
    id: 1
}))


export {};