//@ts-nocheck
import * as React from 'react';
import {ResponsivePie} from '@nivo/pie';
import StyledRnd from '../StyledComponents/StyledRnd';
import {useAtom} from 'jotai';
import {pieAtomFamily} from '../../atoms/pieAtomFamily';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {Rnd} from 'react-rnd';

export default function VisPieChart({id}: {id: string}) {
    const [pie, setPie] = useAtom(pieAtomFamily({id}));

    const {scale} = useSelector((state: RootState) => state.app);

    function onDragStop(_e, d) {
        setPie({...pie, x: d.x, y: d.y});
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setPie((pie) => {
            return {
                ...pie,
                width: parseFloat(ref.style.width),
                height: parseFloat(ref.style.height),
                x: position.x,
                y: position.y,
            };
        });
    }

    return (
        <StyledRnd
            scale={scale}
            width={pie.width}
            height={pie.height}
            x={pie.x}
            y={pie.y}
            onDragStop={onDragStop}
            onResize={onResize}
        >
            <ResponsivePie {...pie} />
            {/* <Rnd
                style={{ zIndex: -1 }}
                className={'h-full absolute top-1/2 transform -translate-y-2/4'}
                size={{
                    width: pie.width - pie.margin.left - pie.margin.right,
                    height: pie.height - pie.margin.top - pie.margin.bottom,
                }}
                resizeHandleComponent={
                    { left: <div className={'w-4 h-4 bg-white z-50 absolute'} style={{ zIndex: 9999 }}></div> }
                }
                position={{ x: pie.margin.left, y: pie.margin.top }}
                disableDragging
                onResizeStop={(_e, direction, _ref, delta, _position) => {
                    switch (direction) {
                        case 'right':
                            setPie({ ...pie, margin: { ...pie.margin, right: pie.margin.right - delta.width } })
                            break
                        case 'left':
                            setPie({ ...pie, margin: { ...pie.margin, left: pie.margin.left - delta.width } })
                            break
                        case 'top':
                            setPie({ ...pie, margin: { ...pie.margin, top: pie.margin.top - delta.height } })
                            break
                        case 'bottom':
                            setPie({ ...pie, margin: { ...pie.margin, bottom: pie.margin.bottom - delta.height } })
                            break
                    }
                }}
            /> */}
        </StyledRnd>
    );
}
