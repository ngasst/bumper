import { patch } from './patch';
import { minor } from './minor';
import { major } from './major';

export let bumpers: ((path: string) => Promise<boolean>)[] =  [patch, minor, major];