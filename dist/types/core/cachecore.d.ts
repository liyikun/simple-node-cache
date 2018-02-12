export default class Cache {
    size: number;
    _debug: boolean;
    cache: any;
    hitCount: number;
    missCount: number;
    maxSize: number;
    constructor(maxSize?: number);
    set: (key: string, value: any, time: number) => any;
    del: (key: string) => boolean;
    doDel: (key: string) => void;
    clear: () => void;
    get: (key: string) => any;
    getSize: () => number;
    outputJson: () => string;
    loadJson: (jsonStr: string, filters: string[]) => void;
}
