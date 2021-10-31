import * as React from 'react';
import {DefaultRawDatum, ResponsivePie} from '@nivo/pie';
import StyledRnd from '../StyledComponents/StyledRnd';
import {pieAtomFamily} from '../../atoms/pieAtomFamily';
// import { Menu } from 'antd'
import {ComputedDatum} from '@nivo/bar';
// import { useTranslation } from 'react-i18next'
import {useImmerAtom} from 'jotai/immer';
// import { usePie } from '../../hooks/usePie'
import {appAtom, Param} from '../../atoms/appAtom';
import PieWidget from '../Widgets/PieWidget';
import DimensionIndicator from '../DimensionIndicator';

export default function VisPieChart({id}: Param) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const [app, setApp] = useImmerAtom(appAtom);
    const [activeArc, setActiveArc] =
        React.useState<Omit<ComputedDatum<DefaultRawDatum>, 'index' | 'indexValue'>>(null);
    // const { t } = useTranslation()
    // const { addArc, removeArcById } = usePie(id)

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

    // const menu = (
    //     <Menu>
    //         <Menu.Item
    //             key="1"
    //             danger
    //             onClick={() => {
    //                 removeArcById(activeArc ? (activeArc.id as string) : '')
    //             }}
    //         >{`${t('Delete')} ${activeArc ? activeArc.id : ''}`}</Menu.Item>
    //         <Menu.Item key="2" onClick={addArc}>
    //             {t('Add row')}
    //         </Menu.Item>
    //     </Menu>
    // )

    return (
        <StyledRnd
            onMouseDown={() => {
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
        >
            {/* <Dropdown overlay={menu} trigger={['click']}> */}
            <ResponsivePie
                {...pie}
                onClick={(node, event) => {
                    console.log(node);
                    console.log(event);
                    id === app.activeKey && setActiveArc(node);
                }}
                isInteractive={id === app.activeKey}
            />
            {/* </Dropdown> */}

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
            <PieWidget id={id} visible={app.activeKey === id && activeArc !== null} activeArc={activeArc} />
            {id === app.activeKey ? <DimensionIndicator width={pie.width} height={pie.height} /> : null}
        </StyledRnd>
    );
}
