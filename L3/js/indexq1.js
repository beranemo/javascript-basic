class BaseCharacter {
  
  constructor(name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }
  
  attack(character, damage) {
    if (this.alive == false) {
      return;
    }
    character.getHurt(damage);
  }
  
  getHurt(damage) { 
    this.hp -= damage;
    if (this.hp <= 0) { 
      this.die();
    }
    
    var _this = this;
    console.log(_this.name + " 受傷了");
    
    var i = 1;
    _this.id = setInterval(function() {
      
      if (i == 1) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("hurt-text")[0].textContent = damage;
        _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
      }
      _this.element.getElementsByClassName("effect-image")[0].src = 'images/effect/blade/'+ i +'.png';
      i++;
      if (i > 8) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("hurt-text")[0].textContent = "";
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        clearInterval(_this.id);
      }
    }, 50);
  }
  
  die() {
    this.alive = false;
  }
  
  updateHtml(hpElement, hurtElement) {
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }
  
}

class Hero extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    
    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;
    
    console.log("召喚英雄 " + this.name + "！");
  }
  attack(character) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
  heal() {
    console.log("hp++");
    this.hp += 30;
    if (this.hp > this.maxHp ) {
      this.hp = this.maxHp;
    }
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}

class Monster extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    
    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;
    
    console.log("遇到怪獸 " + this.name + "了！");
  }
  attack(character) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }  
}

var hero = new Hero("Bernard", 130, 30);
var monster = new Monster("Skeleton", 130, 10);

/* 點擊技能後可以攻擊 */
function addSkillEvent() {
  var skill = document.getElementById("skill");
  skill.onclick = function() { 
    heroAttack();
  }
}
addSkillEvent();

/* 點擊恢復技能後可以恢復 hp 30 */
function addHealEvent() {
  var heal = document.getElementById("heal");
  heal.onclick = function() { 
    heroHeal();
  }
}
addHealEvent();

function heroAttack() {
  /* 當按下時，把它隱藏掉，避免再次觸擊 */
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  
  /* 設定英雄按下技能 0.1 秒後往前移動 */
  setTimeout(function() {
    hero.element.classList.add("attacking");
  }, 100);
  
  /* 設定 0.5 秒後英雄攻擊怪物 */ 
  setTimeout(function() {
    hero.attack(monster);
  }, 500);
  
  /* 設定 0.6 秒時英雄往回移動 */
  setTimeout(function() {
    hero.element.classList.remove("attacking");
  }, 600);
  
  setTimeout(function() {
    console.log("判定")
    if (monster.alive) {
      // 怪物還活著，換怪物攻擊
      monster.element.classList.add("attacking");
      setTimeout(function() {
        monster.attack(hero);
        monster.element.classList.remove("attacking");
        endTurn();
        if (hero.alive == false) {
          // 「遊戲結束」空白區
          finish();
        } else {
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      }, 500);      
    } else {
      // 「遊戲結束」空白區
      finish();
    }
  }, 1100);
  
}

function heroHeal() {
  /* 當按下時，把它隱藏掉，避免再次觸擊 */
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  
  /* 設定 0.1 秒後英雄自身恢復 hp */ 
  setTimeout(function() {
    hero.heal();
  }, 100);
  
  setTimeout(function() {
    monster.element.classList.add("attacking");
    setTimeout(function() {
      monster.attack(hero);
      monster.element.classList.remove("attacking");
      endTurn();
      if (hero.alive == false) {
        finish();
      } else {
        document.getElementsByClassName("skill-block")[0].style.display = "block";
      }
    }, 500);      
  }, 600);
}

var rounds = 10;
function endTurn() {
  rounds--;
  document.getElementById("round-num").textContent = rounds;
  if (rounds < 1) {
    // 「遊戲結束」空白區
    finish();
  }
}

function finish() {
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.alive == false) {
    dialog.classList.add("win");
  } else {
    dialog.classList.add("lose");
  }
}