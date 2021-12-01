import * as React from 'react';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents';
import classNames from 'classnames';
import {useClickAway} from 'ahooks';
import {useAtom} from 'jotai';
import {appAtom} from '../../atoms/appAtom';
import DimensionIndicator from '../DimensionIndicator';

interface Props {
    chartId: string;
    children: React.ReactNode;
    width: number;
    height: number;
    x: number;
    y: number;
    onResize: (e, direction, ref, delta, position) => void;
    onDragStop: (e, d) => void;
    onMouseDown?: () => void;
    className?: string;
    onClickAway?: () => void;
}

const handles = ['top', 'topLeft', 'topRight', 'left', 'right', 'bottomLeft', 'bottom', 'bottomRight'];

export default function StyledRnd({
    children,
    width,
    height,
    x,
    y,
    onMouseDown,
    onResize,
    onDragStop,
    className,
    onClickAway,
    chartId,
}: Props) {
    const ref = React.useRef();
    const [{activeKey, scale}, setApp] = useAtom(appAtom);

    useClickAway(() => {
        // if (showHandles) setApp(app => ({ ...app, activeKey: '' }))
        onClickAway && onClickAway();
    }, ref);

    function createHandle(handles: string[]) {
        const handleComponents = {};
        handles.map((handle) => {
            handleComponents[handle] = (
                <Handle
                    className={`Handle__${handle} bg-blue-600`}
                    pos={handle}
                    showHandles={activeKey === chartId}
                    scale={scale}
                />
            );
        });
        return handleComponents;
    }

    return (
        <div ref={ref}>
            <Rnd
                scale={scale}
                className={classNames(className, 'chart-box relative')}
                style={{background: chartId === activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
                onMouseDown={() => {
                    onMouseDown();
                    setApp((app) => ({...app, activeKey: chartId}));
                }}
                resizeHandleComponent={createHandle(handles)}
                size={{
                    width: width,
                    height: height,
                }}
                position={{
                    x: x,
                    y: y,
                }}
                onResize={onResize}
                onDragStop={onDragStop}
            >
                {children}
                {chartId === activeKey ? <DimensionIndicator width={width} height={height} /> : null}
            </Rnd>
        </div>
    );
}

// {
//     left: <Handle pos={'left'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
//     right: <Handle pos={'right'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
//     top: <Handle pos={'top'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
//     bottom: <Handle pos={'bottom'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
//     topLeft: <Handle pos={'top_left'} scale={scale} hovering={hovering} onMouseOver={enableHovering} />,
// }
