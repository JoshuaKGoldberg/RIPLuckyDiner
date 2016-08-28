/// <reference path="../RipLuckyDiner.ts" />

module RipLuckyDiner {
    "use strict";

    RipLuckyDiner.settings.menus = {
        "aliases": {
            " ": "Space",
            "(": "LeftParenthesis",
            ")": "RightParenthesis",
            ":": "Colon",
            ";": "Semicolon",
            "[": "LeftSquareBracket",
            "]": "RightSquareBracket",
            "-": "Hyphen",
            "MDash": "MDash",
            "_": "Underscore",
            "?": "QuestionMark",
            "!": "ExclamationMark",
            "/": "Slash",
            ".": "Period",
            ",": "Comma",
            "'": "Apostrophe",
            "�": "eFancy"
        },
        "replacements": {
            "TIME": function (Diner: RipLuckyDiner): string[] {
                let ticksRecorded: number = Diner.ItemsHolder.getItem("time"),
                    ticksUnrecorded: number = Diner.FPSAnalyzer.getNumRecorded() - Diner.ticksElapsed,
                    ticksTotal: number = Math.floor(ticksRecorded + ticksUnrecorded),
                    secondsTotal: number = Math.floor(ticksTotal / Diner.settings.runner.interval),
                    hours: string = Math.floor(secondsTotal / 3600).toString(),
                    minutes: string = Math.floor((secondsTotal - Number(hours)) / 60).toString();

                if (hours.length < 2) {
                    hours = " " + hours;
                } else if (hours.length > 2) {
                    hours = "99";
                }

                if (minutes.length < 2) {
                    minutes = "0" + minutes;
                } else if (minutes.length > 2) {
                    minutes = "99";
                }

                return (hours + ":" + minutes).split("");
            },
            "MONEY": function (Diner: RipLuckyDiner): string[] {
                return Diner.ItemsHolder.getItem("money").toString().split("");
            }
        },
        "replacementStatistics": {
            "TIME": true,
            "MONEY": true
        },
        "replaceFromItemsHolder": true,
        "schemas": {
            "GeneralText": {
                "size": {
                    "height": 24,
                    "width": 80
                },
                "position": {
                    "horizontal": "center",
                    "vertical": "center",
                    "offset": {
                        "top": 36
                    }
                },
                "ignoreB": true
            },
            "Yes/No": {
                "size": {
                    "width": 24,
                    "height": 20
                },
                "position": {
                    "horizontal": "center",
                    "vertical": "center",
                    "offset": {
                        "left": -28,
                        "top": 14
                    }
                },
                "arrowXOffset": 1,
                "textXOffset": 8,
                "textYOffset": 3.5
            },
            "Buy/Sell": {
                "size": {
                    "width": 44,
                    "height": 28
                },
                "position": {
                    "horizontal": "center",
                    "vertical": "center",
                    "offset": {
                        "left": -18,
                        "top": -10
                    }
                },
                "textXOffset": 8,
                "textYOffset": 4
            },
            "Money": {
                "size": {
                    "width": 36,
                    "height": 12
                },
                "position": {
                    "horizontal": "center",
                    "vertical": "center",
                    "offset": {
                        "left": 22,
                        "top": -18
                    }
                },
                "childrenSchemas": [
                    <MenuGraphr.IMenuThingSchema>{
                        "type": "thing",
                        "thing": "WhiteSquare",
                        "size": {
                            "width": 20,
                            "height": 3.5
                        },
                        "position": {
                            "vertical": "top",
                            "horizontal": "right",
                            "offset": {
                                "left": -8
                            }
                        }
                    }, {
                        "type": "text",
                        "words": ["MONEY"],
                        "position": {
                            "offset": {
                                "left": 8,
                                "top": -.25
                            }
                        }
                    }, {
                        "type": "text",
                        "words": [{
                            "command": "padLeft",
                            "length": "%%%%%%%MONEY%%%%%%%",
                            "word": "$"
                        }],
                        "position": {
                            "offset": {
                                "top": 4
                            }
                        }
                    }, {
                        "type": "text",
                        "words": [{
                            "command": "padLeft",
                            "length": 8,
                            "word": "%%%%%%%MONEY%%%%%%%"
                        }],
                        "position": {
                            "offset": {
                                "top": 4
                            }
                        }
                    }],
                "textSpeed": 0
            }
        }
    };
}
