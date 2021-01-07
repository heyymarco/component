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
        return this.is(":active, :checked, .active, .actived");
    }

    /**
     * set the state of activability of current control.
     * @param active : set true to activate this element, or false to deactivate it.
     */
    set active(active : boolean) {
        if (active) {
            let items = this.filter(":not(:active):not(:checked):not(.active):not(.actived)");
            items.markPassive = false; items.markActive = true;
            items.trigger("change");
        } else {
            let items = this.filter(":active, :checked, .active, .actived");
            items.markActive = false; items.markPassive  = true;
            items.trigger("change");
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
            let items = this.filter(":not(:disabled)");
            items.prop("disabled", true);
            items.markEnabled  = false; items.markDisabled = true;
            items.trigger("disabled");
        } else {
            let items = this.filter(":disabled");
            items.prop("disabled", false);
            items.markDisabled = false; items.markEnabled  = true;
            if (items.is(".actived")) items.removeClass("actived").addClass("active");
            items.trigger("enabled");
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