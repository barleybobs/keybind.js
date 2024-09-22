class Keybind {
    #fireHotkeyEvent(type) {
        const hotkeyEvent = new KeyboardEvent(type, { bubbles: true });
        hotkeyEvent.name = this.name;
        hotkeyEvent.codes = this.codes;
        document.activeElement.dispatchEvent(hotkeyEvent);
    }

    constructor(config) {
        if (config.type !== "single" && config.type !== "multi") {
            throw new TypeError("Invalid keybind type");
        }
        this.type = config.type;

        this.name = config.name;

        this.set_manual(config.codes);

        this.pressed_codes = new Set();

        this.setting = false;

        const handle_key_event = (event) => {
            if (event.repeat) { return; }

            event.type === "keydown" ? this.pressed_codes.add(event.code) : this.pressed_codes.delete(event.code);

            if (event.type === "keydown" && !this.setting && [...this.codes].every((key) => this.pressed_codes.has(key))) {
                this.#fireHotkeyEvent("keybindpress");
            }
        };

        document.addEventListener("keydown", handle_key_event);
        document.addEventListener("keyup", handle_key_event);
    }


    set_detect() {
        this.setting = true;
        this.codes = new Set();

        const update_key_list = (event) => {
            this.codes.add(event.code);
        };

        document.addEventListener("keydown", update_key_list);
        document.addEventListener(
            this.type === "single" ? "keydown" : "keyup",
            () => {
                document.removeEventListener("keydown", update_key_list);
                this.#fireHotkeyEvent("keybindbound");
                this.setting = false;
            },
            { once: true }
        );
    }

    set_manual(set) {
        if (set.size === 0 || (set.size > 1 && this.type === "single")) {
            throw new RangeError("Invalid keybind codes length");
        }
        this.codes = set;
    }
}