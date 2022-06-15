import * as React from 'react';
import {ResponsiveLine} from '@nivo/line';
import {useImmerAtom} from 'jotai/immer';
import {LineState} from '../../atoms/lineAtomFamily';
import {PrimitiveAtom} from 'jotai';
import {useColorScheme} from '../../hooks';

export default function VisLineChart({initialState, atom}: {initialState?: LineState; atom: PrimitiveAtom<LineState>}) {
    const [{width, height, x, y, activeSerie, showXAxis, showYAxis, data, lines, ...rest}, setLine] =
        useImmerAtom(atom);

    const {colors} = useColorScheme(rest.colorSchemeId);

    React.useEffect(() => {
        if (initialState)
            setLine((line) => {
                Object.assign(line, initialState);
            });
    }, []);

    return (
        <ResponsiveLine
            {...rest}
            colors={colors}
            axisBottom={showXAxis ? rest.axisBottom : null}
            axisLeft={showYAxis ? rest.axisLeft : null}
            data={data.filter((datum) => lines.includes(datum.id))}
            isInteractive={true}
        />
    );
}
