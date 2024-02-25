//Global Variables
const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;

var OSplatform = "";

function print_scene(scene_name) {
    console.log('%c Scene : ' + scene_name + ' ', 'background: green; color: white; display: block;');
}

function preload_complete() {
    document.getElementById("loading-screen").style.display = "none";
    //Get into full screen mode if not on Computer
    if (window.navigator.platform.toLowerCase().includes("window") || window.navigator.platform.toLowerCase().includes("mac")) {
        OSplatform = "computer";
    } else {
        OSplatform = "other";
    }
}