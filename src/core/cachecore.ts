interface Record {
  value: any
  expire: number
}

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
  set = (key: string, value: any, time: number): any => {
    if (
      typeof time !== 'undefined' &&
      (typeof time !== 'number' || isNaN(time) || time <= 0)
    ) {
      throw new Error('Cache timeout must be a positive number')
    }
    if (this.size === 10000) {
      this.clear()
    }
    const record: Record = {
      value: value,
      expire: time + Date.now()
    }
    this.cache[key] = record
    this.size++
    return value
  };

  del = (key: string): boolean => {
    let isDelete = true
    const oldRecord: Record = this.cache[key]
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

  doDel = (key: string): void => {
    this.size--
    delete this.cache[key]
  }

  clear = (): void => {
    this.size = 0
    this.cache = Object.create(null)
  }

  get = (key: string): any => {
    const record: Record = this.cache[key]
    if (typeof record != 'undefined') {
      if (isNaN(record.expire) || record.expire >= Date.now()) {
        if (this._debug) this.hitCount++
        return record.value
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

  getSize = (): number => {
    return this.size
  }

  outputJson = (): string => {
    const result: any = Object.create(null)
    for (let key in this.cache) {
      const record: Record = this.cache[key]
      if (record) {
        result[key] = record
      }
    }
    return JSON.stringify(result)
  }

  loadJson = (jsonStr: string, filters: Array<string>): void => {
    const data: any = JSON.parse(jsonStr)
    const time: number = Date.now()
    for (let key in data) {
      if (!data.hasOwnProperty(key) || filters.includes(key)) {
        continue
      }
      const record: Record = data[key]
      if (record.expire < time) {
        continue
      }
      this.cache[key] = record
    }
  }
}
