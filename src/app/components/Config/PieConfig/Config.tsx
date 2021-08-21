import * as React from 'react';
import {FcPieChart} from 'react-icons/fc';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Button, Collapse, Space} from 'antd';
import CollapsePanel from '../../StyledComponents/StyledCollapsePanel';

export default function PieConfig() {
    const {activeSerie} = useSelector((state: RootState) => state.line);
    const chartConfig = useSelector((state: RootState) => state.line);
    const {selectionId} = useSelector((state: RootState) => state.app);

    React.useEffect(() => {
        console.log(activeSerie);
    }, [activeSerie]);

    function renderChart() {
        window.parent.postMessage(
            {
                pluginMessage: {
                    type: 'render-chart',
                    svg: document.querySelector('.recharts-surface').outerHTML,
                    config: chartConfig,
                },
            },
            '*'
        );
    }

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
            <Collapse ghost accordion style={{background: 'white', padding: 0}}>
                <CollapsePanel key={'general'} header={'General'}></CollapsePanel>
                <CollapsePanel key={'axes'} header={'坐标轴'}></CollapsePanel>
                <CollapsePanel key={'grid'} header={'网格'}></CollapsePanel>
                <CollapsePanel key={'legend'} header={'图例'}></CollapsePanel>
                <CollapsePanel header={'数据'} key={'data'}></CollapsePanel>
                <CollapsePanel key={'lines'} header={'Lines'}></CollapsePanel>
                <CollapsePanel key={'points'} header={'数据点'}></CollapsePanel>
            </Collapse>
            <Space></Space>
            <Button style={{width: '100%'}} type={'primary'} onClick={renderChart}>
                渲染
            </Button>
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
