import * as React from 'react';
import styled from 'styled-components';

const positions = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'];

interface Props {
    value?: string;
    onChange?: (position: string) => void;
}

const Point = styled.div`
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    background-color: lightgray;

    ${(props) =>
        props.className.includes('left') ? `left: 0` : props.className.includes('right') ? `left: 100%` : `left: 50%`};
    ${(props) =>
        props.className.includes('top') ? `top: 0` : props.className.includes('bottom') ? `top: 100%` : `top: 50%`};
    transform: translate(-50%, -50%);
    cursor: pointer;

    &:hover {
        background: red;
    }
`;

export default function Anchor({value, onChange}: Props) {
    const [activePoint, setActivePoint] = React.useState(value ? value : 'center');

    React.useEffect(() => {
        console.log(activePoint);
    }, [activePoint]);

    return (
        <div
            className={'anchor'}
            style={{
                position: 'relative',
                width: 60,
                height: 60,
                border: '1px solid lightgray',
            }}
        >
            {positions.map((position, index) => (
                <Point
                    key={index}
                    className={position}
                    onClick={() => {
                        setActivePoint(position);
                        onChange(position);
                    }}
                    style={{
                        background: value && position === value ? 'blue' : 'lightgray',
                    }}
                ></Point>
            ))}
        </div>
    );
}
