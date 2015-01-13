describe("Amo Testing", function () {

    it("Create Keyframes", function () {

        var fadeKeyFrames = Amo.keyframes({
            'opacity': '0'
        }, {
            'opacity': '1'
        });

        expect(fadeKeyFrames.frameName).not.toBe(undefined);
        expect(fadeKeyFrames.animate).not.toBe(undefined);
        expect(fadeKeyFrames.style).not.toBe(undefined);

    });

    it("Create Animation", function () {

        var fadeAnimation = Amo.keyframes({
            'opacity': '0'
        }, {
            'opacity': '1'
        }).animate();

        expect(fadeAnimation.className).not.toBe(undefined);
        expect(fadeAnimation.run).not.toBe(undefined);

    });

});

describe("Animation on dom", function () {

    var fadeAnimation = Amo.keyframes({
        'opacity': '0'
    }, {
        'opacity': '0.8'
    }).animate({
        duration: 500
    });
    var node = $('body'),
        opacity;

    beforeEach(function (done) {
        fadeAnimation.run(node, function () {
            opacity = node.css('opacity');
            done();
        });
    });

    it("Animation callback test", function (done) {
        expect(opacity).not.toBe(0);
        done();
    });

});

describe("Animation on dom", function () {

    var fadeAnimation = Amo.keyframes({
        'background': '#000000'
    }, {
        'background': '#ffffff'
    }).animate({
        duration: 500,
        time: 3
    });
    var node = $('body'),
        opacity;

    beforeEach(function (done) {
        fadeAnimation.run(node, function () {
            opacity = node.css('background');
            done();
        });
    });

    it("Animation callback test", function (done) {
        expect(opacity).not.toBe(undefined);
        done();
    });

});
