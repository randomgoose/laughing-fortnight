export function sendMessage(type: string, data?: any): void {
    window.parent.postMessage(
        {
            pluginMessage: {
                type,
                data,
            },
        },
        '*'
    );
}
