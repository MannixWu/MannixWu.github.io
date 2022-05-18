/*
 * @Date: 2021-06-24 01:03:56
 * @LastEditors: MannixWu
 * @LastEditTime: 2022-05-18 08:55:21
 * @FilePath: \p5test\sketch.js
 */
let img;
let t = 0;
var c_width, c_height;
var colorsList;
let capture;
function preload() {
    load();
    img = loadImage("assets/96426307_p1.png");
    // img = createCapture(VIDEO);
    img.size(700, 500);
}
function setup() {
    createCanvas(img.width, img.height);

    print(img.pixels.length);
}
function draw() {
    background(255);
    background(255);
    img.loadPixels();

    for (var y = 0; y < img.height; y++) {
        //print(y + " ; " + img.height);
        for (var x = 0; x < img.width; x++) {
            //print("=======")
            var i_color = readColor(img, x, y);
            var p_c = similar(i_color);
            var bias = {
                r: i_color.r - p_c.r,
                g: i_color.g - p_c.g,
                b: i_color.b - p_c.b,
            };
            writeColor(img, x, y, p_c);
            var color1 = readColor(img, x + 1, y);
            var color2 = readColor(img, x, y + 1);
            var color3 = readColor(img, x + 1, y + 1);
            color1.r = limit((bias.r * 3) / 8 + color1.r, 0, 255);
            color1.g = limit((bias.g * 3) / 8 + color1.g, 0, 255);
            color1.b = limit((bias.b * 3) / 8 + color1.b, 0, 255);
            color2.r = limit((bias.r * 3) / 8 + color2.r, 0, 255);
            color2.g = limit((bias.g * 3) / 8 + color2.g, 0, 255);
            color2.b = limit((bias.b * 3) / 8 + color2.b, 0, 255);
            color3.r = limit((bias.r * 2) / 8 + color3.r, 0, 255);
            color3.g = limit((bias.g * 2) / 8 + color3.g, 0, 255);
            color3.b = limit((bias.b * 2) / 8 + color3.b, 0, 255);
            writeColor(img, x + 1, y, color1);
            writeColor(img, x, y + 1, color2);
            writeColor(img, x + 1, y + 1, color3);
        }
    }
    img.updatePixels();
    background(127);
    image(img, 0, 0);
    // text(frameRate(),0,100);
    noLoop()
    //image(img, 0, 0);
}
function writeColor(image, x, y, color) {
    //color.a=255;
    let index = (x + y * width) * 4;
    image.pixels[index] = color.r;
    image.pixels[index + 1] = color.g;
    image.pixels[index + 2] = color.b;
    //image.pixels[index + 3] = color.a;
}

function readColor(image, x, y) {
    let index = (x + y * width) * 4;
    return {
        r: image.pixels[index],
        g: image.pixels[index + 1],
        b: image.pixels[index + 2],
        a: image.pixels[index + 3],
    };
}
function limit(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function similar(color) {
    var j, k;
    j = 100000000000000;
    var c1 = color; //= toRGB(color)
    for (let i = 0; i < colorsList.length; i++) {
        var c2 = colorsList[i];
        //var l = Math.pow(color.h - blockColor.h, 2) + Math.pow(color.s - blockColor.s, 2) + Math.pow(color.v - blockColor.v, 2);
        //var l = Math.pow(c1.v-c2.v,2)+Math.pow(c1.s*c1.v,2)+Math.pow(c2.s*c2.v,2)-2*c1.s*c1.v*c2.s*c2.v*Math.cos((c1.h-c2.h)*Math.PI/180);
        var l = colorDistance(c1, c2) / colorsList[i].l;
        if (l < j) {
            j = l;
            k = i;
        }
    }
    return colorsList[k];
}

function colorDistance(c1, c2) {
    let rmean = (c1.r + c2.r) / 2;
    let R = c1.r - c2.r;
    let G = c1.g - c2.g;
    let B = c1.b - c2.b;
    return Math.sqrt(
        (2 + rmean / 256) * (R * R) +
            4 * (G * G) +
            (2 + (255 - rmean) / 256) * (B * B)
    );
}

function toColor(c) {
    return color(c.r, c.g, c.b);
}

function load() {
    colorsList = [
        {
            //灰色
            r: 167,
            g: 167,
            b: 167,
            l: 0.5,
        },
        {
            //天蓝色
            r: 109,
            g: 224,
            b: 255,
            l: 1,
        },
        {
            //紫色
            r: 149,
            g: 90,
            b: 255,
            l: 0.75,
        },
        {
            //绿色
            r: 99,
            g: 218,
            b: 56,
            l: 1,
        },
        {
            //黄色
            r: 251,
            g: 208,
            b: 79,
            l: 1,
        },
        {
            //橙色
            r: 255,
            g: 149,
            b: 0,
            l: 1,
        },
        {
            //红色
            r: 243,
            g: 25,
            b: 25,
            l: 1,
        },
        {
            //白色
            r: 255,
            g: 255,
            b: 255,
            l: 1,
        },
        {
            //黑色
            r: 0,
            g: 0,
            b: 0,
            l: 1,
        },
    ];

    // colorsList = [{ //红色
    //     r: 196,
    //     g: 30,
    //     b: 58,
    //     l: 1
    // }, { //绿色
    //     r: 0,
    //     g: 158,
    //     b: 96,
    //     l: 1
    // }, { //蓝色
    //     r: 0,
    //     g: 81,
    //     b: 186,
    //     l: 1
    // }, { //橙色
    //     r: 255,
    //     g: 88,
    //     b: 0,
    //     l: 1
    // }, { //黄色
    //     r: 255,
    //     g: 213,
    //     b: 0,
    //     l: 1
    // }, { //白色
    //     r: 255,
    //     g: 255,
    //     b: 255,
    //     l: 1
    // }]
}

