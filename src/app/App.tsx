import * as React from 'react';
import './styles/ui.css';
import SideBar from './components/Sidebar';
import Canvas from './components/Canvas';
import LineConfig from './components/Config/LineConfig/Config';
import Gallery from './components/Gallery';
import PieConfig from './components/Config/PieConfig/Config';
import BarConfig from './components/Config/BarConfig/Config';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
import {ConfigProvider} from 'antd';
import {useDispatch} from 'react-redux';
// import {loadState} from './features/chart/lineChartSlice';
import {setSelectionId} from './features/app/appSlice';
import {setScale} from './features/chart/lineChartSlice';

function App() {
    const {chartType} = useSelector((state: RootState) => state.app);
    const {scale} = useSelector((state: RootState) => state.line);
    const dispatch = useDispatch();

    React.useEffect(() => {
        window.onmessage = async (e: {
            data: {pluginMessage: PromiseLike<{type: any; data: any}> | {type: any; data: any}};
        }) => {
            const {type, data} = await e.data.pluginMessage;
            switch (type) {
                case 'get-chart-data':
                    // dispatch(loadState(JSON.parse(data)));
                    break;
                case 'set-selection':
                    dispatch(setSelectionId(data));
                    break;
                default:
                    console.log(data);
            }
        };
    }, []);

    return (
        <ConfigProvider componentSize={'small'}>
            <div className={'App'} style={{width: '100%', height: '100%', display: 'flex'}}>
                <SideBar />
                <div
                    className={'App__content'}
                    style={{
                        display: 'flex',
                        position: 'relative',
                        width: '100%',
                        flexDirection: 'column',
                        flexGrow: 1,
                        maxWidth: 1200,
                        borderRight: '1px solid rgba(0, 0, 0, .1)',
                        overflow: 'hidden',
                        background: '#f2f2f2',
                    }}
                    onWheel={(e) => {
                        if (scale > 0.1) dispatch(setScale(scale - e.deltaY * 0.002));
                    }}
                >
                    <Canvas />
                    <Gallery />
                </div>
                {chartType === 'line' ? (
                    <LineConfig />
                ) : chartType === 'pie' ? (
                    <PieConfig />
                ) : chartType === 'bar' ? (
                    <BarConfig />
                ) : (
                    <div />
                )}
            </div>
        </ConfigProvider>
    );
}

export default App;
