import {sendMessage} from './functions/message';
import {editSnapshotById, loadSnapshots, removeSnapshotById, saveSnapshot} from './functions/snapshots';

figma.showUI(__html__);
figma.ui.resize(800, 600);

function createChart(
    frame: FrameNode,
    render: 'canvas' | 'svg',
    data,
    size: {width: number; height: number}
): FrameNode {
    if (render === 'svg') {
        const chart = figma.createNodeFromSvg(data);
        frame.appendChild(chart);
        frame.resize(size.width, size.height);
        frame.name = 'chart';
        return frame;
    } else if (render === 'canvas') {
        const chart = figma.createImage(Uint8Array.from(data));
        frame.fills = [{imageHash: chart.hash, type: 'IMAGE', scaleMode: 'FIT'}];
        frame.resize(size.width, size.height);
        return frame;
    }
}

function saveChartConfig(node: FrameNode, config) {
    node.setPluginData('chart-data', JSON.stringify(config));
}

figma.ui.onmessage = async (msg) => {
    switch (msg.type) {
        case 'render-chart':
            const selection = figma.currentPage.selection;
            if (selection[0] && selection[0].type === 'FRAME') {
                const chart = createChart(selection[0], msg.render, msg.data, msg.size);
                saveChartConfig(chart, msg.config);
            }
            break;
        case 'load-snapshots':
            sendMessage('load-snapshots', await loadSnapshots());
            break;
        case 'save-snapshot':
            sendMessage('save-snapshot', await saveSnapshot(msg.data));
            break;
        case 'delete-snapshot':
            sendMessage('delete-snapshot', await removeSnapshotById(msg.data));
            break;
        case 'edit-snapshot':
            sendMessage('edit-snapshot', await editSnapshotById(msg.data));
        default:
            console.log(msg.type);
    }
};

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length === 1) {
        const item = figma.currentPage.selection[0];
        if (item.getPluginData('chart-data')) {
            sendMessage('get-chart-data', item.getPluginData('chart-data'));
        }
        sendMessage('set-selection', figma.currentPage.selection[0] ? figma.currentPage.selection[0].id : '');
    } else {
        sendMessage('set-selection', '');
    }
});
