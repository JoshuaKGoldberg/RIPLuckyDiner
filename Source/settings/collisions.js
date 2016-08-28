RipLuckyDiner.RipLuckyDiner.settings.collisions = {
    "groupNames": ["Solid", "Character"],
    "keyGroupName": "groupType",
    "keyTypeName": "title",
    "globalCheckGenerators": {
        "Character": RipLuckyDiner.RipLuckyDiner.prototype.generateCanThingCollide,
        "Solid": RipLuckyDiner.RipLuckyDiner.prototype.generateCanThingCollide
    },
    "hitCheckGenerators": {
        "Character": {
            "Character": RipLuckyDiner.RipLuckyDiner.prototype.generateIsCharacterTouchingCharacter,
            "Solid": RipLuckyDiner.RipLuckyDiner.prototype.generateIsCharacterTouchingSolid
        }
    },
    "hitCallbackGenerators": {
        "Character": {
            "Solid": RipLuckyDiner.RipLuckyDiner.prototype.generateHitCharacterThing,
            "Character": RipLuckyDiner.RipLuckyDiner.prototype.generateHitCharacterThing
        }
    }
};