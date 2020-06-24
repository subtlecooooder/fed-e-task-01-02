# Part1模块2作业（由于学习和作业内容调整，本次作业内容包含部分模块1作业题目）

## 1. 基于以下代码完成下面的四个练习（模块1代码题第2题）
```js
const fp = require('lodash/fp')
// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [{
  name: 'Ferrari FF', 
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true
},{
  name: 'Spyker C12 Zagato', 
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false
},{
  name: 'Jaguar XKR-S', 
  horsepower: 550,
  dollar_value: 132000,
  in_stock: true
},{
  name: 'Audi R8', 
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false
},{
  name: 'Aston Martin One-77', 
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true
},{
  name: 'Pagani Huayra', 
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false
}]
```

### 练习1：使用函数组合fp.flowRight()重新实现下面这个函数
- 题目
```js
let isLastInStock = function(cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars)
  // 获取最后一条数据的in_stock属性值
  return fp.prop('in_stock', last_car)
}
```
- 答案
```js
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
```

### 练习2：使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
- 答案
```js
let getFirstName = fp.flowRight(fp.prop('name'), fp.first)
```

### 练习3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
- 题目
```js
let _average = function(xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}// 无需改动

let averageDollarValue = function(cars) {
  let dollar_value = fp.map(function(car) {
    return car.dollar_value
  }, cars)
  console.log(dollar_value)
  return _average(dollar_value)
}
```
- 答案
```js
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
```

### 练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]
- 答案
```js
let _underscore = fp.replace(/\W+/g, '_')//无需改动，在sanitizeNames中使用

// 方案1
let sanitizeNames = fp.flowRight(fp.map(_underscore), fp.map(fp.toLower))
// 优化方案
let sanitizeNames1 = fp.map(fp.flowRight(_underscore, fp.toLower))

```

## 2. 基于以下代码完成后续的四个练习（模块1代码题第3题）
- 题目
```js
class Container {
  static of(value) {
    return new Container(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return new Container(fn(this._value))
  }
}

class Maybe {
  static of(x) {
    return new Maybe(x)
  }

  constructor(x) {
    this._value = x
  }

  isNothing() {
    return this._value === null ||this._value === undefined
  }

  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

module.exports = {
  Container,
  Maybe
}
```
### 练习1：使用fp.add(x, y)和fp.map(f, x)创建一个能让functor里的值增加的函数ex1
- 答案
```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
  // 让functor中的值加一
  return maybe.map(fp.map(fp.add(1)))
}
```

### 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素
- 答案
```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
  return xs.map(fp.first)._value
}
```

### 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
- 答案
```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let safeProp = fp.curry(function(x, o) {
  return Maybe.of(o[x])
})

let user = {id: 2, name: 'Albert'}
let ex3 = () => {
  return fp.first(safeProp('name', user)._value)
}
```

### 练习4：使用Maybe重写ex4，不要有if语句
- 答案
```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
// 原代码
// let ex4 = function(n) {
//   if(n) {
//     return parseInt(n)
//   }
// }
// 优化代码
let ex4 = (n) => {
  return Maybe.of(n).map(parseInt)._value
}
```

