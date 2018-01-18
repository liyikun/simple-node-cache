import CacheClass from '../src/core/cachecore'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new CacheClass()).toBeInstanceOf(CacheClass)
  })
})
