figma.showUI(__html__);
figma.ui.resize(800, 600);

function createChart(frame: FrameNode, svg): FrameNode {
    const chart = figma.createNodeFromSvg(svg);
    frame.appendChild(chart);
    frame.resize(chart.width, chart.height);
    frame.name = 'chart';
    return frame;
}

function saveChartConfig(node: FrameNode, config) {
    node.setPluginData('chart-data', JSON.stringify(config));
}

figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case 'render-chart':
            const selection = figma.currentPage.selection;
            if (selection[0] && selection[0].type === 'FRAME') {
                const chart = createChart(selection[0], msg.svg);
                saveChartConfig(chart, msg.config);
            }
            break;
        default:
            console.log(msg.type);
    }
};

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length === 1) {
        const item = figma.currentPage.selection[0];
        if (item.getPluginData('chart-data')) {
            figma.ui.postMessage({type: 'get-chart-data', data: item.getPluginData('chart-data')});
        }
        figma.ui.postMessage({
            type: 'set-selection',
            data: figma.currentPage.selection[0] ? figma.currentPage.selection[0].id : '',
        });
    } else {
        figma.ui.postMessage({
            type: 'set-selection',
            data: '',
        });
    }
});
