import 'regenerator-runtime/runtime';
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

import { EmsuWebSocketAdapter } from './adapters/emsu-websocket';

const websocketConn = 'statemachinemodule';
const downloadConn = 'servermodule:8080/static/content';

// const websocketConn = 'localhost';
// const downloadConn = 'localhost:8080';

// (async () => {
//     console.log('Did not execute here too.');
// })();

const impl = new EmsuWebSocketAdapter(websocketConn, downloadConn);
const adapter = new Adapter(impl);
adapter.start(test);

test.render();

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

// setTimeout(
//     () =>
//         test.setMedia(0, 100, [
//             {
//                 element: '0',
//                 type: 'video',
//                 source:
//                     'http://localhost:8080/36E24461A35436423C466818ECC02412',
//             },
//             {
//                 element: '1',
//                 type: 'image',
//                 source:
//                     'http://localhost:8080/9EA41E9A6007FEF75821347D1A66DD2D',
//             },
//         ]),
//     3000
// );

// setTimeout(
//     () =>
//         test.setMedia(0, 100, [
//             {
//                 element: '1',
//                 type: 'video',
//                 source:
//                     'http://localhost:8080/36E24461A35436423C466818ECC02412',
//             },
//             {
//                 element: '0',
//                 type: 'image',
//                 source:
//                     'http://localhost:8080/9EA41E9A6007FEF75821347D1A66DD2D',
//             },
//         ]),
//     6000
// );

// setTimeout(
//     () =>
//         test.setMedia(0, 100, [
//             {
//                 element: '0',
//                 type: 'image',
//                 source:
//                     'http://localhost:5051/5D8DFCAC2EF3B212E00FEA1DADAEA75A',
//             },
//         ]),
//     5000
// );
// // CBCC332870F45FB14F83B762FDE50297
// setTimeout(
//     () =>
//         test.setMedia(0, 100, [
//             {
//                 element: '0',
//                 type: 'image',
//                 source:
//                     'http://localhost:5051/CBCC332870F45FB14F83B762FDE50297',
//             },
//         ]),
//     7000
// );
// setTimeout(() => test.setMedia(1), 7500);
