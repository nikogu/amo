## amo.js

一个写css3动画的js库

#### 光速使用

##### 1. 引入amo.js，提供了cdn地址:

    <script src="https://a.alipayobjects.com/u/localhost/js/201412/47giqj9WZp.js"></script>

##### 2. 创建动画
    
    //创建css3动画
    //第一个参数为起始值，第二个为默认值，都是css属性
    var myAnim = Amo.createCssAnim({
        'opacity': 0,
        'top': '100px'
    }, {
        'opacity': 1,
        'top': '200px'
    });
    
    //你也可以创建多个动画帧
    var myAnim = Amo.createCssAnim({
        0: {
            top: '20px'
        },
        20: {
            top: '50px'
        },
        50: {
            top: '80px'
        },
        70: {
            top: '120px'
        },
        100: {
            top: '900px'
        }
    });

##### 3. 使用动画

    //首先传入需要应用的节点，可以是原生节点，也可以jquery节点对象
    myAnim.run(node, {
        duration: 1000, //动画持续时间(ms)
        easing: 'ease', //动画过渡动画，参看css3 animation 支持的动画easing
        time: 1, //动画播放次数
        delay: 1000, //动画延迟时间(ms)
        direction: 'alternate' //播放完以后是否倒顺播放
    }, function() {
        //动画执行完的回调函数
        console.log('over');
    });
    
##### 就是这么简单...
