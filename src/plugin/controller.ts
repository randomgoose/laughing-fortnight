import {sendMessage} from './functions/message';

figma.showUI(__html__);
figma.ui.resize(960, 800);

function createChart(frame: FrameNode, render: 'canvas' | 'svg', data): FrameNode {
    if (render === 'svg') {
        data.map((datum) => {
            const chart = figma.createNodeFromSvg(datum.svg);
            chart.x = datum.position.x;
            chart.y = datum.position.y;
            frame.appendChild(chart);
            // frame.resize(size.width, size.height)
        });
        frame.name = 'chart';
        return frame;
    } else if (render === 'canvas') {
        // const chart = figma.createImage(Uint8Array.from(data))
        // frame.fills = [{ imageHash: chart.hash, type: 'IMAGE', scaleMode: 'FIT' }]
        // frame.resize(size.width, size.height)
        // return frame
    }
}

figma.ui.onmessage = async (msg) => {
    switch (msg.type) {
        case 'render-chart':
            const selection = figma.currentPage.selection;
            if (selection[0] && selection[0].type === 'FRAME') {
                createChart(selection[0], msg.render, msg.data);
            }
            break;
        default:
            console.log(msg.type);
    }
};

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length === 1) {
        sendMessage('set-selection', figma.currentPage.selection[0] ? figma.currentPage.selection[0].id : '');
    } else {
        sendMessage('set-selection', '');
    }
});
