import {IColorScheme} from '../../types';

export async function getAllColorSchemes(): Promise<IColorScheme[]> {
    const colorSchemes: IColorScheme[] = await figma.clientStorage.getAsync('cm-color-schemes');

    if (colorSchemes && colorSchemes.length > 0) {
        return colorSchemes;
    } else {
        return [];
    }
}

export async function saveColorSchemes(schemes: IColorScheme[]) {
    try {
        await figma.clientStorage.setAsync('cm-color-schemes', schemes);
        return schemes;
    } catch (err) {
        console.error(err);
    }
}

export async function saveColorScheme(scheme: IColorScheme) {
    try {
        await figma.clientStorage.setAsync(`cm-color-scheme/${scheme.id}`, scheme);
        return scheme;
    } catch (err) {
        console.error(err);
    }
}

export async function addColorScheme(scheme: IColorScheme) {
    const colorSchemes: IColorScheme[] = await figma.clientStorage.getAsync('cm-color-schemes');

    if (colorSchemes) {
        colorSchemes.push(scheme);
        await figma.clientStorage.setAsync('cm-color-schemes', colorSchemes);

        return colorSchemes;
    }
}
