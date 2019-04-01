module.exports = class Coordinates {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get() {
        return { x: this.x, y: this.y, z: this.z };
    }

    getAsArray() {
        return [this.x, this.y, this.z];
    }

    swapCoordinates(x, y, z) {
        const coordinates = Object.assign({}, this.get());

        this.x = coordinates[x];
        this.y = coordinates[y];
        this.z = coordinates[z];
    }

    swapFromGCodeToThree() {
        this.swapCoordinates('y', 'z', 'x');
    }

    swapFromThreeToGCode() {
        this.swapCoordinates('z', 'x', 'y');
    }

    fillMissingCoordinates(coordinates) {
        if (this.x === undefined) {
            this.x = coordinates.x;
        }

        if (this.y === undefined) {
            this.y = coordinates.y;
        }

        if (this.z === undefined) {
            this.z = coordinates.z;
        }
    }
};