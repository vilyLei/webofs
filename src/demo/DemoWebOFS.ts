import { IFileUrlObj, WebOFS } from "../wofs/WebOFS";

export class DemoWebOFS {
	private m_wofs = new WebOFS();
	initialize(): void {
		console.log("DemoWebOFS::initialize() ...");
		this.initFS();
		this.init();
	}
	private initFS(): void {
		this.m_wofs.initialize();
		this.m_wofs.setListener( (files: IFileUrlObj[], opType?: string): void => {
			console.log("get files: ", files);
		});
		this.m_wofs.dropController.initialize(document.body)
	}
	private init(): void {
		let url = "static/assets/box.jpg";
		let img = new Image();
		img.crossOrigin = "Anonymous";
		img.onload = (evt: any): void => {
		}
		img.src = url;
		document.body.appendChild(img);

		let ofs = this.m_wofs;
		let styleBtn = document.createElement("button");
		styleBtn.innerHTML = "点击保存图片";
		styleBtn.onclick = (): void => {
			console.log("保存图片");
			// this.filesys.saveImg();
			ofs.saveFile("ttt.jpg", img);
			// ofs.openDir();
		};
		document.body.appendChild(styleBtn);
		this.layout(styleBtn.style);
	}
	private layout(style: CSSStyleDeclaration): void {
		style.display = "bolck";
		style.position = "absolute";
		style.left = "50px";
		style.top = "180px";
	}
	run(): void {}
}

export default DemoWebOFS;
