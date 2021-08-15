import {configureStore} from '@reduxjs/toolkit';
import chartReducer from '../features/chart/lineChartSlice';
import appReducer from '../features/app/appSlice';
import pieChartReducer from '../features/chart/pieChartSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        line: chartReducer,
        pie: pieChartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
