const codes = require('../../codes');

module.exports = class GCodeModel {

    constructor(file_contents = '', needs_validate = false) {
        this.fileContents = file_contents;

        this.frames = this.createFrames(needs_validate);
    }

    // Creates frames from the file text
    createFrames(needs_validate = false) {
        let frames = this.fileContents.split('\n')
            .map((row) => {
                return row.trim();
            });

        if (needs_validate) {
            frames = frames.filter(GCodeModel.validateFrame);
        }

        frames = frames.map((rowFrame) => {
            return new GCodeFrame(rowFrame);
        });

        return frames;
    }

    getAsJSON() {
        return JSON.stringify(this.frames.map((frame) => frame.object), '', 4);
    }

    // Checks that G-code command and its every parameter are exists in codes.json
    static validateFrame(frame) {
        let [frameCode, ...frameParameters] = frame.split(' ');

        return codes.some((code) => {
            if (frameCode === code.name) {
                if (!code.parameters) {
                    return true;
                } else {
                    return frameParameters.every((frameParameter) => {
                        return code.parameters.some((parameter) => {
                            return frameParameter.split('')[0] === parameter.name;
                        });
                    });
                }
            }

            return false;
        });
    }
};

class GCodeFrame {

    constructor(string_frame) {
        this.object = this.buildFrame(string_frame);
    }

    buildFrame(string_frame) {
        let [code, ...parameters] = string_frame.split(' ');

        parameters = parameters.map((parameter) => {
            let name = parameter[0];
            let value = parseFloat(parameter.slice(1));

            return { name, value }
        });

        return { code, parameters }
    }
}