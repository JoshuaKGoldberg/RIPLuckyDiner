/// <reference path="../RipLuckyDiner.ts" />

module RipLuckyDiner {
    "use strict";

    RipLuckyDiner.settings.ui = {
        "globalName": "Diner",
        "styleSheet": {
            ".RipLuckyDiner": {
                "color": "black"
            },
            "@font-face": {
                "font-family": "'Press Start'",
                "src": [
                    "url('Fonts/pressstart2p-webfont.eot?#iefix') format('embedded-opentype')",
                    "url('Fonts/pressstart2p-webfont.woff') format('woff')",
                    "url('Fonts/pressstart2p-webfont.ttf') format('truetype')",
                    "url('Fonts/pressstart2p-webfont.svg') format('svg')"
                ].join(", "),
                "font-weight": "normal",
                "font-style": "normal"
            }
        },
        "sizeDefault": "Large",
        "sizes": {
            "Large": {
                "width": Infinity,
                "height": Infinity,
                "full": false
            }
        },
        "schemas": [
            {
                "title": "Controls",
                "generator": "OptionsTable",
                "options": ((controls: string[]): UserWrappr.UISchemas.IOptionsButtonSchema[] => {
                    return controls.map((title: string): UserWrappr.UISchemas.IOptionsButtonSchema => {
                        return {
                            "title": title[0].toUpperCase() + title.substr(1),
                            "type": "Keys",
                            "storeLocally": true,
                            "source": (Diner: UserWrappr.IGameStartr): string[] => {
                                return Diner.InputWriter
                                    .getAliasAsKeyStrings(title)
                                    .map((text: string): string => text.toLowerCase());
                            },
                            "callback": (Diner: UserWrappr.IGameStartr, valueOld: string, valueNew: string): void => {
                                Diner.InputWriter.switchAliasValues(
                                    title,
                                    [Diner.InputWriter.convertKeyStringToAlias(valueOld)],
                                    [Diner.InputWriter.convertKeyStringToAlias(valueNew)]
                                );
                            }
                        };
                    });
                })(["a", "b", "left", "right", "up", "down", "pause"])
            }
        ]
    };
}
