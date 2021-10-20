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
import {addSnapshot, editSnapshotById, removeSnapshotById, setSelectionId, setSnapshots} from './features/app/appSlice';
import {useTranslation} from 'react-i18next';
import 'tailwindcss/tailwind.css';

function App() {
    const {chartType, hideInterface, selectionId} = useSelector((state: RootState) => state.app);
    const {line, bar} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    function renderChart(render: 'canvas' | 'svg', size: {width: number; height: number}) {
        if (render === 'svg') {
            window.parent.postMessage(
                {
                    pluginMessage: {
                        type: 'render-chart',
                        render: 'svg',
                        data: `<svg xmlns="http://www.w3.org/2000/svg">${
                            document.querySelector('.canvas').querySelector('svg').innerHTML
                        }</svg>`.replace(/transparent/g, '#ffffff'),
                        size,
                    },
                },
                '*'
            );
        } else if (render === 'canvas') {
            document.querySelector('canvas').toBlob((blob) => {
                blob.arrayBuffer().then((buffer) => {
                    window.parent.postMessage(
                        {
                            pluginMessage: {
                                type: 'render-chart',
                                render: 'canvas',
                                data: [...new Uint8Array(buffer)],
                                size,
                            },
                        },
                        '*'
                    );
                });
            });
        }
    }

    React.useEffect(() => {
        window.onmessage = async (e: {
            data: {pluginMessage: PromiseLike<{type: any; data: any}> | {type: any; data: any}};
        }) => {
            try {
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
                    case 'edit-snapshot':
                        dispatch(editSnapshotById(data));
                        break;
                    default:
                }
            } catch (err) {}
        };
    }, []);

    return (
        <ConfigProvider componentSize={'small'}>
            <div className={'App'} style={{width: '100%', height: '100%', display: 'flex'}}>
                {!hideInterface ? <SideBar /> : null}
                <div className={'App__content relative flex border-r flex-grow overflow-hidden bg-gray-100'}>
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
                    className={'fixed bottom-16 left-1/2 transform -translate-x-1/2 text-base overflow-visible'}
                    type={'primary'}
                    size={'large'}
                    onClick={() => {
                        if (chartType === 'line') renderChart(line.render, {width: line.width, height: line.height});
                        if (chartType === 'bar') renderChart(bar.render, {width: bar.width, height: bar.height});
                    }}
                    shape={'round'}
                    disabled={!(selectionId.length > 0)}
                >
                    {selectionId.length > 0 ? t('Render') : t('Select a Frame')}
                </Button>
            </div>
        </ConfigProvider>
    );
}

export default App;
