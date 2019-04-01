const THREE = require('three');
const Coordinates = require('./helpers/coordinates');

module.exports = class ThreeModel {

    // Creates and draws ThreeJS model by G-code model
    constructor(g_code_model) {
        this.gCodeModel = g_code_model;

        this.currentCoordinates = new Coordinates(0, 0, 0);
        this.model = this.buildModel();
    }

    // Only for G0 and G1 codes
    buildModel() {
        let frames = this.gCodeModel.frames
            .filter((frame) => {
                return frame.object.code === 'G1';
            })
            .map((frame) => frame.object);

        let figureMaterial = new THREE.MeshPhongMaterial({
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        });

        const figureGeometry = new THREE.Geometry();

        frames.forEach((frame) => {
            let coordinates = new Coordinates();
            frame.parameters.forEach((parameter) => {
                let parameterName = parameter.name.toLowerCase();
                if (parameterName === 'x' || parameterName === 'y' || parameterName === 'z') {
                    coordinates[parameterName] = parameter.value;
                }
            });

            coordinates.swapFromGCodeToThree();
            coordinates.fillMissingCoordinates(this.currentCoordinates);
            this.currentCoordinates = coordinates;

            figureGeometry.vertices.push(new THREE.Vector3(...this.currentCoordinates.getAsArray()));
        });

        return new THREE.Line(figureGeometry, figureMaterial);
    }
};