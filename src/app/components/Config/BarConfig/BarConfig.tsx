import * as React from 'react';
import {Form} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import Header from '../../Typography/Header';
import {setPartialState} from '../../../features/chart/barChartSlice';
import ConfigPage from '../ConfigPage';
import ColorPicker from '../../CustomInput/ColorPicker';
import {hexToRgb} from '../../../utils/hex-to-rgb';

export default function BarConfig() {
    const {data, activeIndex, activeDatum} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(activeDatum.color);
    }, [activeDatum]);

    return (
        <ConfigPage style={{padding: 12}}>
            <Header showReturnButton onReturn={() => dispatch(setPartialState({activeIndex: -1}))}>
                数据模拟
            </Header>
            <Form className={'BarConfig'}>
                {activeIndex >= 0 && data[activeIndex]
                    ? Object.keys(data[activeIndex]).map((key) => <div>{data[activeIndex][key]}</div>)
                    : null}
                <ColorPicker color={hexToRgb(activeDatum.color)} />
            </Form>
        </ConfigPage>
    );
}
