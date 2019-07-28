import { Data, CacheOptions, LinkedNode } from "./interface";

class LRUCache {
    private size : number
    private cache : any
    private maxSize : number
    private endList: LinkedNode | null
    private firstList: LinkedNode | null
    public constructor(opt: CacheOptions) {
        const {
            capacity = 10000,
        } = opt;
        
        this.maxSize = capacity
        this.size = 0
        this.firstList = null
        this.endList = null
        this.cache = {}
    }
    
    public get(key : string): any {
        let data : LinkedNode = this.cache[key]
        if(typeof data !== 'undefined') {
            if(data.pre) {
                if(this.endList === data) {
                    this.endList = data.pre
                }
                data.pre.next = data.next
                if(data.next) data.next.pre = data.pre
                data.pre = null
                if(this.firstList) {
                    data.next = this.firstList
                    this.firstList.pre = data
                }
                this.firstList = data
            }
            return data.val
        }
        return null 
    }
    
    public put(key: string, value: any) : void {
        if(this.maxSize < this.size + 1) {
            if(this.endList) {
                let node : LinkedNode = this.endList
                // remove end node
                let val = node.val;
                let key = node.key
                delete this.cache[key]
                // free reference
                if(node.pre) {
                    this.endList = node.pre
                    this.endList.next = null
                    node.pre = null
                }
                node.val = null
                node.next = null
            }
        }


        const listNode = new LinkedNode()
        listNode.val = value
        listNode.key = key
        if(this.firstList) {
            listNode.next = this.firstList
            this.firstList.pre = listNode
        }

        if(!this.endList) {
            this.endList = listNode
        }

        this.firstList = listNode
        this.cache[key] = listNode
        this.size += 1
    }
}


