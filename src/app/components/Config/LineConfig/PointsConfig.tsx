import {Space, Slider} from 'antd';
import * as React from 'react';

export default function PointsConfig() {
    return (
        <Space>
            <Slider min={1} max={20} />
        </Space>
    );
}
