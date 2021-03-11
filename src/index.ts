import { MediaCanvasFactory } from './visuals/media-canvas-factory';
import { Adapter } from './adapters/adapter';
//  ?x={"0":%20{"p1":%20{"x":%200,%20"y":%200},%20"p2":%20{"x":%201080,%20"y":%201920},%20"rotate":%20false}}
console.log(window.location.search);
const log = new URLSearchParams(window.location.search);
console.log(JSON.parse(log.get('x')));
console.log(JSON.stringify({ x: 'x' }));

const test = new MediaCanvasFactory(
    document.getElementById('container'),
    2,
    { x: 1080, y: 1920 * 2 },
    {
        0: {
            p1: { x: 0, y: 0 },
            p2: { x: 1080, y: 1920 },
            rotate: false,
        },
        1: {
            p1: { x: 0, y: 1920 },
            p2: { x: 1080, y: 1920 * 2 },
            rotate: false,
        },
    },

    true
);

// import { EmsuWebSocketAdapter } from './adapters/websocket';
// const impl = new EmsuWebSocketAdapter();
// const adapter = new Adapter(impl);
// adapter.start(test);

// test.render();

// setTimeout(
//     () =>
//         test.setMedia(0, 90, [
//             {
//                 element: '0',
//                 type: 'text',
//                 source: 'http://localhost:5051/banner.json',
//             },
//         ]),
//     1200
// );

setTimeout(
    () =>
        test.setMedia(0, 100, [
            {
                element: '0',
                type: 'image',
                source:
                    'http://localhost:5051/9163B84DB7D8A3FCB7FD750BC3B7F571',
            },
        ]),
    3000
);
setTimeout(
    () =>
        test.setMedia(0, 100, [
            {
                element: '0',
                type: 'image',
                source:
                    'http://localhost:5051/5D8DFCAC2EF3B212E00FEA1DADAEA75A',
            },
        ]),
    5000
);
// CBCC332870F45FB14F83B762FDE50297
setTimeout(
    () =>
        test.setMedia(0, 100, [
            {
                element: '0',
                type: 'image',
                source:
                    'http://localhost:5051/CBCC332870F45FB14F83B762FDE50297',
            },
        ]),
    7000
);
// setTimeout(() => test.setMedia(1), 7500);
