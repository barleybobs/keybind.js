# Keybind.js

Keybind.js is a lightweight (**under 1KB minified**) JavaScript library for handling custom keybinds and hotkeys. The library is designed to feel native, as if keybinding was part of JavaScript/HTML by default. It allows for simple configuration of single or multi-key hotkeys, with easy detection and event dispatching, similar to the traditional `keydown` and `keyup` events.

Current minified size: **964 bytes**

## Installation

Simply include keybind.js in your project:

```html
<script type="text/javascript" src="path/to/keybind.min.js"></script>
```

## Usage

Keybind.js uses the JS key codes. A list of the key codes can be found at [MDN Web Docs - Code values for keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values).

### Creating a Keybind

```javascript
const keybind = new Keybind({
  name: 'MyKeybind',
  type: 'multi',
  codes: new Set(['ShiftRight', 'KeyA'])
});
```

### Detecting Keybind Presses
```javascript
document.addEventListener('keybindpress', callback);
```

### Manually Setting Keys
You can manually update the keys for the keybind if needed:

```javascript
keybind.set_manual(new Set(['ShiftRight', 'KeyA']));
```

### Dynamically Detecting Keybinds
To dynamically detect and set a key combination via user input:

```javascript
keybind.set_detect();
```

It will now listen for the next key press(es) and automatically sets the keybind. Once the key combination is set, a hotkeybind event is fired.

```javascript
document.addEventListener('keybindbound', callback);
```

### Should I use `'single'` or `'multi'`?

Keybinds of type `'single'` can only have one key. However keybinds of type `'multi'` can have one key or more.

The main difference is that when using the `set_detect()` function keybinds of type `'single'` will bind as soon as a key is pressed, whereas keybinds of type `'multi'` will bind as soon as any key is released, allowing for the user to press multiple keys


## API Reference

### `new Keybind(config: Object)`
Creates a new `Keybind` object with the provided configuration.

#### Parameters
- `config` (Object): An object with the following properties:
    - `name` (String): The name of the keybind (used for identification). **Required.**
    - `type` (String): Either `'single'` for single-key keybinds or `'multi'` for multi-key combinations. **Required.**
    - `codes` (Set): A set of key codes names that should trigger the keybind. **Required.**

#### Properties
- `name` (String): The name of the keybind (used for identification).
- `type` (String): Either `'single'` for single-key keybinds or `'multi'` for multi-key combinations.
- `codes` (Set): A set of key codes names that should trigger the keybind.

### `set_manual(codes: Set)`
Manually sets the key combination for the keybind.

#### Parameters
- `codes` (Set): A set of key codes. If the keybind type is `'single'`, only one key code should be provided within the set. **Required.**

### `set_detect()`
Starts the detection process for dynamically setting keybinds. The library will listen for the next key press(es) and update the key combination accordingly. Once the keybind is set, a `keybindbound` event is fired.

### Custom Events
- `keybindpress`: Fired when the key combination is pressed.
    - `name` (String): The name of the keybind.
    - `codes` (Set): Pressed key codes.
- `keybindbound`: Fired when a new key combination is set during the detection process.
    - `name` (String): The name of the keybind.
    - `codes` (Set): Newly bound key codes.