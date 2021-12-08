import {BarDatum, ResponsiveBar} from '@nivo/bar';
import * as React from 'react';
import StyledRnd from '../StyledComponents/StyledRnd';
import _ from 'lodash';
import {Param} from '../../atoms/appAtom';
import {BarState} from '../../atoms/barAtomFamily';
import {useDisclosure} from '@chakra-ui/hooks';
import {Portal} from '@chakra-ui/portal';
import Widget from '../../widgets/Widget';
import {ComputedDatum} from '@nivo/bar';
import {Heading} from '@chakra-ui/layout';
import {useBar} from '../../hooks/useBar';
import {InputNumber} from 'antd';

const VisBarChart = ({id, initialState}: Param & {initialState?: BarState}) => {
    const {bar, setBar, setData} = useBar(id);
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const [activeDatum, setActiveDatum] = React.useState<ComputedDatum<BarDatum>>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    function onDragStop(_e, d) {
        setBar((bar) => {
            bar.x = d.x;
            bar.y = d.y;
        });
    }

    React.useEffect(() => {
        if (initialState)
            setBar((bar) => {
                Object.assign(bar, initialState);
            });
    }, []);

    function onResize(_e, _direction, ref, _delta, position) {
        setBar((bar) => {
            bar.width = parseFloat(ref.style.width);
            bar.height = parseFloat(ref.style.height);
            bar.x = position.x;
            bar.y = position.y;
        });
    }

    return (
        <StyledRnd
            chartId={id}
            width={bar.width}
            height={bar.height}
            x={bar.x}
            y={bar.y}
            onDragStop={onDragStop}
            onResize={onResize}
        >
            <ResponsiveBar
                {...bar}
                axisBottom={bar.showXAxis && bar.axisBottom}
                axisLeft={bar.showYAxis && bar.axisLeft}
                onClick={(datum, event) => {
                    console.log(datum);
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
                                    value={activeDatum && activeDatum.value}
                                    onChange={(value) => {
                                        setData(activeDatum.index, activeDatum.id + '', value);
                                    }}
                                ></InputNumber>
                            </div>
                        }
                        title={activeDatum && `${activeDatum.indexValue}/${activeDatum.id}`}
                    />
                )}
            </Portal>
        </StyledRnd>
    );
};

export default VisBarChart;
