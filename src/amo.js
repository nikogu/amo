/**
 * amo.js
 * easy to use css animation
 *
 * @author niko
 * @date 2014-12-31
 */
;
(function (exports) {

    var Animations = {};

    //util function
    function inArray(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (item == arr[i]) {
                return i;
            }
        }
        return -1;
    }

    function isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]' || arr.length !== undefined;
    }

    function isNumber(num) {
        return Object.prototype.toString.call(num) === '[object Number]';
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

    function getRandomFrameName() {
        return 'Amo-frame-' + Math.floor(Math.random() * 10000000);
    }

    function getRandomTName() {
        return 'Amo-transition-' + Math.floor(Math.random() * 10000000);
    }

    function createAnimStyle(name, from, to) {

        var keyframes = ['keyframes', '-webkit-keyframes', '-o-keyframes', '-moz-keyframes'];
        var fullStyle = '';

        var style = '{';

        if (to) {
            style += '0% {';
            for (var prop in from) {
                style += prop + ':';
                style += from[prop] + ';';
            }
            style += '}';

            style += '100% {';
            for (var prop in to) {
                style += prop + ':';
                style += to[prop] + ';';
            }
            style += '}';
        } else {
            for (var prop in from) {
                if (isNumber(prop * 1) && from.hasOwnProperty(prop)) {
                    style += prop + '% {';
                    for (var p in from[prop]) {
                        style += p + ':';
                        style += from[prop][p] + ';';
                    }
                    style += '}';
                }
            }
        }

        style += '}';

        //兼容性
        for (var i = 0; i < keyframes.length; i++) {
            fullStyle += '@' + keyframes[i] + ' ' + name;
            fullStyle += style;
        }

        return fullStyle;
    }

    function createCssTransition(animName, duration, easing, time, delay, direction, mode) {

        var transitions = ['animation', '-webkit-animation', '-o-animation', '-moz-animatin'],
            style = '';

        var className = getRandomTName();

        style += '.' + className + '{';
        for (var i = transitions.length; i--;) {
            style += transitions[i] + '-name:' + animName + ';';
            style += transitions[i] + '-duration:' + (duration / 1000) + 's;';
            style += transitions[i] + '-timing-function:' + easing + ';';
            style += transitions[i] + '-iteration-count:' + time + ';';
            style += transitions[i] + '-fill-mode:'+mode+';';
            style += transitions[i] + '-delay:' + delay + ';';
            style += transitions[i] + '-direction:' + direction + ';';
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

        var className = createCssTransition(this.frameName, duration, easing, time, delay, direction, mode);

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

        if (isArray(node)) {
            Array.prototype.forEach.call(node, function (item) {
                removeClass(item, className);
                setTimeout(function() {
                    addClass(item, className);
                }, 0);
            });
        } else {
            removeClass(node, className);
            setTimeout(function() {
                addClass(node, className);
            }, 0);
        }

        if (isNumber(time)) {
            setTimeout(function () {
                //removeClass(node, className);
                if (callback) {
                    callback();
                }
            }, duration * time);
        }
    }

    var Amo = {
        keyframes: keyframes
    };

    exports.Amo = Amo;

})(window);