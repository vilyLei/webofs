import { WebOFS } from "../wofs/WebOFS";

export class DemoWebOFS {

	private m_wofs = new WebOFS();
    initialize(): void {
		console.log("DemoWebOFS::initialize() ...");
		this.m_wofs.initialize();
    }
    run(): void {
    }
}

export default DemoWebOFS;
