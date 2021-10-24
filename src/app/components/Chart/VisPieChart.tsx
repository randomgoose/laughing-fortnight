import * as React from 'react';
import {ResponsivePie} from '@nivo/pie';
import StyledRnd from '../StyledComponents/StyledRnd';
import {useRecoilState} from 'recoil';
import {pieStateFamily} from '../../atoms/pieStateFamily';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';

export default function VisPieChart({id}: {id: string}) {
    const [pie, setPie] = useRecoilState(pieStateFamily(id));

    const {scale} = useSelector((state: RootState) => state.app);

    function onDragStop(_e, d) {
        setPie({...pie, x: d.x, y: d.y});
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setPie({
            ...pie,
            width: ref.style.width,
            height: ref.style.height,
            x: position.x,
            y: position.y,
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
            <ResponsivePie
                {...pie}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'c',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'go',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'python',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'scala',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'lisp',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'elixir',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'javascript',
                        },
                        id: 'lines',
                    },
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000',
                                },
                            },
                        ],
                    },
                ]}
            />
        </StyledRnd>
    );
}
