import 'reflect-metadata';
import Container, { Service, Token } from 'typedi';

@Service()
class Weapon {
    public attack() {
        console.log('attack!!');
    }
}

@Service()
class Gun extends Weapon {
    public attack() {
        console.log('shoot!!!');
    }
}

@Service()
class User {
    constructor(private weapon: Weapon){}

    public attack() {
        this.weapon.attack();
    }
}

const user: User = Container.get(User);

user.attack();

const myToken = new Token('SECRET_VALUE_KEY');
Container.set(myToken, Weapon);
const test = Container.get(myToken);
console.log(test);