import * as React from 'react';
import {FcPieChart} from 'react-icons/fc';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Tabs} from 'antd';

export default function PieConfig() {
    const {activeSerie} = useSelector((state: RootState) => state.line);
    const chartConfig = useSelector((state: RootState) => state.line);
    const {selectionId} = useSelector((state: RootState) => state.app);

    React.useEffect(() => {
        if (selectionId.length > 0) {
            window.parent.postMessage(
                {
                    pluginMessage: {
                        type: 'update-chart',
                        svg: document.querySelector('.recharts-surface').outerHTML,
                        config: chartConfig,
                    },
                },
                '*'
            );
        }
    }, [chartConfig, selectionId]);

    const config = (
        <>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>
                <FcPieChart style={{marginRight: 8}} />
                <div style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold'}}>饼图</div>
            </div>
            <Tabs tabPosition={'left'}>
                <Tabs.TabPane key={'general'} tab={'General'} style={{width: 'fit-content'}}></Tabs.TabPane>
                <Tabs.TabPane key={'axes'} tab={'Axis'}></Tabs.TabPane>
                <Tabs.TabPane key={'grid'} tab={'Grid'}></Tabs.TabPane>
                <Tabs.TabPane key={'legend'} tab={'Legend'}></Tabs.TabPane>
                <Tabs.TabPane key={'data'} tab={'Data'}></Tabs.TabPane>
                <Tabs.TabPane key={'lines'} tab={'Lines'}></Tabs.TabPane>
                <Tabs.TabPane key={'points'} tab={'Points'}></Tabs.TabPane>
            </Tabs>
        </>
    );

    return (
        <div
            className={'Config'}
            style={{
                width: 260,
                height: '100%',
                padding: 16,
            }}
        >
            {activeSerie ? <div></div> : config}
        </div>
    );
}
