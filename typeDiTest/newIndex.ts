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

}

@Service()
class User {
    constructor(private weapon: Weapon){}

    public attack() {
        this.weapon.attack();
    }
}

let user: User = Container.get(User);

user.attack();
user.attack = () => {console.log('zzzzzz')};

user.attack();

const user2 = new User(new Weapon());

user2.attack();