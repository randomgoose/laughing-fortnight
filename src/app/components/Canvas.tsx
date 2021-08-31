import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents/StyledComponents';

export default function Canvas() {
    const {chartType} = useSelector((state: RootState) => state.app);
    const {scale} = useSelector((state: RootState) => state.line);
    const [height, setHeight] = React.useState('400px');
    const [width, setWidth] = React.useState('300px');
    const [x, setX] = React.useState(300);
    const [y, setY] = React.useState(100);
    const [hovering, setHovering] = React.useState(false);

    function enableHovering() {
        setHovering(true);
    }

    let chart = <VisLineChart />;

    switch (chartType) {
        case 'line':
            chart = <VisLineChart />;
            break;
        case 'pie':
            chart = <VisPieChart />;
            break;
        default:
            chart = <VisLineChart />;
    }

    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div
                style={{
                    height: '50%',
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${scale})`,
                }}
            >
                <Rnd
                    scale={scale}
                    className={'canvas'}
                    resizeHandleComponent={{
                        left: <Handle pos={'left'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                        right: <Handle pos={'right'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                        top: <Handle pos={'top'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />,
                        bottom: (
                            <Handle pos={'bottom'} hovering={hovering} onMouseOver={enableHovering} scale={scale} />
                        ),
                    }}
                    size={{
                        width: width,
                        height: height,
                    }}
                    position={{
                        x: x,
                        y: y,
                    }}
                    onResize={(_e, _direction, ref, delta, position) => {
                        console.log(delta);
                        setHeight(ref.style.height);
                        setWidth(ref.style.width);
                        setX(position.x);
                        setY(position.y);
                    }}
                    onDragStop={(_e, d) => {
                        setX(d.x);
                        setY(d.y);
                    }}
                >
                    {chart}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        onMouseOver={() => {
                            setHovering(true);
                        }}
                        onMouseOut={() => {
                            setHovering(false);
                        }}
                    ></div>
                </Rnd>
            </div>
            <div style={{position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)'}}>
                宽度：{width}，高度：{height}
            </div>
        </div>
    );
}
