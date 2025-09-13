declare module 'node-gtk' {
  export function require(name: string, version?: string): any;
  export function startLoop(): void;
}