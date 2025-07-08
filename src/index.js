const SpellBook = require('./SpellBook');

/**
 * @typedef {Object} Command
 * @property {string} commandID
 * @property {string} name
 * @property {string} [group]
 * @property {(args?: any) => void} [action]
 */

module.exports = SpellBook; 