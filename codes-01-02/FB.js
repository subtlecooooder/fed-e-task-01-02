/**
 * 1-3 函数式编程概念
 */
// // 非函数式
// let num1 = 1
// let num2 = 2
// let sum = num1 + num2
// console.log(sum)

// // 函数式
// function add(n1, n2) {
//   return n1 + n2
// }
// let sum = add(1, 2)
// console.log(sum)

/**
 * 1-5 高阶函数-函数作为参数
 */
// 实现forEach
// function forEach(arr, fn) {
//   for(let i = 0; i < arr.length; i++){
//     fn(arr[i], i)
//   }
// }
// // 测试
// let array = [1, 2, 3, 4, 5]
// forEach(array, (item, i) => {
//   console.log(item, i)
// })
/**
 * 1 0
   2 1
   3 2
   4 3
   5 4
 */

// // 实现filter
// function filter(arr, fn) {
//   let result = []
//   for(let i = 0; i < arr.length; i++) {
//     if(fn(arr[i])){
//       result.push(arr[i])
//     }
//   }
//   return result
// }

// // 测试
// let array = [1, 3, 7, 9, 10, 20]
// let res = filter(array, function(item) {
//   return item % 2
// })

// console.log(res)
// [ 1, 3, 7, 9 ]

/**
 * 1-6 高阶函数-函数作为返回值
 */
// 实现once
// function once(fn) {
//   let done = false
//   return function() {
//     if(!done) {
//       done = true
//       return fn.apply(this, arguments)
//     }
//   }
// }

// let pay = once(function(money) {
//   console.log(`money: ${money} RMB`)
// })

// pay(5)
// pay(5)
// pay(5)
// pay(5)
// money: 5 RMB

/**
 * 1-8常用的高阶函数
 */
// // 实现map
// const map = (arr, fn) => {
//   let result = []
//   for(let item of arr) {
//     result.push(fn(item))
//   }
//   return result
// }

// const arr = [1,2,3,4,5]
// console.log(map(arr, v => v * v))
// // [ 1, 4, 9, 16, 25 ]

// // 实现every
// const every = (arr, fn) => {
//   let result = true
//   for(let item of arr) {
//     result = fn(item)
//     if(!result) break
//   }
//   return result
// }

// const arr = [10, 12, 14]
// console.log(every(arr, v => v > 9))// true
// console.log(every(arr, v => v > 10))// false

// // 实现some，确认是否存在元素满足条件
// const some = (arr, fn) => {
//   let result = false
//   for(let item of arr) {
//     result = fn(item)
//     if(result) break
//   }
//   return result
// }

// const arr = [1, 2, 3, 5, 9]
// // 数组中是否存在偶数
// console.log(some(arr, v => v % 2 === 0))// true


/**
 * 1-9 闭包
 */ 
// 函数作为返回值
// function makeFn() {
//   let msg = 'hello world'
//   return function() {
//     return msg
//   }
// }
// const fn = makeFn()
// console.log(fn())

/**
 * 1-10 闭包案例
 */
// function makePower(power) {
//   return function(number) {
//     return Math.pow(number, power)
//   }
// }

// // 求平方、求立方
// const power2 = makePower(2)
// const power3 = makePower(3)
// console.log(power2(5))// 25
// console.log(power3(5))// 125

// 求工资
// function makeSalary(base) {
//   return function(performance) {
//     return base + performance
//   }
// }

// const salary1 = makeSalary(12000)
// const salary2 = makeSalary(15000)

// console.log(salary1(2000))// 14000
// console.log(salary1(3000))// 15000
// console.log(salary2(5000))// 20000

/**
 * 1-11 纯函数概念
 */
// 纯函数和不纯的函数
// slice和splice
// let arr = [1, 2, 3, 4, 5, 7, 9]
// // slice
// console.log(arr.slice(0, 3))// [ 1, 2, 3 ]
// console.log(arr.slice(0, 3))// [ 1, 2, 3 ]
// console.log(arr.slice(0, 3))// [ 1, 2, 3 ]

// // splice
// console.log(arr.splice(0, 3))// [ 1, 2, 3 ]
// console.log(arr.splice(0, 3))// [ 4, 5, 7 ]
// console.log(arr.splice(0, 3))// [ 9 ]

/**
 * 1-12 Lodash
 */
// const _ = require('lodash')
// const arr = ['jack', 'tom', 'jerry', 'black']
// console.log(_.first(arr))// jack
// console.log(_.last(arr))// black

// console.log(_.toUpper(_.last(arr)))// BLACK

