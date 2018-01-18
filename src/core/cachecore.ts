export default class Cache {
  size: number
  _debug: boolean
  cache: any
  hitCount: number
  missCount: number
  constructor() {
    this.size = 0
    this._debug = false
    this.cache = Object.create(null)
    this.hitCount = 0
    this.missCount = 0
  }
  set = (key: string, value: any, time: Number) => {
    if (
      typeof time !== 'undefined' &&
      (typeof time !== 'number' || isNaN(time) || time <= 0)
    ) {
      throw new Error('Cache timeout must be a positive number')
    }
    const record = {
      value: value,
      expire: time + Date.now()
    }
    this.cache[key] = value
    return value
  };

  del = (key: string) => {
    let isDelete = true
    const oldRecord = this.cache[key]
    if (oldRecord) {
      isDelete = true
    } else {
      isDelete = false
    }
    if (isDelete) {
      this.doDel(key)
    }

    return isDelete
  }

  doDel = (key: string) => {
    this.size--
    delete this.cache[key]
  }

  clear = () => {
    this.size = 0
    this.cache = Object.create(null)
  }

  get = (key: string) => {
    const data = this.cache[key]
    if (typeof data != 'undefined') {
      if (isNaN(data.expire) || data.expire >= Date.now()) {
        if (this._debug) this.hitCount++
        return data.value
      } else {
        // free some space
        if (this._debug) this.missCount++
        this.size--
        delete this.cache[key]
      }
    } else if (this._debug) {
      this.missCount++
    }
    return null
  };

  getSize = () => {
    return this.size
  }
}
