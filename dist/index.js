"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("@heymarco/element"));
/**
 * a base class providing a basic manipulation of controllable HTML element such as &lt;button&gt;, &lt;input&gt;, and &lt;textarea&gt;.
 */
class Control extends element_1.default {
    constructor(selector) {
        super(selector);
    }
    /**
     * get the state of disability of current control.
     * @returns true indicates the current control is disabled, or false indicates the current control is not disabled (enabled).
     */
    get disabled() {
        return this.is(":disabled");
    }
    /**
     * set the state of disability of current control.
     * @param disabled : set true to disable this element, or false to not disable (enable) it.
     */
    set disabled(disabled) {
        if (disabled) {
            this.filter(":not(:disabled)").prop("disabled", true).removeClass("enabled").trigger("disabled");
        }
        else {
            this.filter(":disabled").prop("disabled", false).addClass("enabled").trigger("enabled");
        }
    }
    /**
     * get the state of enability of current control.
     * @returns true indicates the current control is enabled, or false indicates the current control is not enabled (disabled).
     */
    get enabled() {
        return !this.disabled;
    }
    /**
     * set the state of enability of current control.
     * @param enabled : set true to enable this element, or false to not enable (disable) it.
     */
    set enabled(enabled) {
        this.disabled = !enabled;
    }
}
exports.default = Control;
