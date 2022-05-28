import {WindowSize} from '../app/atoms/appAtom';
import {getAllColorSchemes, saveColorScheme, saveColorSchemes} from './functions/color-scheme';
import {sendMessage} from './functions/message';
import {resizeWindow} from './functions/resize-window';
import {
    GET_ALL_COLOR_SCHEMES,
    RESIZE_WINDOW,
    SAVE_COLOR_SCHEME,
    SAVE_COLOR_SCHEMES,
    SELECTION_CHANGE,
} from './message-types';

figma.showUI(__html__);
figma.ui.resize(960, 800);

// Get all local color schemes on init.
getAllColorSchemes()
    .then((data) => {
        sendMessage(GET_ALL_COLOR_SCHEMES, data);
    })
    .catch((err) => {
        console.log(err);
    });

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
        return frame;
        // const chart = figma.createImage(Uint8Array.from(data))
        // frame.fills = [{ imageHash: chart.hash, type: 'IMAGE', scaleMode: 'FIT' }]
        // frame.resize(size.width, size.height)
        // return frame
    } else {
        return frame;
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
        case RESIZE_WINDOW:
            const size: WindowSize = msg.data.size;
            resizeWindow(size);
            break;
        case GET_ALL_COLOR_SCHEMES:
            const colorSchemes = await getAllColorSchemes();
            sendMessage(GET_ALL_COLOR_SCHEMES, colorSchemes);
            break;
        case SAVE_COLOR_SCHEMES:
            const {schemes} = msg.data;
            await saveColorSchemes(schemes);
            break;
        case SELECTION_CHANGE:
            figma.currentPage.selection;
            const {scheme} = msg.data;
            await saveColorScheme(scheme);
            break;
        case SAVE_COLOR_SCHEME:
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
