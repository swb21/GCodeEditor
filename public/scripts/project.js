const GCodeModel = require('./g-code-model');
const ThreeModel = require('./three-model');

module.exports = class Project {

    constructor(file_contents = '') {
        this.gCodeModel = new GCodeModel(file_contents);
        this.threeModel = new ThreeModel(this.gCodeModel);

        Project.object = this;
    }

    static isExists() {
        return Project.object !== undefined;
    }
};