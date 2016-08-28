module RipLuckyDiner {
    "use strict";

    RipLuckyDiner.settings.items = {
        "prefix": "RipLuckyDiner::",
        "defaults": {
            "storeLocally": true
        },
        "values": {
            "gameStarted": {
                "valueDefault": false
            },
            "map": {
                "valueDefault": ""
            },
            "area": {
                "valueDefault": ""
            },
            "location": {
                "valueDefault": ""
            },
            "lastPokecenter": {
                "valueDefault": {
                    "map": "Pallet Town",
                    "location": "Player's House Door"
                }
            },
            "badges": {
                "valueDefault": {
                    "Boulder": false,
                    "Cascade": false,
                    "Thunder": false,
                    "Rainbow": false,
                    "Soul": false,
                    "Marsh": false,
                    "Volcano": false,
                    "Earth": false
                }
            },
            "items": {
                "valueDefault": []
            },
            "money": {
                "valueDefault": 0,
                "minimum": 0
            },
            "time": {
                "valueDefault": 0
            },
            "name": {},
            "nameRival": {},
            "starter": {},
            "starterRival": {},
            "hasPokedex": {
                "valueDefault": false
            },
            "Pokedex": {
                "valueDefault": {}
            },
            "PokemonInParty": {
                "valueDefault": []
            },
            "PokemonInPC": {
                "valueDefault": []
            }
        }
    };
}
