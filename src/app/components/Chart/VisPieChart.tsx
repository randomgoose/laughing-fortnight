import * as React from 'react';
import {DefaultRawDatum, ResponsivePie} from '@nivo/pie';
import {PieState} from '../../atoms/pieAtomFamily';
import {ComputedDatum} from '@nivo/pie';
import {useImmerAtom} from 'jotai/immer';
import {appAtom} from '../../atoms/appAtom';
import DimensionIndicator from '../DimensionIndicator';
import {useTranslation} from 'react-i18next';
import {usePie} from '../../hooks/usePie';
import {Input, Heading, Button, Portal, useDisclosure} from '@chakra-ui/react';
import _ from 'lodash';
import Widget from '../../widgets/Widget';
import {PrimitiveAtom, useAtom} from 'jotai';

export default function VisPieChart({atom, initialState}: {initialState?: PieState; atom: PrimitiveAtom<PieState>}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const [pie] = useAtom(atom);
    const {setPie} = usePie(pie.key);
    const [app] = useImmerAtom(appAtom);
    const [activeArc, setActiveArc] = React.useState<ComputedDatum<
        DefaultRawDatum & {
            label: string;
        }
    > | null>(null);
    const {t} = useTranslation();
    const {removeArcById, addArc, changeArcValueById, getValueById, changeId, getDatumById} = usePie(pie.key);

    React.useEffect(() => {
        if (initialState)
            setPie((pie) => {
                Object.assign(pie, initialState);
            });
    }, []);

    return (
        <>
            <ResponsivePie
                {...pie}
                onClick={(node, event) => {
                    setPosition({x: event.clientX, y: event.clientY});
                    onOpen();
                    pie.key === app.activeKey && setActiveArc(node);
                }}
                isInteractive={pie.key === app.activeKey}
            />

            {pie.key === app.activeKey ? <DimensionIndicator width={pie.width} height={pie.height} /> : null}
            {activeArc && (
                <Portal>
                    <Widget
                        position={position}
                        isOpen={isOpen}
                        title={activeArc.id}
                        onClose={onClose}
                        content={
                            <div className={'flex flex-col gap-4'}>
                                <div className={'flex flex-col gap-1'}>
                                    <Heading as={'h5'}>{'Label'}</Heading>
                                    <Input
                                        className={'mb-2'}
                                        value={getDatumById(activeArc.id + '')?.label}
                                        onKeyDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            // e.nativeEvent.stopImmediatePropagation()
                                            changeId(activeArc.id + '', e.target.value);
                                        }}
                                        size={'sm'}
                                    />

                                    <Heading as={'h5'}>{t('Value')}</Heading>
                                    <Input
                                        value={getValueById(activeArc.id + '')}
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
        </>
    );
}
