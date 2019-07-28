"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var LRUCache = /** @class */ (function () {
    function LRUCache(opt) {
        var _a = opt.capacity, capacity = _a === void 0 ? 10000 : _a;
        this.maxSize = capacity;
        this.size = 0;
        this.firstList = null;
        this.endList = null;
    }
    LRUCache.prototype.get = function (key) {
        var data = this.cache[key];
        if (typeof data !== 'undefined') {
            return data.val;
        }
        return null;
    };
    LRUCache.prototype.put = function (key, value) {
        if (this.maxSize < this.size + 1) {
            if (this.endList) {
                var node = this.endList;
                // remove end node
                var val = node.val;
                var key_1 = val.key;
                delete this.cache[key_1];
                // free reference
                if (node.pre) {
                    this.endList = node.pre;
                    node.pre = null;
                }
                node.val = null;
                node.next = null;
            }
        }
        var listNode = new interface_1.LinkedNode();
        listNode.val = value;
        if (this.firstList) {
            listNode.next = this.firstList;
        }
        if (!this.endList) {
            this.endList = listNode;
        }
        this.firstList = listNode;
        this.cache[key] = listNode;
    };
    return LRUCache;
}());
//# sourceMappingURL=lrucache.js.map