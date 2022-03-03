/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-02-16 10:19:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-02-16 11:09:19
 */
class Maybe {
  static of(value) {
    return new Maybe(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {

    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
  }

  isNothing() {
    return this._value === undefined || this._value === null
  }
}
const r = Maybe.of('hello').map(v => v.toUpperCase())
console.log(r)
// MayBe { _value: 'HELLO' }
console.log(Maybe.of(null).map(v => v.toUpperCase()))
// Maybe { _value: null }