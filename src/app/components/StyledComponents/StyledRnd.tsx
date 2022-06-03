import * as React from 'react';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents';
import classNames from 'classnames';
import {useClickAway} from 'react-use';
import {atom, useAtom} from 'jotai';
import {appAtom} from '../../atoms/appAtom';
import DimensionIndicator from '../DimensionIndicator';
import {selectChartAtom, selectedChartAtom} from '../../atoms/selection';

interface Props {
    chartId: string;
    children: React.ReactNode;
    width: number;
    height: number;
    x: number;
    y: number;
    onResize: (e, direction, ref, delta, position) => void;
    onResizeStop?: (e, direction, ref, delta, position) => void;
    onDragStop: (e, d) => void;
    onMouseDown?: () => void;
    className?: string;
    onClickAway?: () => void;
    tools?: React.ReactNode;
    atom?: any;
}

const handles = ['top', 'topLeft', 'topRight', 'left', 'right', 'bottomLeft', 'bottom', 'bottomRight'];

const activeKeyAtom = atom((get) => {
    const atom = get(selectedChartAtom);
    if (atom) {
        return get(atom).key;
    } else {
        return null;
    }
});

export default function StyledRnd({
    children,
    width,
    height,
    x,
    y,
    onMouseDown,
    onResize,
    onDragStop,
    onResizeStop,
    className,
    onClickAway,
    chartId,
    tools,
    atom,
}: Props) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [{scale}] = useAtom(appAtom);
    const [, select] = useAtom(selectChartAtom);
    const [] = useAtom(selectedChartAtom);
    const [activeKey] = useAtom(activeKeyAtom);

    useClickAway(ref, () => {
        // if (showHandles) setApp(app => ({ ...app, activeKey: '' }))
        onClickAway && onClickAway();
    });

    function createHandle(handles: string[]) {
        const handleComponents = {};
        handles.map((handle) => {
            handleComponents[handle] = (
                <Handle
                    className={`Handle__${handle} bg-blue-600`}
                    pos={handle}
                    showHandles={activeKey && chartId === activeKey}
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
                style={{background: activeKey && chartId === activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
                onMouseDown={() => {
                    onMouseDown && onMouseDown();
                    atom && select(atom);
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
                onResizeStop={onResizeStop}
            >
                {children}
                {activeKey && chartId === activeKey ? <DimensionIndicator width={width} height={height} /> : null}
                {tools && tools}
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
