// src/rpg.js

// 1. Розрахунок базового урону (Атака - Захист)
function calculateDamage(attack, defense) {
    if (attack <= defense) return 0;
    return attack - defense;
}

// 2. Перевірка на критичний удар (якщо на кубику d20 випало 20)
function isCriticalHit(diceRoll) {
    return diceRoll === 20;
}

// 3. Перевірка стану персонажа (Живий чи мертвий)
function getCharacterStatus(hp) {
    return hp > 0 ? "Alive" : "Dead";
}

// 4. Проведення атаки (Інтегрує розрахунок урону та критичні удари)
function performAttack(attacker, defender, diceRoll) {
    let damage = calculateDamage(attacker.attack, defender.defense);

    if (isCriticalHit(diceRoll)) {
        damage *= 2;
    }
    
    return {
        damageDealt: damage,
        isCritical: isCriticalHit(diceRoll) 
    };
}

// 5. Оновлення стану після бою (Інтегрує нанесення урону та перевірку статусу)
function applyDamage(defender, damage) {
    const newHp = defender.hp - damage;
    const status = getCharacterStatus(newHp); 
    
    return {
        remainingHp: newHp,
        status: status
    };
}

module.exports = { calculateDamage, isCriticalHit, getCharacterStatus, performAttack, applyDamage };
