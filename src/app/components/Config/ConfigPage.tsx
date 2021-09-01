import * as React from 'react';
import {Space, Typography} from 'antd';

interface ConfigPageProps {
    children: React.ReactNode;
    title: string;
    icon: React.ReactNode;
}

export default function ConfigPage({children, title, icon}: ConfigPageProps) {
    return (
        <>
            <Typography.Title level={5}>
                <Space align={'center'} size={4}>
                    {icon}
                    {title}
                </Space>
            </Typography.Title>
            {children}
        </>
    );
}
