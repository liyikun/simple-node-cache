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

describe('total test', () => {
  const cache = new CacheClass()
  it('get size test', () => {
    const keys = ['a', 'b', 'c']
    const value = ['2009', '2010', '2011']
    keys.forEach((keys, index) => {
      cache.set(keys, value[index], 10000)
    })
    expect(cache.getSize()).toBe(3)
  })
})
