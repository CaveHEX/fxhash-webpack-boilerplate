import { param, shape_type } from "./parameters";


// [NOTE] Example of a component
class coint_t {
    constructor() {
        this.t = 0.0;

        this.on_resize();
    }

    // [NOTE] if necessary, add some resize code
    // Don't forget to subscribe it in index.js!
    on_resize() {
        this.base_radius = width * 0.35;
        this.breathing_amplitude = width * 0.1;
    }

    update() {
        this.t += 0.01;
    }

    render() {
        push();
        translate(width * 0.5, height * 0.5);

        const radius = this.base_radius + map(cos(this.t), -1, 1, -this.breathing_amplitude, this.breathing_amplitude);

        noStroke();
        fill(param.get_color()); // [NOTE] Using parameters to drive components
        if (param.shape === shape_type.CIRCLE) { // [NOTE] Using parameters to drive components
            circle(0, 0, radius);
        } else {
            rectMode(CENTER);
            square(0, 0, radius);
        }
        pop();
    }
}

export { coint_t };
