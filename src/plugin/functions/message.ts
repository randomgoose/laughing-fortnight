export const sendMessage = (type: string, data: any): void => {
    figma.ui.postMessage({
        type,
        data,
    });
};
