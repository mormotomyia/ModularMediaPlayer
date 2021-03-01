# MediaTypes

## Video
- type: video
- source: videoFile (mp4,webm)

## Image
- type: image
- source: imageFile (png,jpg,gif)

## HTML
- type: json
- source: json
-spec:
```
{
    "root": ?!,
    "style": {
        // css style
    },
    "animate": {
        $element:
            {
            "keyframes": [[mdn spec](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)],
            "options": {[mdn spec](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)}
            }
    },
    "content": HTMLTemplate string
}
```