/*!
 * amo.js
 * easy to use css animation
 * http://nikogu.github.com/amo
 *
 * @author niko
 * @date 2014-12-31
 */
;
(function (exports) {

    var Animations = {},
        prefix = ['', '-webkit-'];

    //util function
    function inArray(arr, item) {
        return arr.indexOf(item);
    }

    function isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]' || arr.length !== undefined;
    }

    function isNumber(num) {
        return Object.prototype.toString.call(num) === '[object Number]' && !isNaN(num);
    }

    function all(items, callback) {
        if (isArray(items)) {
            Array.prototype.forEach.call(items, function (item) {
                callback(item);
            });
        } else {
            callback(items);
        }
    }

    function addClass(node, clazz) {
        var classArr = node.className.split(' ');
        if (inArray(classArr, clazz) == -1) {
            classArr.push(clazz);
            node.className = classArr.join(' ');
        }
    }

    function removeClass(node, clazz) {
        var classArr = node.className.split(' ');
        var index = inArray(classArr, clazz);
        if (index >= 0) {
            classArr.splice(index, 1);
            node.className = classArr.join(' ');
        }
    }

    //Array.prototype.map compatibility
    //for mobile?
    (function () {
        if (!Array.prototype.map) {
            Array.prototype.map = function (callback, thisArg) {

                var T, A, k;

                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if ({}.toString.call(callback) != "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }
                if (thisArg) {
                    T = thisArg;
                }
                A = new Array(len);
                k = 0;
                while (k < len) {
                    var kValue, mappedValue;
                    if (k in O) {
                        kValue = O[ k ];
                        mappedValue = callback.call(T, kValue, k, O);
                        A[ k ] = mappedValue;
                    }
                    k++;
                }
                return A;
            };
        }
    })();

    //++++++++++++++++++++++
    //The Sea.js plugin for embedding style text in JavaScript code
    //https://github.com/seajs/seajs-style
    //author @army8735
    //++++++++++++++++++++++
    var importStyle = (function importStyle() {

        var RE_NON_WORD = /\W/g
        var doc = document
        var head = document.getElementsByTagName('head')[0] ||
            document.documentElement
        var styleNode;

        var handle = function (cssText, id) {
            if (id) {
                // Convert id to valid string
                id = id.replace(RE_NON_WORD, '-')

                // Don't add multiple times
                if (doc.getElementById(id)) return
            }

            var element;

            // Don't share styleNode when id is spectied
            if (!styleNode || id) {
                element = doc.createElement('style')
                id && (element.id = id)

                // Adds to DOM first to avoid the css hack invalid
                head.appendChild(element)
            } else {
                element = styleNode
            }

            // IE
            if (element.styleSheet !== undefined) {

                // http://support.microsoft.com/kb/262161
                if (doc.getElementsByTagName('style').length > 31) {
                    throw new Error('Exceed the maximal count of style tags in IE')
                }

                element.styleSheet.cssText += cssText
            }
            // W3C
            else {
                element.appendChild(doc.createTextNode(cssText))
            }

            if (!id) {
                styleNode = element
            }
        }

        return handle;

    })();

    //++++++++++++++++++++++
    // create & init css3 animation style
    //++++++++++++++++++++++
    function getRandomFrameName() {
        return 'Amo-frame-' + Math.floor(Math.random() * 10000000);
    }

    function getRandomTName() {
        return 'Amo-transition-' + Math.floor(Math.random() * 10000000);
    }

    function num2string(key, val) {
        if ( isNumber(val*1) ) {
            return val + 'px';
        } else {
            return val;
        }
    }

    function formatStyle(o, prop) {
        var s = '',
            p = prop.toLowerCase()
        if ( p == '-webkit-transform' || p == 'transform') {
            s += '-webkit-transform:';
            s += o[prop] + ';';
            s += 'transform:';
            s += o[prop] + ';';
        } else {
            s += prop + ':';
            s += num2string(prop, o[prop]) + ';';
        }
        return s;
    }

    function createAnimStyle(name, from, to) {

        var keyframes = prefix.map(function (val) {
            return val + 'keyframes';
        });
        var fullStyle = '';

        var style = '{';

        if (to) {
            style += '0% {';
            for (var prop in from) {
                style += formatStyle(from, prop);
//                style += prop + ':';
//                style += from[prop] + ';';
            }
            style += '}';

            style += '100% {';
            for (var prop in to) {
                style += formatStyle(to, prop);
//                style += prop + ':';
//                style += to[prop] + ';';
            }
            style += '}';
        } else {
            for (var prop in from) {
                if (isNumber(prop * 1) && from.hasOwnProperty(prop)) {
                    style += prop + '% {';
                    for (var p in from[prop]) {
                        style += formatStyle(from[prop], p);
//                        style += p + ':';
//                        style += from[prop][p] + ';';
                    }
                    style += '}';
                }
            }
        }

        style += '}';

        //compatibility
        for (var i = 0; i < keyframes.length; i++) {
            fullStyle += '@' + keyframes[i] + ' ' + name;
            fullStyle += style;
        }

        return fullStyle;
    }

    function createCssAnimation(animName, duration, easing, time, delay, direction, mode) {

        var animations = prefix.map(function (val) {
                return val + 'animation';
            }),
            style = '';

        var className = getRandomTName();

        style += '.' + className + '{';
        for (var i = animations.length; i--;) {
            style += animations[i] + '-name:' + animName + ';';
            style += animations[i] + '-duration:' + (duration / 1000) + 's;';
            style += animations[i] + '-timing-function:' + easing + ';';
            style += animations[i] + '-iteration-count:' + time + ';';
            style += animations[i] + '-fill-mode:' + mode + ';';
            style += animations[i] + '-delay:' + delay + ';';
            style += animations[i] + '-direction:' + direction + ';';
        }
        style += '}';

        importStyle(style);

        return className;
    }

    //create css keyframes
    function keyframes(from, to) {

        var frameName = getRandomFrameName();

        Animations[frameName] = {
            frameName: frameName,
            style: createAnimStyle(frameName, from, to),
            animate: animate
        };

        importStyle(Animations[frameName].style);

        return Animations[frameName];
    }

    //create css animate class
    function animate(conf) {

        var conf = conf || {};

        var time = conf.time || 1;
        if (time < 0) {
            time = 'infinite';
        }

        var duration = conf.duration || 1000,
            easing = conf.easing || 'ease',
            delay = conf.delay || 0,
            direction = conf.direction || 'normal',
            mode = conf.mode || 'forwards';

        var className = createCssAnimation(this.frameName, duration, easing, time, delay, direction, mode);

        return {
            className: className,
            time: time,
            duration: duration,
            run: run
        }
    }

    function run(node, callback) {

        var className = this.className,
            duration = this.duration,
            time = this.time;

        all(node, function (item) {
            removeClass(item, className);
        });
        setTimeout(function () {
            all(node, function (item) {
                addClass(item, className);
            })
        }, 16.66);

        var ins = {
            className: className,
            node: node,
            time: time,
            duration: duration,
            callback: callback,
            stop: stop,
            start: start,
            reset: reset
        };

        ins.start();

        return ins;
    }

    //++++++++++++++++++++++
    // animation instance function
    //++++++++++++++++++++++
    function stop() {
        var that = this;
        if (isNumber(that.time) && that.callback) {
            that.state = 'stop';
            that.stopTime = new Date().getTime();
        }
        all(that.node, function (item) {
            addClass(item, 'amo-animation-pause');
        });
    }

    function start() {
        var that = this;
        if (isNumber(that.time) && that.callback) {
            if (that.state == 'stop') {
                all(that.node, function(item) {
                    removeClass(item, 'amo-animation-pause');
                });
            }

            if ( that.state != 'running' && !that.isOver) {
                that.state = 'running';
                that.startTime = new Date().getTime();
                all(that.node, function(item) {
                    item.addEventListener('webkitAnimationEnd', function() {
                        if ( !that.isOver ) {
                            that.callback();
                        }
                        that.isOver = true;
                    });
                    item.addEventListener('animationEnd', function() {
                        if ( !that.isOver ) {
                            that.callback();
                        }
                        that.isOver = true;
                    });
                });
            }
        } else {
            all(that.node, function(item) {
                removeClass(item, 'amo-animation-pause');
            });
        }
    }

    function reset() {
        var that = this;
        that.isOver = false;
        that.state = '';
        all(that.node, function(item) {
            removeClass(item, that.className);
        });
        setTimeout(function () {
            all(that.node, function (item) {
                addClass(item, that.className);
            });
        }, 16.66);
        that.start();
    }

    //++++++++++++++++++++++
    // init - insert a pause animate style
    //++++++++++++++++++++++
    (function () {
        var style = '.amo-animation-pause { ';
        for (var i = prefix.length; i--;) {
            style += prefix[i] + 'animation-play-state: paused !important;';
        }
        style += '}';
        importStyle(style);
    })();

    var Amo = {
        keyframes: keyframes
    };

    exports.Amo = Amo;

})(window);