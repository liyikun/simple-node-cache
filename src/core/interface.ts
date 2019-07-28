export class LinkedNode {
    public pre: LinkedNode | null = null;
    public next: LinkedNode | null = null;
    public val: any;
    public key: any;
}

export interface Data {
    value: any
    expire: number
}


export interface CacheOptions {
    capacity?: number
}