import * as React from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Space, Button, Collapse, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveSerie} from '../../../features/chart/lineChartSlice';
import Label from '../../Typography/Label';
import {useClickAway} from 'ahooks';
import {RootState} from '../../../redux/store';
import {SketchPicker} from 'react-color';
import CollapsePanel from '../../StyledComponents/StyledCollapsePanel';

export default function () {
    const dispatch = useDispatch();
    const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
    const ref = React.useRef(null);
    const {activeSerie} = useSelector((state: RootState) => state.line);

    useClickAway(() => {
        setDisplayColorPicker(false);
    }, ref);

    return (
        <>
            <Space style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold'}}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type={'text'}
                    size={'small'}
                    onClick={() => {
                        dispatch(setActiveSerie(null));
                    }}
                ></Button>
                Line
            </Space>
            <Collapse ghost accordion style={{background: 'white', padding: 0}}>
                <CollapsePanel header={'Basic'} key={'basic'}>
                    <Label>Key</Label>
                    <Input disabled value={activeSerie} />
                    <div ref={ref}>
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
                </CollapsePanel>
            </Collapse>
        </>
    );
}
