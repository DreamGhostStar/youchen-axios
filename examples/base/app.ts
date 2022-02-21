import axios from '../../src/index'

// 检测参数值为基本数据类型
axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: 1,
        b: 2
    }
})

// 参数值为数组
axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: ['bar', 'baz']
    }
})

// 参数值为对象
axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: {
            bar: 'baz'
        }
    }
})

// 参数值为Date类型 
const date = new Date()

axios({
    method: 'get',
    url: '/base/get',
    params: {
        date
    }
})

// 特殊字符
axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: '@:$, '
    }
})

// 空值忽略
axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: 'bar',
        baz: null
    }
})

// 检测哈希标志，将其删去
axios({
    method: 'get',
    url: '/base/get#hash',
    params: {
        foo: 'bar'
    }
})

// 保留url中已存在参数
axios({
    method: 'get',
    url: '/base/get?foo=bar',
    params: {
        bar: 'baz'
    }
})