import {Box} from '@chakra-ui/react';
import * as React from 'react';
import {CSSProperties} from 'react';

interface Props {
    width: number | string;
    height: number | string;
    style?: CSSProperties;
}

export default function DimensionIndicator({width, height}: Props) {
    return (
        <Box position={'absolute'} left={0} bottom={-5} className={'DimensionIndicator bg-blue-600 text-white px-2'}>
            {parseFloat(width.toString())} x {parseFloat(height.toString())}
        </Box>
    );
}
