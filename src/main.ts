
import {DemoBase as Demo} from "./demo/DemoBase";

document.title = "web os file system";
let ins = new Demo();
function main(): void {
    console.log("------ demo --- init ------");
    ins.initialize();
    function mainLoop(now: any): void {
        ins.run();
        window.requestAnimationFrame(mainLoop);
    }
    window.requestAnimationFrame(mainLoop);
    console.log("------ demo --- running ------");
}
main();
