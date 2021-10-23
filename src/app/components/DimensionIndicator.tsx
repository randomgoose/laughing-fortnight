import * as React from 'react';
import {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';

interface Props {
    width: number;
    height: number;
    style?: CSSProperties;
}

export default function DimensionIndicator({width, height}: Props) {
    const {t} = useTranslation();
    return (
        <div className={'DimensionIndicator absolute top-6 left-2/4 transform -translate-x-1/2 -translate-y-1/2'}>
            <span className={'mr-2'}>
                {t('Width')}: <span className={'font-bold'}>{width}</span>
            </span>
            <span>
                {t('Height')}: <span className={'font-bold'}>{height}</span>
            </span>
        </div>
    );
}
