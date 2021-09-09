interface Snapshot {
    state: any;
    svg: string;
    id: string;
    title: string;
    type: 'bar' | 'line' | 'pie' | 'area';
}

export const loadSnapshots = async (): Promise<Snapshot[]> => {
    const snapshots = await figma.clientStorage.getAsync('snapshots');
    if (snapshots) {
        return snapshots;
    } else {
        return [];
    }
};

export const saveSnapshot = async (snapshot: Snapshot): Promise<Snapshot> => {
    const snapshots = await loadSnapshots();
    await figma.clientStorage.setAsync('snapshots', [snapshot, ...snapshots]);
    return snapshot;
};

export const getSnapshotById = async (id: string): Promise<Snapshot> => {
    const snapshots = await loadSnapshots();
    return snapshots.find((item) => item.id === id);
};

export const changeSnapshotTitle = async (id: string, title: string): Promise<Snapshot> => {
    const snapshots = await loadSnapshots();
    const snapshot = snapshots.find((item) => item.id === id);
    snapshot.title = title;
    await figma.clientStorage.setAsync('snapshots', snapshots);
    return snapshot;
};

export const removeSnapshotById = async (id): Promise<Snapshot> => {
    const snapshots = await loadSnapshots();
    await figma.clientStorage.setAsync(
        'snapshots',
        snapshots.filter((item) => item.id !== id)
    );
    return snapshots.find((item) => item.id === id);
};
