export const generateIncreasingNumberSequence = (count: number, max: number = 100, min: number = 1): number[] => {
    let res = [];
    for (let i = 0; i < count; i++) {
        res.push(Math.random() * (max - min) + min);
    }
    return res.sort();
};

export const generateDecreasingNumberSequence = (count: number, max: number = 100, min: number = 1): number[] => {
    let res = [];
    for (let i = 0; i < count; i++) {
        res.push(Math.random() * (max - min) + min);
    }
    return res.sort((a, b) => b - a);
};
