import Element from "@heymarco/element";



/**
 * a base class providing a basic manipulation of controllable HTML element such as &lt;button&gt;, &lt;input&gt;, and &lt;textarea&gt;.
 */
export default class Control extends Element {
    constructor(selector : Selector) {
        super(selector);
    }



    get markBlur() : boolean {
        return this.is(".blur");
    }
    set markBlur(blur : boolean) {
        this.toggleClass("blur", blur);
    }


    get markActive() : boolean {
        return this.is(".active, .actived");
    }
    set markActive(active : boolean) {
        this.removeClass("actived").toggleClass("active", active);
    }
    get markPassive() : boolean {
        return this.is(".passive");
    }
    set markPassive(passive : boolean) {
        this.toggleClass("passive", passive);
    }



    get markEnabled() : boolean {
        return this.is(".enabled");
    }
    set markEnabled(enabled : boolean) {
        this.toggleClass("enabled", enabled);
    }

    get markDisabled() : boolean {
        return this.is(".disabled");
    }
    set markDisabled(disabled : boolean) {
        this.toggleClass("disabled", disabled);
    }



    clearAnimMarkOuts() {
        super.clearAnimMarkOuts();

        this.markBlur     = false;
        this.markPassive  = false;
        this.markEnabled  = false;
        this.markDisabled = false;
    }



    /**
     * get the state of activability of current control.
     * @returns true indicates the current control is activated, or false indicates the current control is deactivated.
     */
    get active() : boolean {
        // return this.is(":active, :checked, .active, .actived"); // pseuso :active is not supported yet
        return this.is(":checked, .active, .actived");
    }

    /**
     * set the state of activability of current control.
     * @param active : set true to activate this element, or false to deactivate it.
     */
    set active(active : boolean) {
        if (active) {
            // let ctrl = new Control(this.filter(":not(:active):not(:checked):not(.active):not(.actived)")); // pseuso :active is not supported yet
            let ctrl = new Control(this.filter(":not(:checked):not(.active):not(.actived)"));
            ctrl.markPassive = false; ctrl.markActive = true;
            ctrl.trigger("change");
        } else {
            // let ctrl = new Control(this.filter(":active, :checked, .active, .actived")); // pseuso :active is not supported yet
            let ctrl = new Control(this.filter(":checked, .active, .actived"));
            ctrl.markActive = false; ctrl.markPassive  = true;
            ctrl.trigger("change");
        }
    }



    /**
     * get the state of disability of current control.
     * @returns true indicates the current control is disabled, or false indicates the current control is not disabled (enabled).
     */
    get disabled() : boolean {
        return this.is(":disabled");
    }

    /**
     * set the state of disability of current control.
     * @param disabled : set true to disable this element, or false to not disable (enable) it.
     */
    set disabled(disabled : boolean) {
        if (disabled) {
            let ctrl = new Control(this.filter(":not(:disabled)"));
            ctrl.prop("disabled", true);
            ctrl.markEnabled  = false; ctrl.markDisabled = true;
            ctrl.trigger("disabled");
        } else {
            let ctrl = new Control(this.filter(":disabled"));
            ctrl.prop("disabled", false);
            ctrl.markDisabled = false; ctrl.markEnabled  = true;
            if (ctrl.is(".actived")) ctrl.removeClass("actived").addClass("active");
            ctrl.trigger("enabled");
        }
    }

    /**
     * get the state of enability of current control.
     * @returns true indicates the current control is enabled, or false indicates the current control is not enabled (disabled).
     */
    get enabled() : boolean {
        return !this.disabled;
    }

    /**
     * set the state of enability of current control.
     * @param enabled : set true to enable this element, or false to not enable (disable) it.
     */
    set enabled(enabled : boolean) {
        this.disabled = !enabled;
    }
}