import {Form, Slider, Switch} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setEnablePoints, setPointSize} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import Label from '../../Typography/Label';

export default function PointsConfig() {
    const dispatch = useDispatch();
    const {pointSize, enablePoints} = useSelector((state: RootState) => state.line);
    return (
        <Form
            layout={'vertical'}
            initialValues={{'point-size': pointSize, 'enable-points': enablePoints}}
            onFieldsChange={(changedField) => {
                const {name, value} = changedField[0];
                switch (name[0]) {
                    case 'point-size':
                        dispatch(setPointSize(value));
                        break;
                    case 'enable-points':
                        dispatch(setEnablePoints(value));
                        break;
                }
            }}
        >
            <Form.Item
                name={'enable-points'}
                label={<Label>启用数据点</Label>}
                fieldKey={'enable-points'}
                valuePropName={'checked'}
            >
                <Switch size={'small'}></Switch>
            </Form.Item>
            <Form.Item name={'point-size'} label={<Label>数据点尺寸</Label>}>
                <Slider min={1} max={20} />
            </Form.Item>
        </Form>
    );
}
