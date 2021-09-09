export interface SnapshotProps {
    state: any;
    svg: string;
    id: string;
    title: string;
    type: 'bar' | 'line' | 'pie' | 'area';
}
