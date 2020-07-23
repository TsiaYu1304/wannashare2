import { Dimensions,PixelRatio } from 'react-native'

export const devicewidth = Dimensions.get('window').width;
export const deviceheight = Dimensions.get('window').height;
let fontscale = PixelRatio.getFontScale();
let pixelRatio = PixelRatio.get();

const defaultpixel = 3;

const h2 = 2436 / defaultpixel;
const w2 = 1125 / defaultpixel;
const scale = Math.min(deviceheight / h2,devicewidth / w2);

export function setSptext (size){
    size = Math.round((size * scale + 0.5) * pixelRatio / fontscale);
    return size / defaultpixel;
}

export function scaleSize(size) {
    size = Math.round(size * scale + 0.5);
    return size / defaultpixel;
}

export function setWidth(size) {
    size = size / 375;
    return size*devicewidth;
}

export function setheight(size) {
    size = size / 812;
    return size*deviceheight;
}
