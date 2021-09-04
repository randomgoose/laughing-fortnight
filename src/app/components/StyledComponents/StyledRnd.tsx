import {useHover} from 'ahooks';
import * as React from 'react';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents';

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
}

export default function StyledRnd({children, width, height, x, y, scale, onMouseDown, onResize, onDragStop}: Props) {
    const [hovering, setHovering] = React.useState(false);
    const ref = React.useRef();

    const enableHovering = React.useCallback(() => {
        setHovering(true);
    }, []);

    const isHovering = useHover(ref);

    React.useEffect(() => {
        setHovering(isHovering);
    }, [isHovering]);

    return (
        <div ref={ref}>
            <Rnd
                scale={scale}
                className={'canvas'}
                onMouseDown={onMouseDown}
                resizeHandleComponent={{
                    left: <Handle pos={'left'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                    right: <Handle pos={'right'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                    top: <Handle pos={'top'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                    bottom: <Handle pos={'bottom'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                }}
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
