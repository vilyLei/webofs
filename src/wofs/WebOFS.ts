import { IFileUrlObj } from "./base/IFileUrlObj";
import { DropFileController } from "./base/DropFileController";

class WebOFS {
	private m_init = true;
	// private m_pastingDiv: HTMLDivElement = null;
	readonly dropController = new DropFileController();
	pastingHTMLElement: HTMLElement = null;
	savingFileData: ArrayBuffer | string | HTMLCanvasElement | HTMLImageElement = null;
	savingFileName: string = "default.bin";
	pngEnabled = false;
	constructor() {}
	setListener(listener: (files: IFileUrlObj[], opType?: string) => void): void {
		this.dropController.setListener(listener);
	}
	initialize(): void {
		if (this.m_init) {
			this.initPaste();
			let platform = navigator.platform as any;
			window.addEventListener(
				"keydown",
				(e: any): void => {
					if (platform && platform.match("Mac") ? e.metaKey : e.ctrlKey) {
						let prevent = false;
						switch (e.keyCode) {
							case 83:
								// ctrl + S
								prevent = true;
								this.saveFile();
								break;
							case 79:
								// ctrl + O
								this.openDir();
								prevent = true;
								break;
							default:
								break;
						}
						if (prevent) {
							e.preventDefault();
						}
					}
				},
				false
			);
			this.m_init = false;
		}
	}
	private initPaste(): void {
		let pwin: any = window;
		console.log("pasting function init ...");
		let ele = this.pastingHTMLElement ? this.pastingHTMLElement : document;
		// 此事件监听添加在document上，该事件会有冒泡行为，则本页面上任何地方的粘贴操作都会触发
		ele.addEventListener("paste", (e: any): void => {
			console.log("##### ImageFileReader::initPaste(), e: ", e);

			const items = (e.clipboardData || pwin.clipboardData).items;
			if (items && items.length) {
				let files = [];
				for (let i = 0; i < items.length; i++) {
					let file = items[i].getAsFile();
					if (file) {
						files.push(file);
					}
				}
				if (files.length > 0) {
					console.log("##### pasting files: ", files);
					this.dropController.initFilesLoad(files);
				}
			}
		});
	}
	createCanvasData(srcImg: HTMLImageElement | HTMLCanvasElement): string {
		const canvas = document.createElement("canvas");
		canvas.width = srcImg.width;
		canvas.height = srcImg.height;
		canvas.style.backgroundColor = "transparent";
		const ctx2d = canvas.getContext("2d");
		ctx2d.drawImage(srcImg, 0, 0, srcImg.width, srcImg.height, 0, 0, canvas.width, canvas.height);
		if (this.pngEnabled) {
			return canvas.toDataURL("image/png");
		} else {
			return canvas.toDataURL("image/jpeg");
		}
	}
	saveFile(fileName: string = "", fileData: ArrayBuffer | string | HTMLCanvasElement | HTMLImageElement = null): void {
		if (fileName == "") {
			fileName = this.savingFileName;
		}
		if (fileData == null) {
			fileData = this.savingFileData;
		}
		let isImage = fileData instanceof HTMLCanvasElement || fileData instanceof HTMLImageElement;
		if (fileData) {
			let url = "";
			if (isImage) {
				url = this.createCanvasData(fileData as HTMLCanvasElement | HTMLImageElement);
			} else {
				let mime_type = fileData instanceof ArrayBuffer ? "application/octet-stream" : "text/plain";
				const blob = new Blob([fileData as ArrayBuffer | string], {
					type: mime_type
				});
				url = window.URL.createObjectURL(blob);
			}
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			(a as any).style = "display: none";
			a.click();
			window.URL.revokeObjectURL(a.href);
			a.remove();
		}
	}
	openDir(): void {
		const input = document.createElement("input");
		input.type = "file";
		input.addEventListener("change", () => {
			let files = Array.from(input.files);
			this.dropController.initFilesLoad(files, "dir_select");
		});
		input.click();
	}
	destroy(): void {}
}

export { IFileUrlObj, WebOFS, DropFileController };
