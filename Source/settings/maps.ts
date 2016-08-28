/// <reference path="../RipLuckyDiner.ts" />

/* tslint:disable max-line-length */

module RipLuckyDiner {
    "use strict";

    RipLuckyDiner.settings.maps = {
        "mapDefault": "Lucky Diner",
        "locationDefault": "Black",
        "groupTypes": ["Text", "Character", "Solid", "Scenery", "Terrain"],
        "requireEntrance": true,
        "screenAttributes": [
            "allowCycling"
        ],
        "screenVariables": {
            "boundaries": RipLuckyDiner.prototype.getAreaBoundariesReal,
            "scrollability": RipLuckyDiner.prototype.getScreenScrollability,
            "thingsById": RipLuckyDiner.prototype.generateThingsByIdContainer
        },
        "onSpawn": RipLuckyDiner.prototype.addPreThing,
        "macros": {},
        "entrances": {
            "Blank": RipLuckyDiner.prototype.mapEntranceBlank,
            "Normal": RipLuckyDiner.prototype.mapEntranceNormal
        },
        "library": {
            "Lucky Diner": {
                "name": "Lucky Diner",
                "locationDefault": "Front Door",
                "locations": {
                    "Front Door": {
                        "area": "Inside",
                        "direction": 0,
                        "push": true
                    },
                    "Outside": {
                        "area": "Greener Pastures",
                        "cutscene": "Farewell",
                        "entry": "Blank"
                    }
                },
                "areas": {
                    "Greener Pastures": {
                        "creation": []
                    },
                    "Inside": {
                        "creation": [
                            // Top left & starters
                            { "thing": "WallIndoorFancyWithDarkBottom", "y": 8, "width": 144 },
                            { "thing": "FloorDiamonds", "y": 16, "width": 168, "height": 72 },
                            { "thing": "SofaLeft", "x": 0, "y": 16, "height": 80 },
                            { "thing": "SofaLeft", "x": 24, "y": 16, "height": 16, "flipHoriz": true },
                            { "thing": "SquareWallFront", "x": 32, "y": 8, "height": 16 },
                            { "thing": "TableBar", "x": 32, "y": 24 },

                            // Top
                            { "thing": "Computer", "x": 40, "y": 16 },
                            { "thing": "StoreAisle", "x": 48, "y": 16, "height": 16, "width": 48 },
                            { "thing": "AsianScroll", "x": 96, "y": 8, "dialog": "CAFFEINE" },
                            { "thing": "StoreAisle", "x": 104, "y": 16, "height": 8, "width": 32 },
                            { "thing": "Door", "x": 136, "y": 8 },

                            // Left
                            { "thing": "Table2x3", "x": 8, "y": 16 },
                            { "thing": "Table1x1", "x": 8, "y": 40 },
                            { "thing": "Stool", "x": 16, "y": 40 },
                            { "thing": "Table1x1", "x": 8, "y": 48 },
                            { "thing": "Stool", "x": 16, "y": 48 },
                            { "thing": "Table1x1", "x": 8, "y": 64 },
                            { "thing": "Stool", "x": 16, "y": 64 },
                            { "thing": "Table1x1", "x": 8, "y": 72 },
                            { "thing": "Stool", "x": 16, "y": 72 },

                            // Bottom left corner
                            { "thing": "FloorDiamonds", "y": 88, "width": 24, "height": 8 },
                            { "thing": "Table1x1", "x": 8, "y": 88 },
                            { "thing": "Stool", "x": 16, "y": 88 },

                            // Bar area
                            { "thing": "TableBar", "x": 40, "y": 40, "width": 80 },
                            { "thing": "Stool", "x": 40, "y": 44 },
                            { "thing": "Stool", "x": 52, "y": 44 },
                            { "thing": "Stool", "x": 76, "y": 44 },
                            { "thing": "Register", "x": 120, "y": 40 },

                            // Center area
                            { "thing": "Stool", "x": 32, "y": 56 },
                            { "thing": "Stool", "x": 32, "y": 64 },
                            { "thing": "Table1x1", "x": 40, "y": 56, "height": 16 },
                            { "thing": "Stool", "x": 48, "y": 56 },
                            { "thing": "Stool", "x": 48, "y": 64 },
                            { "thing": "Stool", "x": 56, "y": 56 },
                            { "thing": "Stool", "x": 56, "y": 64 },
                            { "thing": "Table1x1", "x": 64, "y": 56, "height": 16 },
                            { "thing": "Stool", "x": 72, "y": 56 },
                            { "thing": "Stool", "x": 72, "y": 64 },
                            { "thing": "Stool", "x": 80, "y": 56 },
                            { "thing": "Stool", "x": 80, "y": 64 },
                            { "thing": "Table1x1", "x": 88, "y": 56, "height": 16 },
                            { "thing": "Stool", "x": 96, "y": 56 },
                            { "thing": "Stool", "x": 96, "y": 64 },
                            { "thing": "Stool", "x": 104, "y": 56 },
                            { "thing": "Stool", "x": 104, "y": 64 },
                            { "thing": "Table1x1", "x": 112, "y": 56, "height": 16 },
                            { "thing": "Stool", "x": 120, "y": 56 },
                            { "thing": "Stool", "x": 120, "y": 64 },

                            // Low singles across front
                            { "thing": "Stool", "x": 40, "y": 80 },
                            { "thing": "Table1x1", "x": 48, "y": 80 },
                            { "thing": "Stool", "x": 56, "y": 80 },
                            { "thing": "Stool", "x": 64, "y": 80 },
                            { "thing": "Table1x1", "x": 72, "y": 80 },
                            { "thing": "Stool", "x": 80, "y": 80 },
                            { "thing": "Stool", "x": 88, "y": 80 },
                            { "thing": "Table1x1", "x": 96, "y": 80 },
                            { "thing": "Stool", "x": 104, "y": 80 },

                            // Entry and right
                            { "thing": "HiddenTransporter", "x": 128, "y": 88, "direction": 0, "entrance": "Front Door", "requireDirection": 0 },
                            { "thing": "DoormatDiner", "x": 128, "y": 76, "height": 12, "width": 8 },
                            { "thing": "Sign", "x": 136, "y": 56, "dialog": "PLEASE SEAT YOURSELF" },
                            { "thing": "SquareWallFront", "x": 144, "y": 32, "width": 24 },
                            { "thing": "WallIndoorFancyWithDarkBottom", "x": 144, "y": 40, "width": 24 },
                            { "thing": "HiddenTransporter", "x": 128, "y": 88, "transport": "Outside", "flipVert": true, "requireDirection": 2 },
                            { "thing": "SofaLeft", "x": 144, "y": 48, "height": 16 },
                            { "thing": "Table1x1", "x": 152, "y": 48 },
                            { "thing": "SofaLeft", "x": 160, "y": 48, "height": 40, "flipHoriz": true },
                            { "thing": "Stool", "x": 144, "y": 72 },
                            { "thing": "Stool", "x": 144, "y": 80 },
                            { "thing": "Table1x1", "x": 152, "y": 72, "height": 16 },

                            // Poop deck
                            { "thing": "FloorDiamonds", "x": 144, "y": -8, "width": 24, "height": 24 },
                            { "thing": "SquareWallFront", "x": 144, "y": -8, "height": 24, "width": 8 },
                            { "thing": "Door", "x": 152, "y": -8, "height": 8, "width": 8, "nocollide": true },
                            { "thing": "SquareWallFront", "x": 160, "y": -8, "height": 32, "width": 8 },

                            // Best people on Earth
                            { "thing": "BugCatcher", "x": 32, "y": 40, "id": "Justin", "dialog": "If you can't dazzle them with brilliance, baffle them with bullshit.", "roaming": true },
                            { "thing": "Lass", "x": 128, "y": 48, "id": "Chana", "dialog": "No worries!", "roaming": true },

                            // Also this guy
                            { "thing": "Scientist", "x": 40, "y": 80, "sitting": true, "direction": 1, "directionPreferred": 1, "id": "Josh", "dialog": "It's 5am, probably time to switch to decaf..." },

                            // Surrounding barriers
                            { "thing": "InvisibleWall", "x": 144, "y": 40, "height": 8, "width": 8 },
                            { "thing": "InvisibleWall", "x": 168, "y": 24, "height": 8, "width": 8 },
                            { "thing": "InvisibleWall", "x": -8, "y": 8, "height": 8, "width": 152 },
                            { "thing": "InvisibleWall", "x": -8, "y": 8, "height": 96, "width": 8 },
                            { "thing": "InvisibleWall", "x": 24, "y": 88, "width": 104 },
                            { "thing": "InvisibleWall", "x": 152, "y": -8, "width": 8 },
                            { "thing": "InvisibleWall", "y": 96, "width": 24 },
                            { "thing": "InvisibleWall", "x": 136, "y": 88, "width": 32 }
                        ]
                    }
                }
            }
        }
    } as any;
}
