import * as React from 'react';
import {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';

interface Props {
    width: number;
    height: number;
    style?: CSSProperties;
}

export default function DimensionIndicator({width, height, style}: Props) {
    const {t} = useTranslation();

    return (
        <div style={style}>
            <span style={{marginRight: 8}}>
                {t('Width')}: {width}
            </span>
            <span>
                {t('Width')}: {height}
            </span>
        </div>
    );
}
