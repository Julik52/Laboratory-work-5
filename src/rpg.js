// src/rpg.js

// --- МОДУЛЬНІ ФУНКЦІЇ (Чиста логіка) ---

// 1. Розрахунок базового урону (Атака - Захист)
// Якщо захист більший за атаку, урон = 0 (не може бути мінусовим)
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

// --- ІНТЕГРАЦІЙНІ ФУНКЦІЇ (Взаємодія) ---

// 4. Проведення атаки (Інтегрує розрахунок урону та критичні удари)
function performAttack(attacker, defender, diceRoll) {
    let damage = calculateDamage(attacker.attack, defender.defense);
    
    // Якщо крит - урон подвоюється
    if (isCriticalHit(diceRoll)) {
        damage *= 2;
    }
    
    return {
        damageDealt: damage,
        isCritical: isCriticalHit(diceRoll) // Використовуємо модульну функцію
    };
}

// 5. Оновлення стану після бою (Інтегрує нанесення урону та перевірку статусу)
function applyDamage(defender, damage) {
    const newHp = defender.hp - damage;
    const status = getCharacterStatus(newHp); // Використовуємо модульну функцію
    
    return {
        remainingHp: newHp,
        status: status
    };
}

module.exports = { calculateDamage, isCriticalHit, getCharacterStatus, performAttack, applyDamage };