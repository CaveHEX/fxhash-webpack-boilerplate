/*!!
* emitJS <http://github.com/jls/emitJS>
* Released under the MIT license <http://www.opensource.org/licenses/mit-license.php>
* @author James Smith <http://thejls.com>
*/

class event_listener_t {
    constructor(type, listener, scope, once, removeCallback) {
        this.eventInstance = this;

        this.type = type;
        this.listener = listener;
        this.scope = scope;
        this.once = once;
        this.active = true;
        this.removeCallback = removeCallback;
    }

    fire(args) {
        if (!this.eventInstance.active) return;

        var ret = this.eventInstance.listener.apply(this.eventInstance.scope || this, args || []);
        if (this.eventInstance.once) {
            this.eventInstance.removeCallback(this.eventInstance);
        }
        return ret;
    }
}

class binding_t {
    constructor() {
        this.bindingInstance = this;

        this._listeners = [];
        this.bindingInstance.active = true;

        this.bindingInstance.length = function () { return this._listeners.length; };
    }

    addListener(listener, once, scope, type) {
        var eventHandler = new event_listener_t(type, listener, scope, once, this.bindingInstance.removeListener);
        this._listeners.push(eventHandler);
        return eventHandler;
    }

    removeListener(listener) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            if (this._listeners[i] === listener) {
                this._listeners.splice(i, 1);
            }
        }
    }

    emit() {
        if (this.bindingInstance.active !== true) return;

        var args = Array.prototype.slice.call(arguments);
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i].fire(args);
        }
    }
}

class event_emitter_t {
    constructor() {
        this.emitterInstance = this;
        this._bindings = {};
    }

    removeListener(listener) {
        var type = listener.type;

        if (!this._bindings[type])
            return;

        this._bindings[type].removeListener(listener);

        // If there are no other listeners for this type then 
        // go ahead and delete the type.
        if (this._bindings[type].length() === 0)
            delete this._bindings[type];
    }

    addListener(type, listener, once, scope) {
        if (!this._bindings[type])
            this._bindings[type] = new binding_t();
        return this._bindings[type].add(listener, once, scope, type);
    }

    emit() {
        if (!this._bindings[type]) return;
        var args = Array.prototype.slice.call(arguments, 1);
        this._bindings[type].emit.apply(this._bindings[type], args);
    }
}

export { event_listener_t, binding_t, event_emitter_t };
