export class Packet {
    end_packet: string;
    layer: string;
    overlays: Object[];
    overlay: any;
    duration: number;
    screens: any;
    // tslint:disable-next-line:7031
    constructor(
        end_packet: string,
        layer: string,
        overlays: Object[],
        overlay: any,
        duration: number,
        screens: any
    ) {
        this.end_packet = end_packet;
        this.layer = layer;
        this.overlay = overlay;
        this.overlays = overlays;
        this.duration = duration;
        if (screens) {
            this.screens = screens;
        } else {
            this.screens = {};
        }
    }
}
