# Spell Book

Spell Book is a support app to listen for a shortcut or a control surface button press in Adobe apps,
to trigger 3rd party extension commands.
This module provides an interface for registering commands and handling shortcuts in your Adobe extension.

## Installation

```bash
npm install spell-book
```

## Usage

### Basic Setup

```javascript
import SpellBook from 'spell-book';

const commands = [
    {
        commandID: 'command.id',
        name: 'Command 1', // use localised name if needed
        group: 'Group 1', // optional
        action: () => { // run action when command is triggered
            console.log('command.id triggered!')
        }
    }
];

const spellBook = new SpellBook('Extension name', 'extension.id', commands);
```

### Command Interface

```javascript
/**
 * @typedef {Object} Command
 * @property {string} commandID - Unique identifier for the command
 * @property {string} name - Display name for the command
 * @property {string?} group - Name of group the command belongs to
 * @property {(args?: any) => void} [action] - Function to execute when command is triggered
 */
```

## API Reference

### SpellBook

#### Constructor

```javascript
new SpellBook(
    pluginName: string,
    pluginID: string,
    commands?: Command[])
```

#### Methods

- `register(commands: Command[]): void` - Add or update commands
- `start(): void` - Start listening for command events
- `stop(): void` - Stop listening for command events

#### Events

The plugin extends EventEmitter and emits events when commands are triggered:

```javascript
spellBook.on('command-id', (commandID) => {
    console.log('command.id triggered!')
});
```

## Supported Adobe Hosts
- Premiere Pro
- After Effects
- Photoshop (CEP)
- Illustrator

## Integration with Adobe CEP

This module is designed to work with Adobe CEP extensions and uses the native `window.__adobe_cep__` interface.
Make sure that Spell Book is installed (both app and Spell Book extension).

## UXP support
UXP support will be added later.

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 