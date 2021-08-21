import * as React from 'react';
import './styles/ui.css';
import SideBar from './components/Sidebar';
import Canvas from './components/Canvas';
import LineConfig from './components/Config/LineConfig/Config';
import Gallery from './components/Gallery';
import PieConfig from './components/Config/PieConfig/Config';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
// import {useDispatch} from 'react-redux';
// import {loadState} from './features/chart/lineChartSlice';
// import {setSelectionId} from './features/app/appSlice';

function App() {
    const {chartType} = useSelector((state: RootState) => state.app);
    // const dispatch = useDispatch();

    // React.useEffect(() => {
    //     window.onmessage = async (e: {
    //         data: {pluginMessage: PromiseLike<{type: any; data: any}> | {type: any; data: any}};
    //     }) => {
    //         const {type, data} = await e.data.pluginMessage;
    //         switch (type) {
    //             case 'get-chart-data':
    //                 dispatch(loadState(JSON.parse(data)));
    //                 break;
    //             case 'set-selection':
    //                 dispatch(setSelectionId(data));
    //                 break;
    //             default:
    //                 console.log(data);
    //         }
    //     };
    // }, []);

    return (
        <div className={'App'} style={{width: '100%', height: '100%', display: 'flex'}}>
            <SideBar />
            <div
                className={'App__content'}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: 1200,
                    borderRight: '1px solid rgba(0, 0, 0, .1)',
                }}
            >
                <Canvas />
                <Gallery />
            </div>
            {chartType === 'line' ? <LineConfig /> : chartType === 'pie' ? <PieConfig /> : <div />}
        </div>
    );
}

export default App;
