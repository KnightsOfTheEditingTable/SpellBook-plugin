# Spell Book

A JavaScript library for creating Adobe CEP extensions that integrate with the Spell Book system. This module provides a clean interface for registering commands and handling shortcuts in Adobe applications.

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
        commandID: 'NotKnight.test',
        name: 'NotKnight Test',
        action: () => {
            alert('NotKnight Test')
        }
    }
];

const spellBook = new SpellBook('NotKnight', 'not.knight', commands);
```

### Advanced Usage

```javascript
import SpellBook from 'spell-book';

const spellBook = new SpellBook('My Extension', 'my.extension');

// Register commands later
spellBook.register([
    {
        commandID: 'my-command',
        name: 'My Command',
        action: () => {
            console.log('Command executed!');
        }
    }
]);

// Control listening
spellBook.stop();  // Stop listening for commands
spellBook.start(); // Start listening for commands

// Listen for events
spellBook.on('my-command', (commandID) => {
    console.log(`Command ${commandID} was triggered`);
});
```

### Command Interface

```javascript
/**
 * @typedef {Object} Command
 * @property {string} commandID - Unique identifier for the command
 * @property {string} name - Display name for the command
 * @property {string} [group] - Group the command belongs to
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
    commands?: Command[]
)
```

#### Methods

- `register(commands: Command[]): void` - Register or update commands
- `start(): void` - Start listening for command events
- `stop(): void` - Stop listening for command events

#### Events

The plugin extends EventEmitter and emits events when commands are triggered:

```javascript
spellBook.on('command-id', (commandID) => {
    // Handle command trigger
});
```

## Integration with Adobe CEP

This module is designed to work with Adobe CEP extensions and uses the native `window.__adobe_cep__` interface. Make sure your extension manifest includes the necessary permissions and that the Spell Book system is available in your Adobe application.

### Requirements

- Adobe CEP extension environment
- Spell Book system running in the Adobe application
- Node.js `events` module (included as dependency)

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 