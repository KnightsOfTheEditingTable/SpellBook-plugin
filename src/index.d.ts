import { EventEmitter } from 'events';

export interface Command {
    commandID: string;
    name: string;
    group?: string;
    action?: (args?: any) => void;
}

declare class SpellBook extends EventEmitter {
    pluginName: string;
    pluginID: string;
    constructor(pluginName: string, pluginID: string, commands?: Command[]);
    register(commands: Command[]): void;
    start(): void;
    stop(): void;
}

export default SpellBook; 