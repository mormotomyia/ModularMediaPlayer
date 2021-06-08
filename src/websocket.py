import asyncio
import websockets
import json

async def test():
    
    await asyncio.sleep(2)
    yield {"name":"Gustav", "age":12}


async def producer_handler(websocket, path):

    while True:
        async for message in test():
            try:
                
                await websocket.send(json.dumps(message))
            except websockets.exceptions.ConnectionClosedError:
                break
async def handler(websocket, path):
   
    producer_task = asyncio.ensure_future(
        producer_handler(websocket, path))
    done, pending = await asyncio.wait(
        [producer_task],
        return_when=asyncio.FIRST_COMPLETED,
    )
    for task in pending:
        task.cancel()

# async def hello(websocket, path):
#     uri = "ws://localhost:8765"
#     await websocket.send("test")
#     # print(f"> {name}")


if __name__ == "__main__":
    start_server = websockets.serve(handler, "localhost", 8765)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()