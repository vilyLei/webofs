import { ImagePlayer } from "./imgPlayer/ImagePlayer";

export class DemoBase {

	private m_imgPlayer = new ImagePlayer();
    initialize(): void {
		console.log("DemoBase::initialize() ...");
		this.m_imgPlayer.initialize();
    }
    run(): void {
    }
}

export default DemoBase;
