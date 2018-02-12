var Cache = /** @class */ (function () {
    function Cache(maxSize) {
        if (maxSize === void 0) { maxSize = 10000; }
        var _this = this;
        this.set = function (key, value, time) {
            if (typeof time !== 'undefined' &&
                (typeof time !== 'number' || isNaN(time) || time <= 0)) {
                throw new Error('Cache timeout must be a positive number');
            }
            if (_this.size === _this.maxSize) {
                _this.clear();
            }
            var record = {
                value: value,
                expire: time + Date.now()
            };
            _this.cache[key] = record;
            _this.size++;
            return value;
        };
        this.del = function (key) {
            var isDelete = true;
            var oldRecord = _this.cache[key];
            if (oldRecord) {
                isDelete = true;
            }
            else {
                isDelete = false;
            }
            if (isDelete) {
                _this.doDel(key);
            }
            return isDelete;
        };
        this.doDel = function (key) {
            _this.size--;
            delete _this.cache[key];
        };
        this.clear = function () {
            _this.size = 0;
            _this.cache = Object.create(null);
        };
        this.get = function (key) {
            var record = _this.cache[key];
            if (typeof record != 'undefined') {
                if (isNaN(record.expire) || record.expire >= Date.now()) {
                    if (_this._debug)
                        _this.hitCount++;
                    return record.value;
                }
                else {
                    // free some space
                    if (_this._debug)
                        _this.missCount++;
                    _this.size--;
                    delete _this.cache[key];
                }
            }
            else if (_this._debug) {
                _this.missCount++;
            }
            return null;
        };
        this.getSize = function () {
            return _this.size;
        };
        this.outputJson = function () {
            var result = Object.create(null);
            for (var key in _this.cache) {
                var record = _this.cache[key];
                if (record) {
                    result[key] = record;
                }
            }
            return JSON.stringify(result);
        };
        this.loadJson = function (jsonStr, filters) {
            var data = JSON.parse(jsonStr);
            var time = Date.now();
            for (var key in data) {
                if (!data.hasOwnProperty(key) || filters.includes(key)) {
                    continue;
                }
                var record = data[key];
                if (record.expire < time) {
                    continue;
                }
                _this.cache[key] = record;
            }
        };
        this.size = 0;
        this._debug = false;
        this.cache = Object.create(null);
        this.hitCount = 0;
        this.missCount = 0;
        this.maxSize = maxSize;
    }
    return Cache;
}());

var nodeCacheBase = {
    Cache: Cache
};

export default nodeCacheBase;
//# sourceMappingURL=node-cache-base.es5.js.map
