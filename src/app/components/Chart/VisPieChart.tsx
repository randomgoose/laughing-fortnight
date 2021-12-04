import * as React from 'react';
import {DefaultRawDatum, ResponsivePie} from '@nivo/pie';
import StyledRnd from '../StyledComponents/StyledRnd';
import {pieAtomFamily, PieState} from '../../atoms/pieAtomFamily';
import {ComputedDatum} from '@nivo/bar';
import {useImmerAtom} from 'jotai/immer';
import {appAtom, Param} from '../../atoms/appAtom';
import DimensionIndicator from '../DimensionIndicator';
import {useTranslation} from 'react-i18next';
import {usePie} from '../../hooks/usePie';
import {Input, Heading, Button, Portal} from '@chakra-ui/react';
import _ from 'lodash';
import Widget from '../../widgets/Widget';

export default function VisPieChart({id, initialState}: Param & {initialState?: PieState}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const [app] = useImmerAtom(appAtom);
    const [activeArc, setActiveArc] =
        React.useState<Omit<ComputedDatum<DefaultRawDatum>, 'index' | 'indexValue'>>(null);
    const {t} = useTranslation();
    const {removeArcById, addArc, changeArcValueById, getValueById} = usePie(id);

    React.useEffect(() => {
        if (initialState)
            setPie((pie) => {
                Object.assign(pie, initialState);
            });
    }, []);

    function onDragStop(_e, d) {
        setPie((pie) => {
            pie.x = d.x;
            pie.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setPie((pie) => {
            pie.width = parseFloat(ref.style.width);
            pie.height = parseFloat(ref.style.height);
            pie.x = position.x;
            pie.y = position.y;
        });
    }

    return (
        <StyledRnd
            chartId={id}
            onMouseDown={() => {
                close();
            }}
            width={pie.width}
            height={pie.height}
            x={pie.x}
            y={pie.y}
            onDragStop={onDragStop}
            onResize={onResize}
            onClickAway={() => {
                close();
            }}
        >
            <ResponsivePie
                {...pie}
                onClick={(node, event) => {
                    console.log(node);
                    console.log(event);
                    setPosition({x: event.clientX, y: event.clientY});
                    open();
                    id === app.activeKey && setActiveArc(node);
                }}
                isInteractive={id === app.activeKey}
            />

            {id === app.activeKey ? <DimensionIndicator width={pie.width} height={pie.height} /> : null}
            {activeArc && (
                <Portal>
                    <Widget
                        position={position}
                        isOpen={isOpen}
                        title={activeArc.id}
                        onClose={() => {
                            close();
                        }}
                        content={
                            <div className={'flex flex-col gap-4'}>
                                <div className={'flex flex-col gap-1'}>
                                    <Heading as={'h5'}>{activeArc.id}</Heading>
                                    <Input
                                        value={getValueById(activeArc.id as string)}
                                        onKeyDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            e.nativeEvent.stopImmediatePropagation();

                                            if (!_.isNaN(parseFloat(e.target.value))) {
                                                changeArcValueById(activeArc.id as string, parseFloat(e.target.value));
                                            } else {
                                                changeArcValueById(activeArc.id as string, 0);
                                            }
                                        }}
                                        size={'sm'}
                                    />
                                </div>
                                <div className={'flex gap-1'}>
                                    <Button
                                        size={'sm'}
                                        colorScheme={'red'}
                                        onClick={() => {
                                            setActiveArc(null);
                                            removeArcById(activeArc.id as string);
                                        }}
                                    >
                                        {t('Remove') + ' ' + activeArc.id}
                                    </Button>
                                    <Button
                                        size={'sm'}
                                        onClick={() => {
                                            addArc();
                                        }}
                                    >
                                        {t('Add an arc')}
                                    </Button>
                                </div>
                            </div>
                        }
                    />
                </Portal>
            )}
        </StyledRnd>
    );
}
