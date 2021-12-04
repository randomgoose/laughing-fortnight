import * as React from 'react';
import './styles/ui.css';
import SideBar from './components/Sidebar';
import Canvas from './components/Canvas';
import LineConfig from './components/Config/LineConfig/Config';
import PieConfig from './components/Config/PieConfig/Config';
import BarConfig from './components/Config/BarConfig/Config';
import ScatterConfig from './components/Config/ScatterConfig/Config';
import {Button, ConfigProvider} from 'antd';
import 'tailwindcss/tailwind.css';
import {appAtom, ChartType} from './atoms/appAtom';
import {useAtom} from 'jotai';
import {Empty} from 'antd';
import {useTranslation} from 'react-i18next';
import Gallery from './components/Gallery';
import CalendarConfig from './components/Config/CalendarConfig/Config';

function App() {
    const [{hideInterface, activeKey, charts, selectionId}, setApp] = useAtom(appAtom);
    const {t} = useTranslation();

    const activeChart = charts.find((chart) => chart.id === activeKey);

    function renderChart() {
        const data = Array.from(document.querySelectorAll('.chart-box')).map((box) => {
            const [x, y] = box
                .getAttribute('style')
                .split(';')
                .find((attr) => attr.includes('transform'))
                .replace('transform: translate(', '')
                .replace(')', '')
                .split(',')
                .map((i) => parseFloat(i));
            return {
                svg: `<svg xmlns="http://www.w3.org/2000/svg">${box.querySelector('svg').innerHTML}</svg>`.replace(
                    /transparent/g,
                    '#ffffff'
                ),
                position: {x: x, y: y},
            };
        });

        window.parent.postMessage(
            {
                pluginMessage: {
                    type: 'render-chart',
                    render: 'svg',
                    data: data,
                },
            },
            '*'
        );
        // } else if (render === 'canvas') {
        //     document.querySelector('canvas').toBlob((blob) => {
        //         blob.arrayBuffer().then((buffer) => {
        //             window.parent.postMessage(
        //                 {
        //                     pluginMessage: {
        //                         type: 'render-chart',
        //                         render: 'canvas',
        //                         data: [...new Uint8Array(buffer)],
        //                         size,
        //                     },
        //                 },
        //                 '*'
        //             )
        //         })
        //     })
        // }
    }

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
            case 'calendar':
                return <CalendarConfig />;
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
                        setApp((app) => ({...app, selectionId: data}));
                        break;
                    default:
                }
            } catch (err) {}
        };
    }, []);

    return (
        <ConfigProvider componentSize={'small'}>
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

                <Button
                    className={'fixed bottom-16 left-1/2 transform -translate-x-1/2 text-base overflow-visible'}
                    type={'primary'}
                    size={'large'}
                    onClick={() => {
                        renderChart();
                        // if (chartType === 'line')
                        //     renderChart(line.render, { width: line.width, height: line.height })
                        // if (chartType === 'bar') renderChart(bar.render, { width: bar.width, height: bar.height })
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
