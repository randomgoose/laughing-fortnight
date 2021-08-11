figma.showUI(__html__);
figma.ui.resize(800, 600);

figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case 'render-chart':
            const chart = figma.createNodeFromSvg(msg.svg);
            chart.setPluginData('chart-data', JSON.stringify(msg.config));
            figma.currentPage.appendChild(chart);
            break;
        case 'update-chart':
            if (figma.currentPage.selection[0].type === 'FRAME' && chart.getPluginData('chart-data').length > 0) {
                figma.currentPage.selection[0].children.forEach((child) => child.remove());
                const updatedChart = figma.createNodeFromSvg(msg.svg);
                figma.currentPage.selection[0].appendChild(updatedChart);
                figma.currentPage.selection[0].setPluginData('chart-data', JSON.stringify(msg.config));
                figma.currentPage.selection[0].resize(chart.width, chart.height);
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
    }
});
