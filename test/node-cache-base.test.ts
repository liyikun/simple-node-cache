import CacheClass from '../src/core/cachecore'

/**
 * Dummy test
 */
describe('base test', () => {
  const cache = new CacheClass()
  it('add test', () => {
    expect(cache.set('test', 'testdata', 100000)).toBe('testdata')
  })

  it('get test', () => {
    expect(cache.get('test')).toBe('testdata')
  })

  it('del test', () => {
    cache.del('test')
    expect(cache.get('test')).toBe(null)
  })
})

describe('extend test', () => {
  let cache = new CacheClass()
  const keys = ['a', 'b', 'c']
  const value = ['2009', '2010', '2011']
  keys.forEach((keys, index) => {
    cache.set(keys, value[index], 10000)
  })
  it('get size test', () => {
    expect(cache.getSize()).toBe(3)
  })

  it('set && out json test', () => {
    const jsonstr = cache.outputJson()
    cache.clear()
    cache.loadJson(jsonstr, [])
    expect(cache.outputJson()).toBe(jsonstr)
  })
})

describe('size test', () => {
  const cache = new CacheClass(10)
  it('set Max size', () => {
    for (let i = 0; i < 11; i++) {
      cache.set(`key${i}`, Math.ceil(Math.random() * i), 10000)
    }
    expect(cache.getSize()).toBe(1)
  })
})
