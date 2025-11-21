// tests/rpg.test.js
const { calculateDamage, isCriticalHit, getCharacterStatus, performAttack, applyDamage } = require('../src/rpg');

// === 3 МОДУЛЬНІ ТЕСТИ ===

test('Unit 1: Урон розраховується як Атака мінус Захист', () => {
    expect(calculateDamage(15, 5)).toBe(10);
});

test('Unit 2: Урон дорівнює 0, якщо захист більший за атаку', () => {
    expect(calculateDamage(5, 10)).toBe(0);
});

test('Unit 3: Персонаж мертвий, якщо HP менше або дорівнює 0', () => {
    expect(getCharacterStatus(-5)).toBe("Dead");
    expect(getCharacterStatus(10)).toBe("Alive");
});

// === 2 ІНТЕГРАЦІЙНИХ ТЕСТИ ===

test('Integration 1: Атака з критичним ударом подвоює урон', () => {
    const hero = { attack: 12 };
    const monster = { defense: 2 };
    const diceRoll = 20; // Це крит!
    
    // Базовий урон був би 10 (12-2). Але через крит має бути 20.
    const result = performAttack(hero, monster, diceRoll);
    
    expect(result).toEqual({
        damageDealt: 20,
        isCritical: true
    });
});

test('Integration 2: Отримання урону змінює статус персонажа на Dead', () => {
    const monster = { hp: 10 };
    const damage = 15; // Урон більший за життя
    
    // Функція має відняти HP і викликати перевірку статусу
    const result = applyDamage(monster, damage);
    
    expect(result.remainingHp).toBe(-5);
    expect(result.status).toBe("Dead");
});