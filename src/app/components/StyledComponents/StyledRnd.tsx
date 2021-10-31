//@ts-nocheck
import * as React from 'react';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents';
import classNames from 'classnames';
import {useClickAway} from 'ahooks';
import {useAtom} from 'jotai';
import {appAtom} from '../../atoms/appAtom';

interface Props {
    children: React.ReactNode;
    width: number;
    height: number;
    x: number;
    y: number;
    scale: number;
    onResize: (e, direction, ref, delta, position) => void;
    onDragStop: (e, d) => void;
    onMouseDown?: () => void;
    style?: React.CSSProperties;
    className?: string;
    showHandles?: boolean;
}

const handles = ['top', 'topLeft', 'topRight', 'left', 'right', 'bottomLeft', 'bottom', 'bottomRight'];

export default function StyledRnd({
    children,
    width,
    height,
    x,
    y,
    scale,
    onMouseDown,
    onResize,
    onDragStop,
    className,
    style,
    showHandles,
}: Props) {
    const ref = React.useRef();
    const [, setApp] = useAtom(appAtom);

    useClickAway(() => {
        // if (showHandles) setApp(app => ({ ...app, activeKey: '' }))
    }, ref);

    function createHandle(handles: string[]) {
        const handleComponents = {};
        handles.map((handle) => {
            handleComponents[handle] = (
                <Handle
                    className={`Handle__${handle} bg-blue-600`}
                    pos={handle}
                    showHandles={showHandles}
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
                className={classNames(className, 'canvas relative')}
                style={style}
                onMouseDown={onMouseDown}
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
