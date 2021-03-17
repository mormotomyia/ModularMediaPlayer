// // import { Packet } from "./packet";
// import { MediaCanvas, MediaType } from "../src/visuals/media-canvas";
// import ReconnectingWebSocket from "reconnecting-websocket";
// import { MediaCanvasFactory } from "./visuals/media-canvas-factory";
// import { CustomMormoVideo } from "./visuals/custom-video";

// function container_filler(screens: any){
//     for (const property in screens){
//         console.log(property)
//     }
//  }

//  function display_medium(object:{content_id:string,content_type:string}): string{
//      // new HTMLElement()
//      // document.createElement('div')
//      if (object.content_type !== undefined && object.content_id !== undefined){
//          return `<div id="${object.content_type}"> ${object.content_id}</div>`
//      }
//  }

// let websocket = (): ReconnectingWebSocket => {
//   const options = {
//     maxReconnectionDelay: 10000,
//     minReconnectionDelay: 1000 + Math.random() * 4000,
//     reconnectionDelayGrowFactor: 1.3,
//     minUptime: 5000,
//     connectionTimeout: 4000,
//     maxRetries: Infinity,
//     maxEnqueuedMessages: Infinity,
//     startClosed: false,
//     debug: false,
//   };
//   let connection = new ReconnectingWebSocket(
//     "ws://localhost:8765",
//     [],
//     options
//   );
//   return connection;
// };

// const test = new MediaCanvasFactory(
//   document.getElementById("container"),
//   3,
//   { x: 2 * 1080, y: 1920 + 540 },
//   {
//     0: { p1: { x: 0, y: 0 }, p2: { x: 1080, y: 1920 }, rotate: false },
//     1: { p1: { x: 1080, y: 0 }, p2: { x: 2160, y: 1920 }, rotate: false },
//     2: { p1: { x: 0, y: 1920 }, p2: { x: 1920, y: 1920 + 540 }, rotate: false },
//   },
//   true
// );

// test.render();

// // setTimeout(
// //   () =>
// //     test.setMedia(1, 40, [
// //       {
// //         element: "0",
// //         type: MediaType.Video,
// //         source: "http://localhost:5051/cut_high_video.webm",
// //       },
// //       {
// //         element: "1",
// //         type: MediaType.Video,
// //         source: "http://localhost:5051/cut_high_video.webm",
// //       },
// //       {
// //         element: "2",
// //         type: MediaType.Video,
// //         source: "http://localhost:5051/cut_video.mp4",
// //       },
// //     ]),
// //   500
// // );

// setTimeout(
//   () =>
//     test.setMedia(1, 40, [
//       {
//         element: "0",
//         type: MediaType.Image,
//         source: "http://localhost:5051/img1.jpg",
//       },
//       {
//         element: "2",
//         type: MediaType.Video,
//         source: "http://localhost:5051/cut_video.mp4",
//       },
//       {
//         element: "1",
//         type: MediaType.Image,
//         source: "http://localhost:5051/img1.jpg",
//       },
//     ]),
//   2500
// );

// setTimeout(
//   () =>
//     test.setMedia(1, 40, [
//       {
//         element: "0",
//         type: MediaType.Image,
//         source: "http://localhost:5051/img1.jpg",
//       },
//       {
//         element: "2",
//         type: MediaType.Video,
//         source: "http://localhost:5051/cut_video.mp4",
//       },
//       {
//         element: "1",
//         type: MediaType.Video,
//         source: "http://localhost:5051/cut_high_video.webm",
//       },
//     ]),
//   4500
// );

// // setTimeout(() => test.setMedia(1), 9500);
