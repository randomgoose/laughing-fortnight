import {WindowSize} from '../../app/atoms/appAtom';

export function resizeWindow(size: WindowSize) {
    switch (size) {
        case 'sm':
            figma.ui.resize(960, 800);
            break;
        case 'md':
            figma.ui.resize(1024, 960);
            break;
        case 'lg':
            figma.ui.resize(1280, 1024);
            break;
        default:
            figma.ui.resize(960, 800);
    }
}
