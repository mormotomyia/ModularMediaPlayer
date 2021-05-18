import 'regenerator-runtime/runtime';
import { MediaCanvasFactory } from './visuals/media-canvas-factory';
import { Adapter } from './adapters/adapter';
//  ?x={"0":%20{"p1":%20{"x":%200,%20"y":%200},%20"p2":%20{"x":%201080,%20"y":%201920},%20"rotate":%20false}}
// console.log(window.location.search);
// const log = new URLSearchParams(window.location.search);
// console.log(JSON.parse(log.get('x')));
// console.log(JSON.stringify({ x: 'x' }));

import { EmsuWebSocketAdapter } from './adapters/emsu-websocket';
import { IScreen } from './visuals/media-canvas';
let websocketConn;
let downloadConn;

// console.log(process.env.NODE_ENV);
// console.log(process.env.NODE_ENV.split('+'));

const envs = process.env.NODE_ENV.split('+');

if (envs[0] === 'production') {
    websocketConn = 'statemachinemodule';
    downloadConn = 'servermodule:8080/static/content';
} else {
    websocketConn = 'localhost';
    downloadConn = 'localhost:8080';
}
let screenSize;
let screenOrientation: IScreen;

if (envs[1] === 'spotlight') {
    screenSize = { x: 1080, y: 1920 * 2 };
    screenOrientation = {
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
    };
} else if (envs[1] === 'gondel') {
    screenSize = { x: 1080 * 2, y: 1920 + 540 };
    screenOrientation = {
        0: {
            p1: { x: 0, y: 0 },
            p2: { x: 1080, y: 1920 },
            rotate: false,
        },
        1: {
            p1: { x: 1080, y: 0 },
            p2: { x: 1080 * 2, y: 1920 },
            rotate: false,
        },
        2: {
            p1: { x: 0, y: 1920 },
            p2: { x: 1920, y: 1920 + 540 },
            rotate: false,
        },
    };
}

const mediaCanvasContainer = new MediaCanvasFactory(
    document.getElementsByTagName('body')[0],
    2,
    screenSize,
    screenOrientation,
    true
);

const impl = new EmsuWebSocketAdapter(websocketConn, downloadConn);
const adapter = new Adapter(impl, mediaCanvasContainer);
adapter.start();

mediaCanvasContainer.render();
