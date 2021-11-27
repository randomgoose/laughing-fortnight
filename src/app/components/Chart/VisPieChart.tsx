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
import {
    Input,
    Heading,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
} from '@chakra-ui/react';
import _ from 'lodash';

export default function VisPieChart({id, initialState}: Param & {initialState?: PieState}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const [app, setApp] = useImmerAtom(appAtom);
    const [activeArc, setActiveArc] =
        React.useState<Omit<ComputedDatum<DefaultRawDatum>, 'index' | 'indexValue'>>(null);
    const {t} = useTranslation();
    const {removeArcById, addArc, changeArcValueById, getValueById, getDatumById} = usePie(id);

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
            onMouseDown={() => {
                close();
                setApp((app) => ({...app, activeKey: id}));
            }}
            scale={app.scale}
            width={pie.width}
            height={pie.height}
            x={pie.x}
            y={pie.y}
            onDragStop={onDragStop}
            onResize={onResize}
            style={{background: id === app.activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
            showHandles={id === app.activeKey}
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

            {/* <Rnd
                style={{ zIndex: 50 }}
                className={'h-full absolute top-1/2 transform -translate-y-2/4'}
                size={{
                    width: pie.width - pie.margin.left - pie.margin.right,
                    height: pie.height - pie.margin.top - pie.margin.bottom,
                }}
                position={{ x: pie.margin.left, y: pie.margin.top }}
                disableDragging
                onResizeStop={(_e, direction, _ref, delta, _position) => {
                    switch (direction) {
                        case 'right':
                            setPie(() => ({ ...pie, margin: { ...pie.margin, right: pie.margin.right - delta.width } }))
                            break
                        case 'left':
                            setPie(() => ({ ...pie, margin: { ...pie.margin, left: pie.margin.left - delta.width } }))
                            break
                        case 'top':
                            setPie(() => ({ ...pie, margin: { ...pie.margin, top: pie.margin.top - delta.height } }))
                            break
                        case 'bottom':
                            setPie(() => ({ ...pie, margin: { ...pie.margin, bottom: pie.margin.bottom - delta.height } }))
                            break
                    }
                }}
            /> */}
            {id === app.activeKey ? <DimensionIndicator width={pie.width} height={pie.height} /> : null}
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={close}
                closeOnBlur={false}
                computePositionOnMount
                // strategy={'fixed'}
                // styleConfig={{ screenLeft: state.screenX, screenTop: state.screenY }}
            >
                {activeArc ? (
                    <PopoverContent
                        style={{top: position.y - pie.y, left: position.x - pie.x, position: 'absolute'}}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <PopoverArrow />
                        <PopoverHeader>{activeArc.id}</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
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
                                            console.log(getDatumById(activeArc.id as string));
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
                        </PopoverBody>
                    </PopoverContent>
                ) : null}
            </Popover>
        </StyledRnd>
    );
}
