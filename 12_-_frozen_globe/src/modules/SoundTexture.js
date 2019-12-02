import {
    DataTexture,
    RGBFormat,
    FloatType,
    NearestFilter
} from "../../../node_modules/three/build/three.module.js";

const SoundTexture = function () {

    this.s_w = 512;
    this.s_h = 512;
    this.s_data = new Float32Array(this.s_w * this.s_h * 3);

    for (var i = 0; i < this.s_data.length; i++) {
        this.s_data[i] = i % 3 == 0 ? Math.random() : 0.0;
    }

    this.s_texture = new DataTexture(this.s_data, this.s_w, this.s_h, RGBFormat, FloatType);
    this.s_texture.minFilter = NearestFilter;
    this.s_texture.magFilter = NearestFilter;
    this.s_texture.needsUpdate = true;

    this.update = function (frequencies) {

        var index = this.s_texture.image.data.length - (this.s_w * 3);
        var ratio = Math.max(...frequencies); // / 100;
        if (ratio < 1) ratio = 100000;
        // console.log(ratio);
        for (var i = 0; i < this.s_w; i++) {
            var f = frequencies[i] / ratio;
            this.s_texture.image.data[index + 0] = f;
            this.s_texture.image.data[index + 1] = f;
            this.s_texture.image.data[index + 2] = f;
            index += 3;
        }

        for (var j = 0; j < this.s_texture.image.data.length; j++) {
            this.s_texture.image.data[j] = this.s_texture.image.data[j + (this.s_w * 3)];
        }

        this.s_texture.needsUpdate = true;
    }

}

export {
    SoundTexture
};