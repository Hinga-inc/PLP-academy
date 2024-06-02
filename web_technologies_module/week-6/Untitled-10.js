let person = {
    name:"Hinga",
    age:20,
    describe: function greet(){
        console.log("Hello! My name is ${this.name} and I'm ${this.age} years old.");
    }
}
person.greet();