// // Note: 这个方法会改变原数组 array，基于 Array#reverse，不是纯函数！！！
// console.log(_.reverse(arr))// [ 'black', 'jerry', 'tom', 'jack' ]
// console.log(_.reverse(arr))// [ 'jack', 'tom', 'jerry', 'black' ]

/**
 * 1-13 纯函数的优势
 */
// 记忆函数
// const _ = require('lodash')

// function getArea(r) {
//   console.log(r)
//   return Math.PI * r * r
// }

// let getAreaWithMemoty = _.memoize(getArea)
// console.log(getAreaWithMemoty(4))
// console.log(getAreaWithMemoty(4))
// console.log(getAreaWithMemoty(4))
// 4
// 50.26548245743669
// 50.26548245743669
// 50.26548245743669

// const memoize = (f) => {
//   let cache = {}
//   return function() {
//     let key = JSON.stringify(arguments)
//     cache[key] = cache[key] || f.apply(f, arguments)
//     return cache[key]
//   }
// }
// let getAreaWithMemoty = memoize(getArea)
// console.log(getAreaWithMemoty(4))
// console.log(getAreaWithMemoty(4))
// console.log(getAreaWithMemoty(5))
// console.log(getAreaWithMemoty(5))
// 4
// 50.26548245743669
// 50.26548245743669
// 5
// 78.53981633974483
// 78.53981633974483

/**
 * 1-15 柯里化
 */
// // 函数的柯里化
// function checkAge(min) {
//   return function(age) {
//     return age >= min
//   }
// }

// // ES6 写法
// const checkAge = min => age => (age >=min)

// const checkAge18 = checkAge(18)
// const checkAge24 = checkAge(24)

// console.log(checkAge18(20))// true
// console.log(checkAge24(20))// false

/**
 * 1-16 lodash中的柯里化 curry 使用
 */
// const _ = require('lodash')
// function getSum(a, b, c) {
//   return a + b + c
// }

// const curried = _.curry(getSum)
// console.log(curried(1, 2, 3))// 6
// console.log(curried(1, 2)(3))// 6
// console.log(curried(1)(2)(3))// 6

/**
 * 1-17 柯里化案例
 */

// const _ = require('lodash')
// const match = _.curry((reg, str) => {
//   return str.match(reg)
// })

// const filter = _.curry((fn, arr) => {
//   return arr.filter(fn)
// })
// // 匹配空格
// const haveSpace = match(/\s+/g)
// // 匹配数字
// const haveNumber = match(/\d+/g)

// const findSpace = filter(haveSpace)

// console.log(filter(haveSpace)(['john conner', 'white_black']))
// console.log(findSpace(['john conner', 'white_black']))
// // [ 'john conner' ]
// // [ 'john conner' ]

/**
 * 1-18 柯里化原理模拟
 */
// function curry(fn) {
//   return function curriedFn(...args){
//     // 判断实参和形参的个数
//     if(args.length < fn.length){
//       return function() {
//         return curriedFn(...args.concat(...arguments))
//       }
//     }
//     return fn(...args)
//   }
// }

// // 测试
// function getSum(a, b, c) {
//   return a + b + c
// }

// const curried = curry(getSum)
// console.log(curried(1, 2, 3))// 6
// console.log(curried(1, 2)(3))// 6
// console.log(curried(1)(2)(3))// 6

/**
 * 1-20 函数组合
 */
// // 传入两个函数
// function compose(f, g) {
//   return function(value) {
//     return f(g(value))
//   }
// }

// function reverse (arr) {
//   return arr.reverse()
// }

// function first(array) {
//   return array[0]
// }

// const last = compose(first, reverse)
// console.log(last([1, 2, 3, 4]))

/**
 * 1-21 Lodash中的组合函数
 */
// // _.flowRight()函数
// const _ = require('lodash')

// const reverse = arr => arr.reverse()
// const first = arr => arr[0]
// const toUpper = s => s.toUpperCase()

// const f = _.flowRight(toUpper, first, reverse)
// console.log(f(['one', 'two', 'right']))// RIGHT

/**
 * 1-22 组合函数原理模拟
 */
// 模拟lodash中的flowRight
// const reverse = arr => arr.reverse()
// const first = arr => arr[0]
// const toUpper = s => s.toUpperCase()

// // 传统写法
// // function compose(...args){
// //   return function(value) {
// //     return args.reverse().reduce((acc, fn) => {
// //       return fn(acc)
// //     }, value)
// //   }
// // }

// // 箭头函数
  // const compose = (...args) => (value) => args
  // .reverse()
  // .reduce((acc, fn) => {
  //   return fn(acc)
  // }, value)

