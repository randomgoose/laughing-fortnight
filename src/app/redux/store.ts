import {configureStore} from '@reduxjs/toolkit';
import chartReducer from '../features/chart/lineChartSlice';
import appReducer from '../features/app/appSlice';
import pieChartReducer from '../features/chart/pieChartSlice';
import dataReducer from '../features/data/dataSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        line: chartReducer,
        pie: pieChartReducer,
        data: dataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
