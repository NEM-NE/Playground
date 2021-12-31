class Weapon {
    public attack() {
        console.log('attack!!');
    }
}

class Gun extends Weapon {
    public attack() {
        console.log('shoot!!!');
    }
}

class User {

    private weapon: Weapon;

    // constructor() {
    //     this.weapon = new Weapon(); // 유저 클래스 내부에서 외부 클래스인 Weapon을 생성 => 의존성이 있다. 그러나 무기가 계속 바뀔 때마다 코드를 수정...
    // }

    // 그러나 의존성 주입해야할 게 많아진다면? => 그 때마다 새로운 클래스를 생성자에 넣어준다?
    constructor(weapon: Weapon){ // 외부에서 weapon 클래스를 받아옴 => 다른 무기여도 부모가 weapon이므로 상관 x / 코드가 유동적으로 사용가능 / 의존성 주입함!
        this.weapon = weapon;
    }

    public attack() {
        this.weapon.attack();
    }
}

const user = new User(new Gun());
user.attack();