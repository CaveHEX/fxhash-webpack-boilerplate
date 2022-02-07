
// [NOTE] Write these enumerator to reflect the different possibilities
// for each trait

const color_palette_type = {
    RED: "Strawberry",
    GREEN: "Mint",
    BLUE: "Ice",
}

const shape_type = {
    CIRCLE: "Coin",
    SQUARE: "Box",
}


class parameters_t {
    constructor() {
        this.color_palette = this._random_element_weighted(
            color_palette_type,
            [50, 20, 5] // [NOTE] higher number means more common (RED more common, BLUE the ratest)
        );

        this.shape = this._random_element_weighted(
            shape_type,
            [10, 1]
        );
    }

    _random_element(object) {
        let keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * fxrand())]];
    }

    _random_element_weighted(object, weights) {
        let keys = Object.keys(object);

        if (keys.length !== weights.length) {
            console.log("Options and weights count are not matching");
            return null;
        }

        let options = new Array();
        for (let i = 0; i < weights.length; ++i) {
            for (let j = 0; j < weights[i]; ++j) {
                options.push(keys[i]);
            }
        }

        return object[options[Math.floor(options.length * fxrand())]];
    }

    // [NOTE] : Write your helper functions based on parameters here
    get_color() {
        switch (this.color_palette) {
            case color_palette_type.RED:
                return color(255, 0, 0);
            case color_palette_type.GREEN:
                return color(0, 255, 0);
            case color_palette_type.BLUE:
                return color(0, 0, 255);
            default:
                return color(255, 0, 255);
        }
    }
}

let param = new parameters_t();

export {
    param,
    shape_type
}
