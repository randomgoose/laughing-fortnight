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
import {ConfigProvider, Button} from 'antd';
import {useDispatch} from 'react-redux';
// import {loadState} from './features/chart/lineChartSlice';
import {addSnapshot, removeSnapshotById, setSelectionId, setSnapshots} from './features/app/appSlice';

function App() {
    const {chartType, hideInterface, selectionId} = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    function renderChart() {
        window.parent.postMessage(
            {
                pluginMessage: {
                    type: 'render-chart',
                    svg: `<svg xmlns="http://www.w3.org/2000/svg">${
                        document.querySelector('.canvas').querySelector('svg').innerHTML
                    }</svg>`.replace(/transparent/g, '#ffffff'),
                    // config: chartConfig,
                },
            },
            '*'
        );
    }

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
                case 'load-snapshots':
                    dispatch(setSnapshots(data));
                    break;
                case 'save-snapshot':
                    dispatch(addSnapshot(data));
                    break;
                case 'delete-snapshot':
                    dispatch(removeSnapshotById(data.id));
                    break;
                default:
            }
        };
    }, []);

    return (
        <ConfigProvider componentSize={'small'}>
            <div className={'App'} style={{width: '100%', height: '100%', display: 'flex'}}>
                {!hideInterface ? <SideBar /> : null}
                <div
                    className={'App__content'}
                    style={{
                        display: 'flex',
                        position: 'relative',
                        width: '100%',
                        flexDirection: 'column',
                        flexGrow: 1,
                        borderRight: '1px solid rgba(0, 0, 0, .1)',
                        overflow: 'hidden',
                        background: '#f2f2f2',
                    }}
                >
                    <Canvas />
                    {!hideInterface ? <Gallery /> : null}
                </div>
                {!hideInterface && chartType === 'line' ? (
                    <LineConfig />
                ) : !hideInterface && chartType === 'pie' ? (
                    <PieConfig />
                ) : !hideInterface && chartType === 'bar' ? (
                    <BarConfig />
                ) : null}
                <Button
                    style={{
                        position: 'fixed',
                        bottom: '48px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 10px 10px rgba(0, 0, 0, .1)',
                        fontSize: 16,
                        lineHeight: 24,
                    }}
                    type={'primary'}
                    size={'large'}
                    onClick={renderChart}
                    shape={'round'}
                    disabled={!(selectionId.length > 0)}
                >
                    {selectionId.length > 0 ? '渲染图表' : '未选择 Frame'}
                </Button>
            </div>
        </ConfigProvider>
    );
}

export default App;
