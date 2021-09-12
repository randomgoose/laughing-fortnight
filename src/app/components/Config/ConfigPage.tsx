import * as React from 'react';
import {Space, Typography} from 'antd';
import {CSSProperties} from 'react';

interface ConfigPageProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    style?: CSSProperties;
}

export default function ConfigPage({children, title, icon, style}: ConfigPageProps) {
    return (
        <div className={'ConfigPage'} style={style}>
            <Typography.Title level={5}>
                {title && (
                    <Space align={'center'} size={4}>
                        {icon}
                        {title}
                    </Space>
                )}
            </Typography.Title>
            {children}
        </div>
    );
}
