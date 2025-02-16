export {};

declare global {
    interface Window {
        api: {
            ready: boolean;
            invoke(channel: string, data?: unknown): Promise<unknown>;
            on(channel: string, callback: (...args: unknown[]) => void): void;
        }
        electron: {
            startDrag(): void;
        }
    }
}