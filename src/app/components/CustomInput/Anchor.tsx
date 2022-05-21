import * as React from 'react';
import styled from 'styled-components';

const positions = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'];

interface Props {
    value?: string;
    onChange?: (position: string) => void;
}

const Point = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    background: none;

    ${(props) =>
        props.className.includes('left') ? `left: 0` : props.className.includes('right') ? `left: 100%` : `left: 50%`};
    ${(props) =>
        props.className.includes('top') ? `top: 0` : props.className.includes('bottom') ? `top: 100%` : `top: 50%`};

    transform: translate(-50%, -50%);
    cursor: pointer;

    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        width: 6px;
        height: 6px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${(props) => (props.selected ? '#00bcd4' : 'lightgray')};
    }

    &:hover::after {
        width: 8px;
        height: 8px;
        background: #00bcd4;
    }
`;

export default function Anchor({value, onChange}: Props) {
    const [activePoint, setActivePoint] = React.useState(value ? value : 'center');

    React.useEffect(() => {}, [activePoint]);

    return (
        <div className={'anchor relative w-14 h-14 border'}>
            {positions.map((position, index) => (
                <Point
                    key={index}
                    className={position}
                    onClick={() => {
                        setActivePoint(position);
                        onChange && onChange(position);
                    }}
                    selected={value && value === position}
                ></Point>
            ))}
        </div>
    );
}
