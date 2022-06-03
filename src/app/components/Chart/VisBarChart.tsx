//@ts-nocheck
import {BarDatum, ResponsiveBar} from '@nivo/bar';
import * as React from 'react';
import _ from 'lodash';
import {BarState} from '../../atoms/barAtomFamily';
import {useDisclosure} from '@chakra-ui/hooks';
import {Portal} from '@chakra-ui/portal';
import Widget from '../../widgets/Widget';
import {ComputedDatum} from '@nivo/bar';
import {Heading} from '@chakra-ui/layout';
import {useBar} from '../../hooks/useBar';
import {InputNumber} from 'antd';
import {PrimitiveAtom, useAtom} from 'jotai';
import {colorSchemeFamily} from '../../atoms/colors';
import {IColorScheme} from '../../../types';

const VisBarChart = ({initialState, atom}: {initialState?: BarState; atom: PrimitiveAtom<BarState>}) => {
    const [bar] = useAtom(atom);
    const [colorScheme] = useAtom<IColorScheme | {scheme: string}>(colorSchemeFamily({id: bar.colorSchemeId}));
    const {setBar, setData} = useBar(bar.key);
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const [activeDatum, setActiveDatum] = React.useState<ComputedDatum<BarDatum> | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [colors, setColors] = React.useState<{scheme: string} | IColorScheme['colors']>(
        'scheme' in colorScheme ? colorScheme : colorScheme.colors
    );

    React.useEffect(() => {
        if (initialState)
            setBar((bar) => {
                Object.assign(bar, initialState);
            });
    }, []);

    React.useEffect(() => {
        if ('scheme' in colorScheme) {
            setColors(colorScheme);
        } else {
            setColors(colorScheme.colors);
        }
    }, [colorScheme, bar.colorSchemeId]);

    return (
        <>
            <ResponsiveBar
                {...bar}
                colors={colors}
                axisBottom={bar.showXAxis ? bar.axisBottom : null}
                axisLeft={bar.showYAxis ? bar.axisLeft : null}
                onClick={(datum, event) => {
                    setPosition({x: event.clientX, y: event.clientY});
                    setActiveDatum(datum);
                    onOpen();
                }}
            />
            <Portal>
                {activeDatum && (
                    <Widget
                        position={position}
                        isOpen={isOpen}
                        onClose={onClose}
                        content={
                            <div>
                                <Heading as={'h6'}>Value</Heading>
                                <InputNumber
                                    onKeyDown={(e) => e.stopPropagation()}
                                    value={activeDatum.value ? activeDatum.value : 0}
                                    onChange={(value) => {
                                        setData(activeDatum.index, activeDatum.id + '', value as number);
                                    }}
                                ></InputNumber>
                            </div>
                        }
                        title={activeDatum && `${activeDatum.indexValue}/${activeDatum.id}`}
                    />
                )}
            </Portal>
        </>
    );
};

export default VisBarChart;
