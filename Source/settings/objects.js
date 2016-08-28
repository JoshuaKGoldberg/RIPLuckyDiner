RipLuckyDiner.RipLuckyDiner.settings.objects = {
    "onMake": "onMake",
    "indexMap": ["width", "height"],
    "doPropertiesFull": true,
    "giveFunctionsNames": true,
    "inheritance": {
        "Quadrant": {},
        "Map": {},
        "Area": {},
        "Location": {},
        "Thing": {
            "Character": {
                "BugCatcher": {},
                "Lass": {},
                "Player": {},
                "Scientist": {}
            },
            "Solid": {
                "AsianScroll": {},
                "CollisionDetector": {
                    "CutsceneTriggerer": {},
                    "MenuTriggerer": {},
                    "Transporter": {
                        "Door": {},
                        "HiddenTransporter": {}
                    },
                },
                "Computer": {},
                "FloorDiamondsDark": {},
                "InvisibleWall": {},
                "Register": {},
                "Sign": {},
                "SofaLeft": {},
                "SquareWall": {
                    "SquareWallTop": {},
                    "SquareWallFront": {}
                },
                "StoreAisle": {},
                "Table": {
                    "TableBar": {},
                    "Table1x1": {},
                    "Table1x2": {},
                    "Table2x3": {}
                },
                "TelevisionMonitor": {},
                "Tree": {},
                "WindowDetector": {
                    "AreaSpawner": {}
                }
            },
            "Scenery": {
                "DoormatDiner": {},
                "Stool": {}
            },
            "Terrain": {
                "TerrainSmall": {
                    "TerrainSmallRepeating": {
                        "WallIndoorHorizontalBands": {
                            "WallIndoorHorizontalBandsInverse": {}
                        },
                        "WallIndoorLightWithDarkBottom": {}
                    }
                },
                "BrickRoad": {},
                "DirtClean": {},
                "DirtForest": {},
                "DirtLight": {},
                "DirtMedium": {},
                "DirtWhite": {},
                "FloorCheckered": {},
                "FloorDiamonds": {},
                "FloorLinedHorizontal": {},
                "FloorTiledDiagonal": {},
                "Mountain": {},
                "Water": {},
                "WallIndoorFancyWithDarkBottom": {},
                "WallIndoorHorizontalBandsDark": {}
            },
            "Text": {
                "Exclamation": {},
                "HalfArrowHorizontal": {},
                "HPBar": {},
                "Note": {},
                "ExplosionSmall": {},
                "ScratchLine": {},
                "Square": {
                    "BlackSquare": {},
                    "DarkGraySquare": {},
                    "LightGraySquare": {},
                    "WhiteSquare": "",
                },
                "CharacterUpperCase": {
                    "CharA": {},
                    "CharB": {},
                    "CharC": {},
                    "CharD": {},
                    "CharE": {},
                    "CharF": {},
                    "CharG": {},
                    "CharH": {},
                    "CharI": {},
                    "CharJ": {},
                    "CharK": {},
                    "CharL": {},
                    "CharM": {},
                    "CharN": {},
                    "CharO": {},
                    "CharP": {},
                    "CharQ": {},
                    "CharR": {},
                    "CharS": {},
                    "CharT": {},
                    "CharU": {},
                    "CharV": {},
                    "CharW": {},
                    "CharX": {},
                    "CharY": {},
                    "CharZ": {},
                },
                "CharacterLowerCase": {
                    "Chara": {},
                    "Charb": {},
                    "Charc": {},
                    "Chard": {},
                    "Chare": {},
                    "Charf": {},
                    "Charh": {},
                    "Chari": {},
                    "Chark": {},
                    "Charl": {},
                    "Charm": {},
                    "Charn": {},
                    "Charo": {},
                    "Charr": {},
                    "Chars": {},
                    "Chart": {},
                    "Charu": {},
                    "Charv": {},
                    "Charw": {},
                    "Charx": {},
                    "Charz": {},
                    "CharacterDropped": {
                        "Charg": {},
                        "Charj": {},
                        "Charp": {},
                        "Charq": {},
                        "Chary": {}
                    }
                },
                "Number": {
                    "Char0": {},
                    "Char1": {},
                    "Char2": {},
                    "Char3": {},
                    "Char4": {},
                    "Char5": {},
                    "Char6": {},
                    "Char7": {},
                    "Char8": {},
                    "Char9": {}
                },
                "Symbol": {
                    "CharSpace": {},
                    "CharExclamationMark": {},
                    "CharPeriod": {},
                    "CharComma": {},
                    "CharApostrophe": {}
                },
                "Line": {
                    "LineDecoratorHorizontal": {
                        "LineDecoratorHorizontalLeft": {},
                        "LineDecoratorHorizontalRight": {},
                    },
                    "LineDecoratorVertical": {},
                    "LineSeparatorHorizontal": {},
                },
                "MapGreyDiagonal": {}
            },
            "Menu": {},
        }
    },
    "properties": {
        "Quadrant": {
            "tolx": 0,
            "toly": 0
        },
        "Map": {
            "initialized": false
        },
        "Area": {
            "background": "black",
            "onMake": RipLuckyDiner.RipLuckyDiner.prototype.areaProcess
        },
        "Location": {
            "entry": "Normal"
        },
        "Thing": {
            // Sizing
            "width": 8,
            "height": 8,
            // Placement
            "alive": true,
            "placed": false,
            "maxquads": 4,
            // Sprites
            "sprite": "",
            "spriteType": "neither",
            "scale": 1,
            "offsetX": 0,
            "offsetY": 0,
            // Movements
            "movement": undefined,
            // Collisions
            "tolTop": 0,
            "tolRight": 0,
            "tolBottom": 0,
            "tolLeft": 0,
            // Triggered Functions
            "onMake": RipLuckyDiner.RipLuckyDiner.prototype.thingProcess
        },
        "Character": {
            "groupType": "Character",
            "speed": RipLuckyDiner.RipLuckyDiner.unitsize / 3,
            "walking": false,
            "shouldWalk": false,
            "switchDirectionOnDialog": true,
            "heightGrass": 4,
            "direction": 2, // top,right,bottom,left is 0,1,2,3
            "offsetY": RipLuckyDiner.RipLuckyDiner.unitsize * -2,
            "roamingDirections": [0, 1, 2, 3],
            "onThingAdd": RipLuckyDiner.RipLuckyDiner.prototype.spawnCharacter,
            "onWalkingStart": RipLuckyDiner.RipLuckyDiner.prototype.animateCharacterStartWalking,
            "onWalkingStop": RipLuckyDiner.RipLuckyDiner.prototype.animateCharacterStopWalking,
            "activate": RipLuckyDiner.RipLuckyDiner.prototype.collideCharacterDialog,
        },
        "Player": {
            "id": "player",
            "player": true,
            "canKeyWalking": true,
            "direction": 2,
            "speed": RipLuckyDiner.RipLuckyDiner.unitsize / 2,
            "onWalkingStart": RipLuckyDiner.RipLuckyDiner.prototype.animateCharacterStartWalking,
            "onWalkingStop": RipLuckyDiner.RipLuckyDiner.prototype.animatePlayerStopWalking,
            "getKeys": function () {
                return {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "a": false,
                    "b": false
                };
            }
        },
        "Solid": {
            "repeat": true,
            "groupType": "Solid",
            "activate": RipLuckyDiner.RipLuckyDiner.prototype.collideCharacterDialog
        },
        "CollisionDetector": {
            "collide": RipLuckyDiner.RipLuckyDiner.prototype.collideCollisionDetector,
            "active": false,
            "hidden": true
        },
        "Transporter": {
            "activate": RipLuckyDiner.RipLuckyDiner.prototype.activateTransporter,
            "requireOverlap": true,
            "hidden": false
        },
        "HiddenTransporter": {
            "hidden": true,
            "noStretchBoundaries": true
        },
        "Computer": {
            "width": 8,
            "height": 12,
            "tolBottom": RipLuckyDiner.RipLuckyDiner.unitsize * 4
        },
        "DialogResponder": {
            "hidden": true
        },
        "FloorDiamondsDark": {
            "width": 4,
            "height": 8,
            "spritewidth": 8,
            "spriteheight": 8,
            "nocollide": true
        },
        "Grass": {
            "rarity": 10,
            "collide": RipLuckyDiner.RipLuckyDiner.prototype.collideCharacterGrass
        },
        "GymStatue": {
            "height": 16,
            "activate": RipLuckyDiner.RipLuckyDiner.prototype.activateGymStatue
        },
        "HealingMachine": [16, 16],
        "HealingMachineBall": [3, 3],
        "InvisibleWall": {
            "hidden": true
        },
        "LabComputer": [16, 8],
        "Label": {
            "position": "end"
        },
        "GymLabel": [16, 4],
        "Sign": {
            "attributes": {
                "forest": {}
            }
        },
        "SofaLeft": [8, 8],
        "Spawner": {
            "hidden": true,
            "onThingAdd": RipLuckyDiner.RipLuckyDiner.prototype.activateSpawner
        },
        "SquareWallTop": {
            "spriteheight": .5
        },
        "SquareWallFront": {
            "spriteheight": 1.5
        },
        "StoreAisle": [16, 16],
        "TableBar": [8, 8],
        "Table1x1": [8, 8],
        "Table1x2": [8, 16],
        "Table2x3": [16, 16],
        "Tree": {},
        "Door": {
            "width": 8,
            "height": 8,
            "requireDirection": 0,
            "attributes": {
                "indoor": {}
            }
        },
        "WindowDetector": {
            "hidden": true,
            "onThingAdd": RipLuckyDiner.RipLuckyDiner.prototype.spawnWindowDetector
        },
        "FloorLinedHorizontal": {
            "spritewidth": .5,
            "spriteheight": 2
        },
        "Scenery": {
            "groupType": "Scenery",
            "repeat": true
        },
        "DoormatDiner": {
            "spritewidth": 8,
            "spriteheight": .5
        },
        "Terrain": {
            "groupType": "Terrain",
            "repeat": true,
        },
        "TerrainSmall": [2, 2],
        "TerrainSmallRepeating": {
            "width": 8,
            "height": 8,
            "spritewidth": 2,
            "spriteheight": 2
        },
        "WallIndoorLightWithDarkBottom": {
            "spritewidth": .5,
            "spriteheight": 8
        },
        "WallIndoorFancyWithDarkBottom": [4, 8],
        "WallIndoorHorizontalBandsDark": {
            "width": 8,
            "height": 8,
            "spritewidth": .5,
            "spriteheight": 2,
        },
        "Text": {
            "groupType": "Text",
            "width": 4,
            "height": 4,
            "paddingX": 0,
            "paddingY": 8,
            "noshiftx": true,
            "noshifty": true,
        },
        "Square": {
            "width": 1,
            "height": 1,
            "repeat": true
        },
        "CharacterDropped": {
            "offsetY": RipLuckyDiner.RipLuckyDiner.unitsize * .75
        },
        "CharPeriod": {
            "offsetY": RipLuckyDiner.RipLuckyDiner.unitsize * .5
        },
        "CharComma": {
            "offsetY": RipLuckyDiner.RipLuckyDiner.unitsize * .5
        },
        "CharApostrophe": [1, 2],
        "Line": {
            "width": 1,
            "height": 1,
            "repeat": true
        },
        "LineDecoratorHorizontal": [8, 3],
        "LineDecoratorVertical": [3, 8],
        "LineSeparatorHorizontal": [4, 4],
        "MapGreyDiagonal": [4, 4],
        "TownMapNoWater": [76, 128],
        "Menu": {
            "groupType": "Text",
            "spritewidth": 4,
            "spriteheight": 4,
            "width": 8,
            "height": 8,
            "repeat": true,
            "noshiftx": true,
            "noshifty": true,
            "arrowXOffset": 1.25,
            "arrowYOffset": 1,
            "textXOffset": 4,
            "textYOffset": 7.5,
            "textSpeed": 1,
            "attributes": {
                "plain": {},
                "light": {
                    "spritewidth": 1,
                    "spriteheight": 1
                },
                "lined": {
                    "spritewidth": 2,
                    "spriteheight": 2
                }
            }
        }
    }
};
