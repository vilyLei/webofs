class ImageFileSystem {
	img: HTMLImageElement = null;
	initialize(): void {
		this.init();
	}

	private init(): void {

		let url = "static/assets/box.jpg";
		let img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = url;
		document.body.appendChild(img);
		this.img = img;
	}
	private createCanvasData(srcImg: HTMLImageElement | HTMLCanvasElement): string {
		const canvas = document.createElement("canvas");
		canvas.width = srcImg.width;
		canvas.height = srcImg.height;
		canvas.style.backgroundColor = "transparent";
		const ctx2d = canvas.getContext("2d");
		ctx2d.drawImage(srcImg, 0, 0, srcImg.width, srcImg.height, 0, 0, canvas.width, canvas.height);
		return canvas.toDataURL("image/png");
	}
	private createCanvas(pw: number, ph: number): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		canvas.width = pw;
		canvas.height = ph;
		canvas.style.display = "bolck";
		canvas.style.position = "absolute";
		canvas.style.backgroundColor = "transparent";
		return canvas;
	}
	saveImg(): void {
		const a = document.createElement("a");
		a.href = this.createCanvasData(this.img);
		a.download = "default.png";
		document.body.appendChild(a);
		(a as any).style = "display: none";
		a.click();
		window.URL.revokeObjectURL(a.href);
		a.remove();
	}
}

export { ImageFileSystem };
