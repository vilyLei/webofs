import { UISystem } from "./UISystem";
import { ImageFileSystem } from "./ImageFileSystem";
/**
 * 用以演示图片文件在跨平台Web环境下的打开保存等相关操作
 */
class ImagePlayer {

	private m_uisys = new UISystem();
	private m_filesys = new ImageFileSystem();
	private m_img: HTMLImageElement = null;

	initialize(): void {
		console.log("ImagePlayer::initialize() ...");
		this.m_filesys.initialize();
		this.m_uisys.initialize();
		this.m_uisys.filesys = this.m_filesys;
	}
}

export { ImagePlayer };
