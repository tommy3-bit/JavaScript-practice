let Person = function(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
};

Person.prototype.greeting = function(){
    alert("Hi I'm" + this.name.first);
}

Person.prototype.bio = function() {
    let string = this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. ';
    let pronoun;

    if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
      pronoun = 'He likes ';
    } else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
      pronoun = 'She likes ';
    } else {
      pronoun = 'They like ';
    }
    
    string += pronoun;

    
    if(this.interests.length === 1) {
      string += this.interests[0] + '.';
    } else if(this.interests.length === 2) {
      string += this.interests[0] + ' and ' + this.interests[1] + '.';
    } else {
        for(let i = 0; i < this.interests.length; i++) {
            if(i === this.interests.length - 1) {
            string += 'and ' + this.interests[i] + '.';
            } else {
            string += this.interests[i] + ', ';
            }
        }
    }
    alert(string);
};

Person.prototype.farewell = function() {
    alert(this.name.first + ' has left the building. Bye for now!');
}

let Teacher = function(first, last, age, gender, interests, subject){
    Person.call(this, first, last, age, gender, interests);
    this.subject = subject;
}

Teacher.prototype = new Person();
//Teacher.prototype = Object.create(Person.prototype);
//Teacher.prototype.constructor = Teacher;

Teacher.prototype.greeting = function() {
    var prefix;
  
    if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
      prefix = 'Mr.';
    } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
      prefix = 'Mrs.';
    } else {
      prefix = 'Mx.';
    }
  
    alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};

let person1 = new Person('Tammi', 'Smith', 17, 'female', ['music', 'skiing', 'kickboxing']);
let teacher1 = new Teacher('ammi', 'Smith', 17, 'female', ['music', 'skiing', 'kickboxing']);

/*
    教師クラスのインスタンスを生成
    この時点で、name, age, sexなどのプロパティはteacher1.hogeで使える

    インスタンスのプロパティを見てみる
        > Object.getOwnPropertyNames(person1)
            (4) ["name", "age", "gender", "interests"]
            0: "name"
            1: "age"
            2: "gender"
            3: "interests"
            length: 4
            __proto__: Array(0)

        > Object.getOwnPropertyNames(teacher1)
            (5) ["name", "age", "gender", "interests", "subject"]
            0: "name"
            1: "age"
            2: "gender"
            3: "interests"
            4: "subject"
            length: 5
            __proto__: Array(0)

    一方、teacher1.greeting, teacher1.farewellは使用できない（peroson1.hogeFunc()は当然、使用可能）

    prototypeプロパティのオブジェクトのプロパティを見てみる  
        > Object.getOwnPropertyNames(Teacher.prototype)
            ["constructor"]
            0: "constructor"
            length: 1
            __proto__: Array(0)

        > Teacher.prototype.constructor
            ƒ (first, last, age, gender, interests, subject){
                Person.call(this, first, last, age, gender, interests);
                this.subject = subject;
            }

        > Object.getOwnPropertyNames(Person.prototype)
            (4) ["constructor", "greeting", "bio", "farewell"]
            0: "constructor"
            1: "greeting"
            2: "bio"
            3: "farewell"
            length: 4
            __proto__: Array(0)

        > Person.prototype.constructor
            ƒ (first, last, age, gender, interests) {
                this.name = {
                first,
                last
                };
                this.age = age;
                this.gender = gender;
                this.interests = interests;
            }
    
    TeacherのPrototypeはTeacher自身のコンストラクタしか参照していない。→Person.prototypeへの参照がないのでgreeting()メソッドが使えない

    どうすればよいか？
    1. Teacher.protoytpeにPerson.prototypeを代入する。→greeting()は使えるが、subjectプロパティが使えなくなる

        > Teacher.prototype
            Person {}
            __proto__:
            bio: ƒ ()
            farewell: ƒ ()
            greeting: ƒ ()
            constructor: ƒ (first, last, age, gender, interests)
            arguments: null
            caller: null
            length: 5
            name: "Person"
            prototype: {greeting: ƒ, bio: ƒ, farewell: ƒ, constructor: ƒ}
            __proto__: ƒ ()
            [[FunctionLocation]]: scope4.js:1
            [[Scopes]]: Scopes[2]
            __proto__: Object

    2. Teacher.prototype.constructorにTeacherを代入
        > Teacher.prototype
            Person {constructor: ƒ}
            constructor: ƒ (first, last, age, gender, interests, subject)
            arguments: null
            caller: null
            length: 6
            name: "Teacher"
            prototype: Person
            constructor: ƒ (first, last, age, gender, interests, subject)
            __proto__: Object
            __proto__: ƒ ()
            [[FunctionLocation]]: scope4.js:50
            [[Scopes]]: Scopes[2]
            __proto__: Object
*/

let Animal = function(hoge){
    this.hoge = hoge;
};

Animal.prototype.hage = function(){
    console.log("hage");
}


let Dog = function(hoge){
    Animal.call(this, hoge);
    console.log("hello");
};

Dog.prototype = new Animal(); //

Dog.prototype.bark = function(){
    console.log("hoge");
};

let d = new Dog(123);
