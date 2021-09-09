import {configureStore} from '@reduxjs/toolkit';
import lineReducer from '../features/chart/lineChartSlice';
import appReducer from '../features/app/appSlice';
import pieReducer from '../features/chart/pieChartSlice';
import barReducer from '../features/chart/barChartSlice';
import dataMockReducer from '../features/data/dataMockSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        line: lineReducer,
        pie: pieReducer,
        bar: barReducer,
        dataMock: dataMockReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
