export declare class LinkedNode {
    pre: LinkedNode | null;
    next: LinkedNode | null;
    val: any;
}
export interface Data {
    value: any;
    expire: number;
}
export interface CacheOptions {
    capacity?: number;
}
