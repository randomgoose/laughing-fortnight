import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import * as React from 'react';
import DataTable from './Data/DataTable';
import {Rnd} from 'react-rnd';
import {sendMessage} from '../utils/send-message';
import {useTranslation} from 'react-i18next';

export default function Gallery() {
    const [height, setHeight] = React.useState('320px');
    const [width, setWidth] = React.useState('100%');
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(window.innerHeight - 320);
    const {t} = useTranslation();

    function loadSnapShots() {
        sendMessage('load-snapshots');
    }

    React.useEffect(() => {
        loadSnapShots();
    }, []);

    return (
        <Rnd
            dragAxis={'none'}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
                setHeight(ref.style.height);
                setWidth(ref.style.width);
                setX(position.x);
                setY(position.y);
            }}
            resizeHandleComponent={{
                top: (
                    <div
                        className={'absolute left-1/2 -top-1 w-6 h-1 bg-gray-200 rounded border border-gray-500'}
                    ></div>
                ),
            }}
            position={{
                x: x,
                y: y,
            }}
            size={{
                width: width,
                height: height,
            }}
            className={'cursor-default'}
        >
            <div className={'Gallery'} style={{padding: '0 12px', width: '100%', height: '100%', background: 'white'}}>
                <Tabs style={{height: '100%'}}>
                    <TabList>
                        <Tab>{t('Data')}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DataTable />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Rnd>
    );
}
