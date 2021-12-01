import {WritableDraft} from 'immer/dist/internal';
import {ChartStateType} from '../atoms/types';

export function onDragStop(_e, d, setState: (fn: (draft: WritableDraft<ChartStateType>) => void) => void) {
    setState((state) => {
        state.x = d.x;
        state.y = d.y;
    });
}

export function onResize(
    _e,
    _direction,
    ref,
    _delta,
    position,
    setState: (fn: (draft: WritableDraft<ChartStateType>) => void) => void
) {
    setState((state) => {
        state.height = parseFloat(ref.style.height);
        state.width = parseFloat(ref.style.width);
        state.x = position.x;
        state.y = position.y;
    });
}