## 3. 手写实现MyPromise源码（模块1代码题第4题）
```js
const PENDING = 'pending'// 等待
const FULFILLED = 'fulfilled'// 成功
const REJECTED = 'rejected'// 失败
class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      thjis.reject(error)
    }
  }
  // promise状态
  status = PENDING
  // 成功后的值
  value = undefined
  // 失败后的原因
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []

  resolve = value => {
    // 如果状态不是等待，阻止程序向下执行
    if(this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在，如果存在则调用
    // this.successCallback && this.successCallback(this.value)
    while(this.successCallback.length) this.successCallback.shift()()
  }

  reject = reason => {
    // 如果状态不是等待，阻止程序向下执行
    if(this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
    // 判断失败回调是否存在，如果存在则调用
    // this.failCallback && this.failCallback(this.reason)
    while(this.failCallback.length) this.failCallback.shift()()
  }

  then = (successCallback, failCallback) => {
    successCallback = successCallback ? successCallback : val => val
    failCallback = failCallback ? failCallback : reason => {throw error}
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            // 判断x的值是普通值还是promise对象
            // 如果是普通值，直接调用resolve
            // 如果是promise对象，查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve还是reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }else if(this.status === REJECTED){
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            // 判断x的值是普通值还是promise对象
            // 如果是普通值，直接调用resolve
            // 如果是promise对象，查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve还是reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              // 判断x的值是普通值还是promise对象
              // 如果是普通值，直接调用resolve
              // 如果是promise对象，查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve还是reject
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              // 判断x的值是普通值还是promise对象
              // 如果是普通值，直接调用resolve
              // 如果是promise对象，查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve还是reject
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
      }
    })
    return promise2
  }

  finally = (callback) => {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback()).then(() => {throw reason})
    })
  }

  catch = (failCallback) => {
    return this.then(undefined, failCallback)
  }

  static all = (array) => {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index++
        if(index === array.length){
          resolve(result)
        }
      }
      for(let i = 0; i < array.length; i++){
        let current = array[i]
        if(current instanceof MyPromise) {
          // promise对象
          current.then(value => addData(i, value), reason => reject(reason))
        }else {
          // 普通值
          addData(i, array[i])
        }
      }
    })
  }

  static resolve = (value) => {
    if(value instanceof MyPromise) {
      // promise对象
      return value
    }else {
      // 普通值
      return new MyPromise(resolve => resolve(value))
    }
  }
 }

 function resolvePromise(promise2, x, resolve, reject) {
   if(promise2 === x) {
     return reject(new TypeError('Chainng cycle detected for promise #<Promise>'))
   }
  if(x instanceof MyPromise) {
    // MyPromise对象
    // x.then(value => resolve(value), reason => reject(reason))
    x.then(resolve, reject)
  }else {
    // 普通值
    resolve(x)
  }
 }

 module.exports = MyPromise
```
## 4. 描述引用计数的工作原理和优缺点（模块2第10题）
1. **优点**
  - 发现垃圾时立即回收
  - 最大限度减少程序暂停

2. **缺点**
  - 无法回收循环引用的对象
  - 时间开销大

## 5. 描述标记整理算法的工作流程（模块2第11题）
1. 分为标记、整理和清除三个阶段完成
2. 遍历所有对象并**对活动对象进行标记**
3. 清除阶段会先执行整理，移动对象位置
4. 遍历所有对象**清除没有标记对象**
  ![图示1](https://github.com/ALLTAKENS/MarkDownImg/blob/master/%E6%A0%87%E8%AE%B0%E6%95%B4%E7%90%86%E7%AE%97%E6%B3%95%E5%9B%BE%E7%A4%BA(1).jpg?raw=true)
  ![图示2](https://github.com/ALLTAKENS/MarkDownImg/blob/master/%E6%A0%87%E8%AE%B0%E6%95%B4%E7%90%86%E7%AE%97%E6%B3%95%E5%9B%BE%E7%A4%BA(2).jpg?raw=true)
  ![图示3](https://github.com/ALLTAKENS/MarkDownImg/blob/master/%E6%A0%87%E8%AE%B0%E6%95%B4%E7%90%86%E7%AE%97%E6%B3%95%E5%9B%BE%E7%A4%BA(3).jpg?raw=true)

## 6. 描述V8中新生代存储区垃圾回收的流程（模块2第12题）
1. **内存分配**
  - V8内存空间一分为二
  - 小空间用于存储新生代对象（32M|16M）
  - 新生代指的是存活时间较短的对象

2. **回收实现**
  - 回收过程采用复制算法+标记整理
  - 新生代内存区分为两个等大小空间
  - 使用空间为From，空闲空间为To
  - 活动对象存储于From空间
  - 标记整理后将活动对象拷贝至To
  - From与To交换空间完成释放

3. **回收细节说明**
  - 拷贝过程中可能出现晋升
  - 晋升就是将新生代对象移动至老生代
  - 一轮GC还存活的新生代需要晋升
  - To空间的使用率超过25%


## 7. 描述增量标记算法在何时使用及工作原理（模块2第13题）
1. 用于回收老生代对象时。
2. **目的**：为了降低堆垃圾回收带来的停顿时间
3. **原理**：将标记拆分为许多小步进，每一个步进完成时，就让js逻辑执行一小会。垃圾回收和逻辑执行交替进行，直到标记阶段完成。而后续的清理和整理也分别采用延迟清理和增量整理
  ![增量标记](https://github.com/ALLTAKENS/MarkDownImg/blob/master/%E5%A2%9E%E9%87%8F%E6%A0%87%E8%AE%B0%E7%AE%97%E6%B3%95%E4%BC%98%E5%8C%961.jpeg?raw=true)