// const f = compose(toUpper, first, reverse)
// console.log(f(['one', 'two', 'right']))// RIGHT

/**
 * 1-23 函数组合-结合律
 */
// 函数组合要满足结合律
// const _ = require('lodash')

// const fn1 = _.flowRight(_.toUpper, _.first, _.reverse)
// const fn2 = _.flowRight(_.flowRight(_.toUpper,_.first), _.reverse)
// const fn3 = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))

// console.log(fn1(['one', 'two', 'right']))// RIGHT
// console.log(fn2(['one', 'two', 'right']))// RIGHT
// console.log(fn3(['one', 'two', 'right']))// RIGHT

/**
 * 1-24 函数组合-调试
 */
// // NEVER SAY DIE --> never-say-die
// const _ = require('lodash')

// // 跟踪调试
// const trace = _.curry((tag, v) => {
//   console.log(tag, v)
//   return v
// })
// // _.splite()
// const splite = _.curry((sep, str) => _.split(str, sep))
// // _.join
// const join = _.curry((sep, array) => _.join(array, sep))
// // _.map
// const map = _.curry((fn, array) => _.map(array, fn))

// const f = _.flowRight(join('-'),trace('map: ') , map(_.toLower) , trace('splite: '), splite(' '))

// console.log(f('NEVER SAY DIE'))
// // splite:  [ 'NEVER', 'SAY', 'DIE' ]
// // map:  [ 'never', 'say', 'die' ]
// // never-say-die

/**
 * 1-25 Lodash-fp模块
 */
// const fp = require('lodash/fp')

// const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))

// console.log(f('NEVER SAY DIE'))
// never-say-die

/**
 * 1-26 Lodash-map方法的小问题
 */
// const _ = require('lodash')

// console.log(_.map(['23', '8', '10'], parseInt))// [ 23, NaN, 2 ]
// // 结果与预期值不同，因为parseInt方法的第二个入参代表转换成几进制的值
// // parseInt('23', 0, array) // 0则默认为十进制
// // parseInt('8', 1, array) // 1为无效值
// // parseInt('10', 2, array) // 二进制

// const fp = require('lodash/fp')
// // fp模块 函数优先，参数置后
// console.log(fp.map(parseInt, ['23', '8', '10']))// [ 23, 8, 10 ]

/**
 * 1-27 PointFree
 */
// HELLO    WORLD-->hello-world
// const fp = require('lodash/fp')
// const fn = fp.flowRight(fp.replace(/\s+/g, '-'), fp.toLower)
// console.log(fn('HELLO    WORLD'))// hello-world


/**
 * 1-28 PointFree 案例
 */
// // 把字符串中的首字母提取并转换成大学，使用.作为分隔符
// // world wild web ==> W. W. W
// const fp = require('lodash/fp')

// // const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))
// const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

// console.log(firstLetterToUpper('world wild web'))// W. W. W

/**
 * functor函子
 */
// class Container {
//   constructor(value) {
//     this._value = value
//   }
  
//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }

// const fn = new Container(5).map(v => v + 1).map(v => v * v)
// console.log(fn)// Container { _value: 36 }

// class Container {
//   static of(value) {
//     return new Container(value)
//   }
//   constructor(value) {
//     this._value = value
//   }
  
//   map(fn) {
//     return Container.of(fn(this._value))
//   }
// }

// const fn = Container.of(5).map(v => v + 1).map(v => v * v)
// console.log(fn)// Container { _value: 36 }

/**
 * 1-30 Functor总结
 */
// 演示null undefined 的问题

// class Container {
//   static of(value) {
//     return new Container(value)
//   }
//   constructor(value) {
//     this._value = value
//   }
  
//   map(fn) {
//     return Container.of(fn(this._value))
//   }
// }

// Container.of(null).map(v => v.toUpperCase())
// // TypeError: Cannot read property 'toUpperCase' of null

/**
 * 1-31 MayBe函子
 */
// class MayBe {
//   static of(value) {
//     return new MayBe(value)
//   }
//   constructor(value) {
//     this._value = value
//   }
  
//   map(fn) {
//     return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
//   }

//   isNothing() {
//     return this._value === undefined || this._value === null
//   }
// }

// const r = MayBe.of('hello').map(v => v.toUpperCase())
// console.log(r)
// // MayBe { _value: 'HELLO' }
// console.log(MayBe.of(null).map(v => v.toUpperCase()))
// // MayBe { _value: null }

/**
 * 1-32 Either函子
 */
