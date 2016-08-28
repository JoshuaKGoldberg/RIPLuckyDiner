/// <reference path="../RipLuckyDiner.ts" />
/* tslint:disable:max-line-length */

type IMathConstants = any;
type IMathEquations = any;

module RipLuckyDiner {
    "use strict";

    RipLuckyDiner.settings.math = {
        "equations": {
            "speedWalking": function (constants: IMathConstants, equations: IMathEquations, thing: ICharacter): number {
                return Math.round(8 * thing.Diner.unitsize / thing.speed);
            }
        },
        "constants": {
            "statisticNames": ["HP", "Attack", "Defense", "Speed", "Special"],
            "statisticNamesDisplayed": ["Attack", "Defense", "Speed", "Special"],
            "statuses": {
                "names": ["Sleep", "Freeze", "Paralyze", "Burn", "Poison"],
                "probability25": {
                    "Sleep": true,
                    "Freeze": true
                },
                "probability12": {
                    "Paralyze": true,
                    "Burn": true,
                    "Poison": true
                },
                // where to get?
                "levels": {
                    "Normal": -1,
                    "Sleep": -1,
                    "Freeze": -1,
                    "Paralyze": -1,
                    "Burn": -1,
                    "Poison": -1
                },
                "shaking": {
                    "Normal": 0,
                    "Sleep": 10,
                    "Freeze": 10,
                    "Paralyze": 5,
                    "Burn": 5,
                    "Poison": 5
                }
            },
            "townMapLocations": {
                "Pallet Town": [18, 48],
                "Pewter City": [18, 16],
                "Serebii Islands": [18, 64],
                "Viridian City": [18, 36]
            },
            /**
             * @see http://bulbapedia.bulbagarden.net/wiki/Type/Type_chart#Generation_I
             */
            "types": {
                "names": ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon"],
                "indices": {
                    "Normal": 0,
                    "Fighting": 1,
                    "Flying": 2,
                    "Poison": 3,
                    "Ground": 4,
                    "Rock": 5,
                    "Bug": 6,
                    "Ghost": 7,
                    "Fire": 8,
                    "Water": 9,
                    "Grass": 10,
                    "Electric": 11,
                    "Psychic": 12,
                    "Ice": 13,
                    "Dragon": 14
                },
                "table": [
                    [1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
                    [2.0, 1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 0.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0],
                    [1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0],
                    [1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0],
                    [1.0, 1.0, 0.0, 2.0, 1.0, 2.0, 0.5, 1.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0],
                    [1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0],
                    [1.0, 0.5, 0.5, 2.0, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0],
                    [0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0],
                    [1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 0.5, 0.5, 2.0, 1.0, 1.0, 2.0, 0.5],
                    [1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5],
                    [1.0, 1.0, 0.5, 0.5, 2.0, 2.0, 0.5, 1.0, 0.5, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5],
                    [1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 0.5],
                    [1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0],
                    [1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 2.0],
                    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0]
                ]
            }
        }
    };
}
