/**
 * 1-2 内存管理
 */
// // 申请
// let obj = {}

// // 使用
// obj.name = 'lg'

// // 释放
// obj = null

/**
 * 1-3 JS中的垃圾回收
 */

 /**
  * 1-4 GC算法介绍
  */
 // 程序中不再需要使用的对象
//  function fn1() {
//    name = 'lg'
//    return `${name} is a coder`
//  }
//  fn1()

//  // 程序中不能再访问到的对象
//  function fn2() {
//    const name = 'lg'
//    return `${name} is a coder`
//  }
//  fn2()

/**
 * 1-5 引用计数算法实现原理
 */

/**
 * 1-6 引用计数算法优缺点
 */
// 循环引用
// function fn() {
//   const o1 = {}
//   const o2 = {}

//   o1.name = o2
//   o2.name = o1

//   return 'lg is a coder'
// }

// fn()

/**
 * 1-19 任务管理器监控内存
 */

 