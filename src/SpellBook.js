const { EventEmitter } = require('events');

/**
 * @typedef {Object} Command
 * @property {string} commandID
 * @property {string} name
 * @property {string?} group
 * @property {(args?: any) => void} [action]
 */

/**
 * SpellBook for Spell Book integration.
 */
class SpellBook extends EventEmitter {
    /**
     * @param {string} pluginName
     * @param {string} pluginID
     * @param {Command[]} [commands]
     */
    constructor(pluginName, pluginID, commands) {
        super();
        this.pluginName = pluginName;
        this.pluginID = pluginID;
        this._commands = commands || [];
        this._commandListener = null;

        if (this.pluginName && this.pluginID) {
            this._addEventListener('knights_of_the_editing_table.spellbook.app.opened', () => this.register(this._commands));
            this.start();
        } else {
            throw new Error("pluginName && pluginID required");
        }
    }

    /**
     * Add or update commands
     * @param {Command[]} commands
     */
    register(commands) {
        if (this.pluginName && commands) {
            this._commands = commands;
            const plugin = {
                pluginID: this.pluginID,
                name: this.pluginName,
                commands
            };
            this._dispatchEvent('knights_of_the_editing_table.spellbook.api.commands.add', plugin);
        } else {
            throw new Error("pluginName && commands required");
        }
    }

    /**
     * Start listening for command events
     */
    start() {
        const eventType = `knights_of_the_editing_table.spellbook.api.${this.pluginID}.command.registered`;

        this._commandListener = (e) => {
            const commandID = e.data;
            const command = this._find(commandID);
            if (command) {
                if (typeof command.action === 'function') command.action();
                this.emit(commandID, commandID);
            }
        };

        this._addEventListener(eventType, this._commandListener);
    }

    /**
     * Stop listening for command events
     */
    stop() {
        const eventType = `knights_of_the_editing_table.spellbook.api.${this.pluginID}.command.registered`;

        if (this._commandListener) {
            this._removeEventListener(eventType, this._commandListener);
            this._commandListener = null;
        }
    }

    /**
     * @private
     * @param {string} commandID
     * @returns {Command|undefined}
     */
    _find(commandID) {
        return this._commands && this._commands.find(c => c.commandID === commandID);
    }

    /**
     * @private
     * @param {string} type
     * @param {Function} listener
     */
    _addEventListener(type, listener) {
        if (typeof window !== 'undefined' && window.__adobe_cep__) {
            window.__adobe_cep__.addEventListener(type, listener);
        }
    }

    /**
     * @private
     * @param {string} type
     * @param {Function} [listener]
     */
    _removeEventListener(type, listener) {
        if (typeof window !== 'undefined' && window.__adobe_cep__) {
            window.__adobe_cep__.removeEventListener(type, listener);
        }
    }

    /**
     * @private
     * @param {string} type
     * @param {any} data
     */
    _dispatchEvent(type, data) {
        if (typeof window !== 'undefined' && window.__adobe_cep__) {
            window.__adobe_cep__.dispatchEvent({
                type,
                scope: "APPLICATION",
                appId: JSON.parse(window.__adobe_cep__.getHostEnvironment()).appId,
                extensionId: window.__adobe_cep__.getExtensionId(),
                data: JSON.stringify(data)
            })
        }
    }
}

module.exports = SpellBook; 