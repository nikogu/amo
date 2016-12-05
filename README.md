## amo.js  (๑‾ ꇴ ‾๑)

[![Join the chat at https://gitter.im/nikogu/amo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nikogu/amo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`A javascript library for creating CSS3 animation.`

[home page](http://nikogu.github.io/amo/)

![amo.js](https://i.alipayobjects.com/i/localhost/jpg/201501/4D9BIKtMNh.jpg "amo.js")

#### Guide  Ծ‸Ծ

##### 1. import amo.js

    <script src="./src/amo.js"></script>

##### 2. how to use
    
    //1. The node need to be animated
    var node = document.getElementById('animate-node');

    //2. Creating a css animation
    var fadeAnim = Amo.keyframes({
        'opacity': 0
    }, {
        'opacity': 1
    }).animate({
    //help: http://www.w3schools.com/css/css3_animations.asp
        mode: 'forwards',
        duration: 1000,
        easing: 'ease',
        time: 1,
        delay: 1000,
        direction: 'alternate'
    });

    //3. Running a css animation
    fadeAnim.run(node, function() {
        console.log('over');
    });

#### Detail  눈_눈

##### Amo.keyframe
Amo.keyframe is as same as css @keyframe

    /* css */
    @keyframes mymove {
        from {top:0px;}
        to {top:200px;}
    }
    ==>
    /* amo.js */
    Amo.keyframes({
        top: '0px'
    }, {
        top: '200px' 
    });
    
    
    /* css */
    @keyframes mymove {
        0%   {top:0px;}
        50%  {top:100px;}
        100% {top:20px;}
    }
    ==>
    /* amo.js */
    Amo.keyframes({
        0: {
            top: '0px' 
        },
        50: {
            top: '100px'
        },
        100: {
            top: '200px'
        }
    });
    
##### keyframe.animate & animate.run
you can create animate depend on keyframe

    /* css */
    @keyframes mymove {
        0%   {top:0px;}
        50%  {top:100px;}
        100% {top:20px;}
    }
    #test {
        animation: mymove 5s linear 2s infinite alternate;
    }
    =>
    /* amo.js */
    var mymove = Amo.keyframes({
        0: {
            top: '0px' 
        },
        50: {
            top: '100px'
        },
        100: {
            top: '200px'
        }
    });
    var myAnim = mymove.animate({
        duration: 5000,
        easing: 'linear',
        delay: 2000,
        time: -1,
        direction: 'alternate'
    });
    
    //$('#test') => ok
    //document.getElementById('test') => ok
    myAnim.run($('#test'), function() {
        console.log('animation over'); 
    });

##### animate instance 

    var myAnimIns = myAnim.run($('#test'), function() {
        console.log('animation over'); 
    });
    
    //you can stop the animation
    myAnimIns.stop();
    
    //you can start the animation too
    myAnimIns.start();
    
    //reset the animation
    myAnimIns.reset();

__You do not need care about the css animation's class and keyframes's style, focusing on animation is the only thing you need to do.__
