import {LeftOutlined} from '@ant-design/icons';
import {Space, Button} from 'antd';
import * as React from 'react';

interface IHeader {
    onReturn?: () => void;
    showReturnButton?: boolean;
    children: React.ReactNode;
}

export default function Header({children, onReturn, showReturnButton}: IHeader) {
    return (
        <Space style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold', marginBottom: 8}} align={'center'}>
            {showReturnButton ? (
                <Button icon={<LeftOutlined />} type={'text'} size={'small'} onClick={onReturn}></Button>
            ) : null}
            {children}
        </Space>
    );
}
