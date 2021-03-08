const Dragon = require('../dragon.js');
const { REFRASH_RATE, SECONDS } = require('../config');
const refrashRate = REFRASH_RATE * SECONDS;

class Generation {
  constructor() {
    this.expiration = this.calculateExpiration();
  }

  calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refrashRate / 2));

    const msUntilExpiration = Math.random() < 0.5 ? refrashRate - expirationPeriod : refrashRate + expirationPeriod;


    return new Date(Date.now() + msUntilExpiration);
  }

  newDragon() {
    if (Date.now() > this.expiration) {
      throw new Error(`this generation expired on ${this.expiration}`);
    }

    return new Dragon();
  }
}

module.exports = Generation;