// // left
// class Left {
//   static of(value) {
//     return new Left(value)
//   }
//   constructor(value) {
//     this._value = value
//   }
  
//   map(fn) {
//     return this
//   }
// }
  
// // right
// class Right {
//   static of(value) {
//     return new Right(value)
//   }
//   constructor(value) {
//     this._value = value
//   }
  
//   map(fn) {
//     return Right.of(fn(this._value))
//   }
// }

// let r1 = Right.of(12).map(v => v + 2)
// let r2 = Left.of(12).map(v => v + 2)
// console.log(r1)
// console.log(r2)
// // Right { _value: 14 }
// // Left { _value: 12 }

// function parseJson(str) {
//   try {
//     return Right.of(JSON.parse(str))
//   } catch (e) {
//     return Left.of({error: e.message})
//   }
// }

// let r3 = parseJson('{name: zhangsan}')
// console.log(r3)
// // Left { _value: { error: 'Unexpected token n in JSON at position 1' } }

// let r4 = parseJson('{"name":"zhangsan"}')
//           .map(v => v.name.toUpperCase())
// console.log(r4)
// // Right { _value: { name: 'ZHANGSAN' } }

/**
 * 1-33 IO函子
 */
// const fp = require('lodash/fp')

// class IO {

//   static of(value) {
//     return new IO(function () {
//       return value
//     })
//   }
//   constructor(fn) {
//     this._value = fn
//   }

//   map(fn) {
//     return new IO(fp.flowRight(fn, this._value))
//   }
// }

// // 调用
// let r = IO.of(process).map(p => p.execPath)
// console.log(r)// IO { _value: [Function] }
// console.log(r._value())

/**
 * 1-34 Folktale
 */

//  const { compose, curry } = require('folktale/core/lambda')
//  const { toUpper, first } = require('lodash/fp')

//  const f = curry(2, (x, y) => {
//    return x + y
//  })

//  console.log(f(1)(2))// 3
//  console.log(f(1, 2))// 3

//  const f2 = compose(toUpper, first)
//  console.log(f2(['one', 'two']))// ONE

/**
 * 1-35 Task函子
 */
// const { task } = require('folktale/concurrency/task')
// const fs = require('fs')
// const { split, find } = require('lodash/fp')

// function readFile(filename) {
//   return task(resolver => {
//     fs.readFile(filename, 'utf-8', (err, data) => {
//       if(err) resolver.reject(err)
//       resolver.resolve(data)
//     })
//   })
// }
// readFile('package.json')
//         .map(split('\n'))
//         .map(find(x => x.includes('version')))
//         .run()
//         .listen({
//           onRejected: err => {
//             console.log(err)
//           },
//           onResolved: result => {
//             console.log(result)
//           }
//         })

/**
 * 1-36 Pointed函子
 */
// // 示例
// class Container {
//   static of (value) {
//     return new Container(value)
//   }

//   constructor(value) {
//     this._value = value
//   }

//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }

// Container.of(2).map(v => v / v)

/**
 * 1-37 IO函子问题
 */
// const fp = require('lodash/fp')
// const fs = require('fs')

// class IO {

//   static of(value) {
//     return new IO(function () {
//       return value
//     })
//   }
//   constructor(fn) {
//     this._value = fn
//   }

//   map(fn) {
//     return new IO(fp.flowRight(fn, this._value))
//   }
// }

// const readFile = function(filename) {
//   return new IO(() => {
//     return fs.readFileSync(filename, 'utf-8')
//   })
// }

// let print = function(x) {
//   return new IO(() => {
//     console.log(x)
//     return x
//   })
// }

// let cat = fp.flowRight(print, readFile)
// // IO(IO(x))
// let r = cat('package.json')._value()._value()
// console.log(r)
// // IO { _value: [Function] }

// // {
// //   "dependencies": {
// //     "lodash": "^4.17.15"
// //   }
// // }


/**
 * 1-38 Monad函子
 */
const fp = require('lodash/fp')
const fs = require('fs')

class IO {

  static of(value) {
    return new IO(function () {
      return value
    })
  }
  constructor(fn) {
    this._value = fn
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }

  join() {
    return this._value()
  }

  flatMap(fn) {
    return this.map(fn).join()
  }
}

const readFile = function(filename) {
  return new IO(() => {
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function(x) {
  return new IO(() => {
    console.log(x)
    return x
  })
}

const r = readFile('package.json')
          .map(v => v.toUpperCase())
          .flatMap(print)
          .join()
console.log(r)
/**
 * {
    "DEPENDENCIES": {
      "LODASH": "^4.17.15"
    }
  }
 */