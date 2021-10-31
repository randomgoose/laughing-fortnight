import * as React from 'react';
import './styles/ui.css';
import SideBar from './components/Sidebar';
import Canvas from './components/Canvas';
import LineConfig from './components/Config/LineConfig/Config';
import Gallery from './components/Gallery';
import PieConfig from './components/Config/PieConfig/Config';
import BarConfig from './components/Config/BarConfig/Config';
import ScatterConfig from './components/Config/ScatterConfig/Config';
import {ConfigProvider} from 'antd';
import {useDispatch} from 'react-redux';
import {addSnapshot, editSnapshotById, removeSnapshotById, setSelectionId, setSnapshots} from './features/app/appSlice';
import 'tailwindcss/tailwind.css';
import {PieConfigProvider} from './context/pie-context';
import {appAtom, ChartType} from './atoms/appAtom';
import {useAtom} from 'jotai';
import {Empty} from 'antd';
import {useTranslation} from 'react-i18next';

function App() {
    const [{hideInterface, activeKey, charts}] = useAtom(appAtom);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const activeChart = charts.find((chart) => chart.id === activeKey);

    // function renderChart(render: 'canvas' | 'svg', size: { width: number; height: number }) {
    //     if (render === 'svg') {
    //         window.parent.postMessage(
    //             {
    //                 pluginMessage: {
    //                     type: 'render-chart',
    //                     render: 'svg',
    //                     data: `<svg xmlns="http://www.w3.org/2000/svg">${document.querySelector('.canvas').querySelector('svg').innerHTML
    //                         }</svg>`.replace(/transparent/g, '#ffffff'),
    //                     size,
    //                 },
    //             },
    //             '*'
    //         )
    //     } else if (render === 'canvas') {
    //         document.querySelector('canvas').toBlob((blob) => {
    //             blob.arrayBuffer().then((buffer) => {
    //                 window.parent.postMessage(
    //                     {
    //                         pluginMessage: {
    //                             type: 'render-chart',
    //                             render: 'canvas',
    //                             data: [...new Uint8Array(buffer)],
    //                             size,
    //                         },
    //                     },
    //                     '*'
    //                 )
    //             })
    //         })
    //     }
    // }

    function renderConfig(type: ChartType) {
        switch (type) {
            case 'pie':
                return <PieConfig />;
            case 'line':
                return <LineConfig />;
            case 'bar':
                return <BarConfig />;
            case 'scatter':
                return <ScatterConfig />;
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
            <PieConfigProvider>
                <div className={'App w-full h-full flex'}>
                    {!hideInterface ? <SideBar /> : null}
                    <div className={'App__content relative flex border-r flex-grow overflow-hidden bg-gray-100'}>
                        <Canvas />
                        {!hideInterface ? <Gallery /> : null}
                    </div>

                    {!hideInterface && (
                        <div className={'Config h-full w-48 flex-shrink-0 flex items-center justify-center'}>
                            {activeChart ? renderConfig(activeChart.type) : <Empty description={t('Select a chart')} />}
                        </div>
                    )}

                    {/* <Button
                        className={'fixed bottom-16 left-1/2 transform -translate-x-1/2 text-base overflow-visible'}
                        type={'primary'}
                        size={'large'}
                        onClick={() => {
                            if (chartType === 'line')
                                renderChart(line.render, { width: line.width, height: line.height })
                            if (chartType === 'bar') renderChart(bar.render, { width: bar.width, height: bar.height })
                        }}
                        shape={'round'}
                        disabled={!(selectionId.length > 0)}
                    >
                        {selectionId.length > 0 ? t('Render') : t('Select a Frame')}
                    </Button> */}
                </div>
            </PieConfigProvider>
        </ConfigProvider>
    );
}

export default App;
