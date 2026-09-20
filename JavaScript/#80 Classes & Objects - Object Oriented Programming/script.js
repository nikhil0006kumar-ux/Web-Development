// let obj = {
//     a: 1,
//     b: "Nikhil"
// }
// console.log(obj)

// let animal = {
//     eats: true
// };

// let rabbit = {
//     jumps: true
// };

// rabbit.__proto__ = animal; // Sets rabbit.[[Prototype]] = animal

class Animal {
    constructor(name) {
        this.name = name
        console.log("Object is created...")
    }

    eats() {
        console.log("Kha raha hoon")
    }

    jumps() {
        console.log("kood raha hoon")
    }
}

class Lion extends Animal {
    constructor(name) {
        super(name)
        console.log("Object is created and he is a Lion...")
    }

    eats() {
        super.eats()
        console.log("Kha raha hoon roar")
    }
}

let a = new Animal("Bunny");
console.log(a)

let l = new Lion("Shera")
console.log(l)