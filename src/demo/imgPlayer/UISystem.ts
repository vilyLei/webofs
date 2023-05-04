import { ImageFileSystem } from "./ImageFileSystem";

class UISystem {
	filesys: ImageFileSystem = null;
	initialize(): void {
		console.log("UISystem::initialize() ...");
		this.init();
	}
	private init(): void {
		let styleBtn = document.createElement("button");
		styleBtn.innerHTML = "点击保存图片";
		styleBtn.onclick = (): void => {
			console.log("保存图片");
			this.filesys.saveImg();
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
}

export { UISystem };
