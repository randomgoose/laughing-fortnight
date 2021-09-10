import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface DataMockState {
    decimalDigit: number;
}

const initialState: DataMockState = {
    decimalDigit: 2,
};

export const dataMockSlice = createSlice({
    name: 'dataMock',
    initialState,
    reducers: {
        setDecimalDigit: (state, action: PayloadAction<number>) => {
            state.decimalDigit = action.payload;
        },
        setPartialState: (state, action: PayloadAction<Partial<DataMockState>>) => {
            console.log('g', action.payload);
            Object.assign(state, action.payload);
        },
    },
});

export const {setDecimalDigit, setPartialState} = dataMockSlice.actions;

export default dataMockSlice.reducer;
