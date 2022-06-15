import * as React from 'react';
import './styles/ui.css';
import SideBar from './components/Sidebar';
import Canvas from './components/Canvas';
import {Button, ConfigProvider} from 'antd';
import 'tailwindcss/tailwind.css';
import {appAtom} from './atoms/appAtom';
import {useAtom} from 'jotai';
import {Empty} from 'antd';
import {useTranslation} from 'react-i18next';
import Gallery from './components/Gallery';
import {GET_ALL_COLOR_SCHEMES} from '../plugin/message-types';
import {undoAtom} from './atoms/history';
import {Tab, TabList, TabPanel, TabPanels, Tabs, useToast} from '@chakra-ui/react';
import {selectedAtom} from './atoms/selection';
import ThemePanel from './components/ThemeBuilder';
import {colorSchemeAtoms, colorSchemeFamily} from './atoms/colors';
import Config from './components/Config';

function App() {
    const [{hideInterface, selectionId}, setApp] = useAtom(appAtom);
    const {t} = useTranslation();
    const [, undo] = useAtom(undoAtom);
    const [, setSchemeAtoms] = useAtom(colorSchemeAtoms);
    const [selected] = useAtom(selectedAtom);

    const toast = useToast();

    const undoWithToast = () => {
        undo();
        toast({
            title: 'Undo',
            status: 'info',
        });
    };

    function renderChart() {
        // const data = Array.from(document.querySelectorAll('.chart-box')).map((box) => {
        //     const [x, y] = box
        //         .getAttribute('style')
        //         .split(';')
        //         .find((attr) => attr.includes('transform'))
        //         .replace('transform: translate(', '')
        //         .replace(')', '')
        //         .split(',')
        //         .map((i) => parseFloat(i));
        //     return {
        //         svg: `<svg xmlns="http://www.w3.org/2000/svg">${box.querySelector('svg')?.innerHTML}</svg>`.replace(
        //             /transparent/g,
        //             '#ffffff'
        //         ),
        //         position: { x: x, y: y },
        //     };
        // });
        // window.parent.postMessage(
        //     {
        //         pluginMessage: {
        //             type: 'render-chart',
        //             render: 'svg',
        //             data: data,
        //         },
        //     },
        //     '*'
        // );
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

    React.useEffect(() => {
        window.onmessage = async (e: {
            data: {pluginMessage: PromiseLike<{type: any; data: any}> | {type: any; data: any}};
        }) => {
            try {
                const {type, data} = await e.data.pluginMessage;
                switch (type) {
                    case 'set-selection':
                        setApp((app) => ({...app, selectionId: data}));
                        break;
                    case GET_ALL_COLOR_SCHEMES:
                        if (data) {
                            setSchemeAtoms((prev) => [
                                ...prev,
                                ...data.map((datum) => {
                                    const {id, ...rest} = datum;
                                    return colorSchemeFamily({id: datum.id, initial: rest});
                                }),
                            ]);
                            setApp((state) => ({...state, colorSchemes: data}));
                        }
                        break;
                    default:
                }
            } catch (err) {
                console.log(err);
            }
        };
    }, []);

    return (
        <ConfigProvider componentSize={'small'}>
            <div
                className={'App w-full h-full flex'}
                onKeyDown={(e) => {
                    if (e.metaKey && e.key === 'z') undoWithToast();
                }}
            >
                {!hideInterface ? <SideBar /> : null}
                <div className={'App__content relative flex border-r flex-grow overflow-hidden bg-gray-100'}>
                    <Canvas />
                    {!hideInterface ? <Gallery /> : null}
                </div>

                {!hideInterface && (
                    <div className={'Config h-full w-48 flex-shrink-0 flex items-center justify-center'}>
                        <Tabs h={'full'} w={'full'} isFitted size={'sm'} variant={'line'}>
                            <TabList>
                                <Tab>Chart</Tab>
                                <Tab>Theme</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0}>
                                    {selected ? (
                                        <Config atom={selected} />
                                    ) : (
                                        <Empty description={t('Select a chart')} />
                                    )}
                                </TabPanel>
                                <TabPanel p={0}>
                                    <ThemePanel />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
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
