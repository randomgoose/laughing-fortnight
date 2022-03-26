import {GET_ALL_COLOR_SCHEMES, SAVE_COLOR_SCHEMES} from '../../plugin/message-types';
import {IColorScheme} from '../../types';

export const getAllColorSchemes = () => {
    return window.parent.postMessage(
        {
            pluginMessage: {
                type: GET_ALL_COLOR_SCHEMES,
            },
        },
        '*'
    );
};

export const saveColorSchemes = (schemes: IColorScheme[]) => {
    return window.parent.postMessage(
        {
            pluginMessage: {
                type: SAVE_COLOR_SCHEMES,
                data: {schemes},
            },
        },
        '*'
    );
};
