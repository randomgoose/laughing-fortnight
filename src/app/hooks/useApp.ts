import {useImmerAtom} from 'jotai/immer';
import {IColorScheme} from '../../types';
import {appAtom, AppState} from '../atoms/appAtom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {saveColorSchemes} from '../messages/color-scheme-messages';

export function useApp() {
    const [app, setApp] = useImmerAtom(appAtom);

    useDeepCompareEffect(() => {
        saveColorSchemes(app.colorSchemes);
    }, [app.colorSchemes]);

    function getCurrentChart() {
        const chart = app.charts.find((chart) => chart.id === app.activeKey);
        return chart;
    }

    function setPartialState(state: Partial<AppState>) {
        setApp((app) => Object.assign(app, state));
    }

    function renameColorScheme(id: string, name: string) {
        setApp((state) => {
            state.colorSchemes.find((scheme) => scheme.id === id).name = name;
        });
    }

    function setColors(id: string, colors: IColorScheme['colors']) {
        setApp((state) => {
            state.colorSchemes.find((scheme) => (scheme.id = id)).colors = colors;
        });
    }

    function addColorScheme(colorScheme: IColorScheme) {
        setApp((state) => {
            state.colorSchemes.push(colorScheme);
        });
    }

    const addColor = (schemeId: string, color: string) => {
        setApp((state) => {
            const scheme = state.colorSchemes.find((scheme) => scheme.id === schemeId);
            scheme.colors.push(color);
        });
    };

    const setColor = (schemeId: string, colorIndex: number, color: string) => {
        setApp((state) => {
            const scheme = state.colorSchemes.find((scheme) => scheme.id === schemeId);
            scheme.colors[colorIndex] = color;
        });
    };

    const removeColor = (schemeId: string, colorIndex: number) => {
        setApp((state) => {
            const scheme = state.colorSchemes.find((scheme) => scheme.id === schemeId);
            scheme.colors.splice(colorIndex, 1);
        });
    };

    const setActiveColorSchemeId = (id: string) => {
        setApp((state) => {
            state.activeColorSchemeId = id;
        });
    };

    const setColorSchemeName = (schemeId: string, name: string) => {
        setApp((state) => {
            const scheme = state.colorSchemes.find((scheme) => scheme.id === schemeId);
            scheme.name = name;
        });
    };

    return {
        app,
        getCurrentChart,
        setPartialState,
        renameColorScheme,
        setColors,
        addColorScheme,
        addColor,
        setColor,
        setActiveColorSchemeId,
        setColorSchemeName,
        removeColor,
    };
}
