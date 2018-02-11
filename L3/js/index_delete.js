class BaseCharacter{
  constructor(name, hp, ap){
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;

  }

  attack(character, damage){
    if (this.alive == false){
      return;
    }
    character.getHurt(damage);
  }


  getHurt(damage){
    this.hp -= damage;
    if (this.hp <= 0){
      this.die();
    }
  }

  die(){
    this.alive = false;
  }


}


class Hero extends BaseCharacter {
  constructor(name, hp ,ap){
    super(name, hp, ap);

    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;


    console.log("召喚英雄" + this.name + "!");
  }
  attack(character){
    var damage = Math.random() * (this.ap / 2 ) + (this.ap /2 );
    super.attack(character, Math.floor(damage));
  }


}

class Monster extends BaseCharacter {
  constructor(name, hp ,ap){
    super(name, hp, ap);

    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");
  
    
    console.log("遇到怪獸" + this.name + "!");
  }
  attack(character){
    var damage = Math.random() * (this.ap / 2 ) + (this.ap /2 );
    super.attack(character, Math.floor(damage));
  }


}


  var hero = new Hero("Abby", 130, 30);
  var monster = new Monster("Andy", 130, 10);