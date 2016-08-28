RipLuckyDiner.RipLuckyDiner.settings.input = {
    "InputWritrArgs": {
        "aliases": {
            // Keyboard aliases
            "left":   [65, 37],     // a,     left
            "right":  [68, 39],     // d,     right
            "up":     [87, 38],     // w,     up
            "down":   [83, 40],     // s,     down
            "a":      [90, 13],     // z,     enter
            "b":      [88, 8],      // x,     backspace
            "pause":  [],
            "select": []
        },
        "triggers": {
            "onkeydown": {
                "left": RipLuckyDiner.RipLuckyDiner.prototype.keyDownLeft,
                "right": RipLuckyDiner.RipLuckyDiner.prototype.keyDownRight,
                "up": RipLuckyDiner.RipLuckyDiner.prototype.keyDownUp,
                "down": RipLuckyDiner.RipLuckyDiner.prototype.keyDownDown,
                "a": RipLuckyDiner.RipLuckyDiner.prototype.keyDownA,
                "b": RipLuckyDiner.RipLuckyDiner.prototype.keyDownB,
                "pause": RipLuckyDiner.RipLuckyDiner.prototype.togglePauseMenu,
                "mute": RipLuckyDiner.RipLuckyDiner.prototype.keyDownMute,
                "select": RipLuckyDiner.RipLuckyDiner.prototype.keyDownSelect
            },
            "onkeyup": {
                "left": RipLuckyDiner.RipLuckyDiner.prototype.keyUpLeft,
                "right": RipLuckyDiner.RipLuckyDiner.prototype.keyUpRight,
                "up": RipLuckyDiner.RipLuckyDiner.prototype.keyUpUp,
                "down": RipLuckyDiner.RipLuckyDiner.prototype.keyUpDown,
                "a": RipLuckyDiner.RipLuckyDiner.prototype.keyUpA,
                "b": RipLuckyDiner.RipLuckyDiner.prototype.keyUpB,
                "pause": RipLuckyDiner.RipLuckyDiner.prototype.keyUpPause
            },
            "onmousedown": {
                "rightclick": RipLuckyDiner.RipLuckyDiner.prototype.mouseDownRight
            },
            "oncontextmenu": {},
            "ondevicemotion": {
                //"devicemotion": RipLuckyDiner.RipLuckyDiner.prototype.deviceMotion
            }
        }
    }
};