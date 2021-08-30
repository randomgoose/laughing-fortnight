import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';
import {Rnd} from 'react-rnd';
import {setScale} from '../features/chart/lineChartSlice';

export default function Canvas() {
    const {chartType} = useSelector((state: RootState) => state.app);
    const {scale} = useSelector((state: RootState) => state.line);
    const [height, setHeight] = React.useState('400px');
    const [width, setWidth] = React.useState('300px');
    const [x, setX] = React.useState(300);
    const [y, setY] = React.useState(300);
    const [hovering, setHovering] = React.useState(false);
    const dispatch = useDispatch();

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
        <div
            style={{
                height: '50%',
                flex: 1,
                backgroundColor: '#f2f2f2',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zoom: scale,
            }}
            onWheel={(e) => {
                dispatch(setScale(scale - e.deltaY * 0.001));
                console.log('clientX', e.clientX);
                console.log('clientY', e.clientY);
                console.log('deltaX', e.deltaX);
                console.log('deltaY', e.deltaY);
            }}
        >
            <Rnd
                className={'canvas'}
                resizeHandleClasses={{
                    left: `handle left-handle ${hovering ? 'on' : ''}`,
                    right: `handle right-handle ${hovering ? 'on' : ''}`,
                    top: `handle top-handle ${hovering ? 'on' : ''}`,
                    bottom: `handle bottom-handle ${hovering ? 'on' : ''}`,
                }}
                size={{
                    width: width,
                    height: height,
                }}
                position={{
                    x: x,
                    y: y,
                }}
                onResizeStop={(_e, _direction, ref, _delta, position) => {
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
                        width: '120%',
                        height: '120%',
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
    );
}
