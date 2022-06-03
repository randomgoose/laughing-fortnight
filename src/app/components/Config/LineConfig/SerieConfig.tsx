//@ts-nocheck

import * as React from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Space, Button, Form, Input} from 'antd';
import Label from '../../Typography/Label';
import {useClickAway} from 'react-use';
import {SketchPicker} from 'react-color';

export default function () {
    const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
    const ref = React.useRef(null);
    const {activeSerie} = useSelector((state: RootState) => state.line);

    useClickAway(ref, () => {
        setDisplayColorPicker(false);
    });

    return (
        <div style={{padding: 12}}>
            <Space style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold'}}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type={'text'}
                    size={'small'}
                    onClick={() => {
                        dispatch(setActiveSerie(null));
                    }}
                ></Button>
                Line {activeSerie}
            </Space>
            <Form>
                <Form.Item label={'Key'} name={'key'}>
                    <Input disabled value={activeSerie} />
                </Form.Item>
            </Form>

            <Label>Key</Label>

            <Label>Color</Label>
            <Button onClick={() => setDisplayColorPicker(true)} block>
                <div
                    style={{
                        width: '100%',
                        height: 16,
                        borderRadius: 2,
                    }}
                ></div>
            </Button>
            {displayColorPicker ? <SketchPicker /> : null}
        </div>
    );
}
