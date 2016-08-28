// @echo '/// <reference path="GameStartr-0.2.0.ts" />'
// @echo '/// <reference path="MenuGraphr-0.2.0.ts" />'
// @echo '/// <reference path="StateHoldr-0.2.0.ts" />'

// @ifdef INCLUDE_DEFINITIONS
/// <reference path="References/GameStartr-0.2.0.ts" />
/// <reference path="References/MenuGraphr-0.2.0.ts" />
/// <reference path="References/StateHoldr-0.2.0.ts" />
/// <reference path="RipLuckyDiner.d.ts" />
// @endif

// @include ../Source/RipLuckyDiner.d.ts

module RipLuckyDiner {
    "use strict";

    /**
     * What direction(s) the screen may scroll from player movement.
     */
    export enum Scrollability {
        /**
         * The screen may not scroll in either direction.
         */
        None,

        /**
         * The screen may scroll vertically.
         */
        Vertical,

        /**
         * The screen may scroll horizontally.
         */
        Horizontal,

        /**
         * The screen may scroll vertically and horizontally.
         */
        Both,
    };

    /**
     * Cardinal directions a Thing may face in-game.
     */
    export enum Direction {
        Top = 0,
        Right = 1,
        Bottom = 2,
        Left = 3
    };

    /**
     * Direction names, mapped to their opposites.
     */
    export const DirectionOpposites: IDirectionOpposites = {
        "Top": "Bottom",
        "top": "bottom",
        "Right": "Left",
        "right": "left",
        "Bottom": "Top",
        "bottom": "top",
        "Left": "Right",
        "left": "right"
    };

    /**
     * Directions, keyed by their string aliases.
     */
    export const DirectionAliases: IDirectionAliases = {
        "top": Direction.Top,
        "right": Direction.Right,
        "bottom": Direction.Bottom,
        "left": Direction.Left
    };

    /**
     * String aliases of directions, keyed by the direction.
     */
    export const DirectionsToAliases: IDirectionsToAliases = ["top", "right", "bottom", "left"];

    /**
     * Classes to add to Things facing particular directions.
     */
    export const DirectionClasses: IDirectionsToAliases = ["up", "right", "down", "left"];

    /**
     * Direction aliases for AreaSpawner activations.
     */
    export const DirectionSpawns: IDirectionsToAliases = ["yDec", "xInc", "yInc", "xInc"];

    /**
     * A tribute to the former Lucky Diner in Belltown, Seattle.
     */
    export class RipLuckyDiner extends GameStartr.GameStartr implements IRipLuckyDiner {
        // For the sake of reset functions, constants are stored as members of the 
        // RipLuckyDiner Function itself - this allows prototype setters to use 
        // them regardless of whether the prototype has been instantiated yet.

        /**
         * Static settings passed to individual reset Functions.
         */
        public static settings: IRipLuckyDinerStoredSettings = {
            "audio": undefined,
            "collisions": undefined,
            "devices": undefined,
            "groups": undefined,
            "events": undefined,
            "items": undefined,
            "input": undefined,
            "maps": undefined,
            "math": undefined,
            "menus": undefined,
            "objects": undefined,
            "quadrants": undefined,
            "renderer": undefined,
            "runner": undefined,
            "scenes": undefined,
            "sprites": undefined,
            "states": undefined,
            "touch": undefined,
            "ui": undefined
        };

        /**
         * How much to expand each pixel from raw sizing measurements to in-game.
         */
        public static unitsize: number = 4;

        /**
         * Static scale of 2, to exand to two pixels per one game pixel.
         */
        public static scale: number = 2;

        /**
         * Quickly tapping direction keys means to look in a direction, not walk.
         */
        public static inputTimeTolerance: number = 4;

        /**
         * A simple container for Map attributes given by switching to an Area within 
         * that map. A bounding box of the current viewport is kept, along with a bag
         * of assorted variable values.
         */
        public MapScreener: IMapScreenr;

        /**
         * A utility to save collections of game state using an ItemsHoldr.
         * Keyed changes to named collections can be saved temporarily or permanently.
         */
        public StateHolder: StateHoldr.IStateHoldr;

        /**
         * A menu management system. Menus can have dialog-style text, scrollable
         * and unscrollable grids, and children menus or decorations added.
         */
        public MenuGrapher: MenuGraphr.IMenuGraphr;

        /**
         * Static settings passed to individual reset Functions.
         */
        public settings: IRipLuckyDinerStoredSettings;

        /**
         * How much to expand each pixel from raw sizing measurements to in-game.
         */
        public unitsize: number;

        /**
         * The game's player, which (when defined) will always be a Player Thing.
         */
        public player: IPlayer;

        /**
         * The total FPSAnalyzr ticks that have elapsed since the constructor or saving.
         */
        public ticksElapsed: number;

        /**
         * Initializes a new instance of the RipLuckyDiner class using the static
         * settings stored in `RipLuckyDiner.settings`.
         * 
         * @param settings   Extra settings such as screen size.
         */
        constructor(settings: GameStartr.IGameStartrSettings) {
            this.settings = RipLuckyDiner.settings;
            this.ticksElapsed = 0;

            super(
                this.proliferate(
                    {
                        "constantsSource": RipLuckyDiner,
                        "constants": [
                            "unitsize",
                            "scale"
                        ],
                        "extraResets": [
                            "resetStateHolder",
                            "resetMenuGrapher"
                        ]
                    },
                    settings));
        }


        /* Resets
        */

        /**
         * Sets this.ObjectMaker.
         *
         * Because many Thing functions require access to other Diner modules, each is
         * given a reference to this container Diner via properties.thing.Diner.
         *
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        resetObjectMaker(Diner: RipLuckyDiner, settings: GameStartr.IGameStartrSettings): void {
            Diner.ObjectMaker = new ObjectMakr.ObjectMakr(
                Diner.proliferate(
                    {
                        "properties": {
                            "Quadrant": {
                                "EightBitter": Diner,
                                "GameStarter": Diner,
                                "Diner": Diner
                            },
                            "Thing": {
                                "EightBitter": Diner,
                                "GameStarter": Diner,
                                "Diner": Diner
                            }
                        }
                    },
                    Diner.settings.objects));
        }

        /**
         * Sets this.MathDecider, adding its existing NumberMaker to the constants.
         * 
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        resetMathDecider(Diner: RipLuckyDiner, settings: GameStartr.IGameStartrSettings): void {
            Diner.MathDecider = new MathDecidr.MathDecidr(
                Diner.proliferate(
                    {
                        "constants": {
                            "NumberMaker": Diner.NumberMaker
                        }
                    },
                    Diner.settings.math));
        }

        /**
         * Sets this.StateHolder.
         * 
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        resetStateHolder(Diner: RipLuckyDiner, settings: GameStartr.IGameStartrSettings): void {
            Diner.StateHolder = new StateHoldr.StateHoldr(
                Diner.proliferate(
                    {
                        "ItemsHolder": Diner.ItemsHolder
                    },
                    Diner.settings.states));
        }

        /**
         * Sets this.MenuGrapher.
         * 
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        resetMenuGrapher(Diner: RipLuckyDiner, settings: GameStartr.IGameStartrSettings): void {
            Diner.MenuGrapher = new MenuGraphr.MenuGraphr(
                Diner.proliferate(
                    {
                        "GameStarter": Diner
                    },
                    Diner.settings.menus));
        }


        /**
         * Sets this.container.
         * 
         * The container is given the "Press Start" font, and the PixelRender is told
         * which groups to draw in order.
         * 
         * @param FSM
         * @param settings   Extra settings such as screen size.
         */
        resetContainer(Diner: RipLuckyDiner, settings: GameStartr.IGameStartrSettings): void {
            super.resetContainer(Diner, settings);

            Diner.container.style.fontFamily = "Press Start";
            Diner.container.className += " RipLuckyDiner";

            Diner.PixelDrawer.setThingArrays([
                <GameStartr.IThing[]>Diner.GroupHolder.getGroup("Terrain"),
                <GameStartr.IThing[]>Diner.GroupHolder.getGroup("Solid"),
                <GameStartr.IThing[]>Diner.GroupHolder.getGroup("Scenery"),
                <GameStartr.IThing[]>Diner.GroupHolder.getGroup("Character"),
                <GameStartr.IThing[]>Diner.GroupHolder.getGroup("Text")
            ]);
        }


        /* Global manipulations
        */

        /**
         * Completely restarts the game. The StartOptions menu is shown.
         */
        gameStart(): void {
            this.setMap("Lucky Diner");
        }


        /**
         * Slight addition to the parent thingProcess Function. The Thing's hit
         * check type is cached immediately, and a default id is assigned if an id
         * isn't already present.
         * 
         * @param thing   The Thing being processed.
         * @param title   What type Thing this is (the name of the class).
         * @param settings   Additional settings to be given to the Thing.
         * @param defaults   The default settings for the Thing's class.
         * @remarks This is generally called as the onMake call in an ObjectMakr.
         */
        thingProcess(thing: IThing, title: string, settings: any, defaults: any): void {
            super.thingProcess(thing, title, settings, defaults);

            // ThingHittr becomes very non-performant if functions aren't generated
            // for each Thing constructor (optimization does not respect prototypal 
            // inheritance, sadly).
            thing.Diner.ThingHitter.cacheChecksForType(thing.title, thing.groupType);

            thing.bordering = [undefined, undefined, undefined, undefined];

            if (typeof thing.id === "undefined") {
                thing.id = [
                    thing.Diner.AreaSpawner.getMapName(),
                    thing.Diner.AreaSpawner.getAreaName(),
                    thing.title,
                    (thing.name || "Anonymous")
                ].join("::");
            }
        }

        /**
         * Processes additional Thing attributes. For each attribute the Area's
         * class says it may have, if it has it, the attribute value proliferated 
         * onto the Area.
         * 
         * @param area The Area being processed.
         */
        areaProcess(area: IArea): void {
            let attributes: { [i: string]: any } = area.attributes;

            for (let attribute in attributes) {
                if (area[attribute]) {
                    RipLuckyDiner.prototype.proliferate(area, attributes[attribute]);
                }
            }
        }

        /**
         * Starts the game (currently a no-op).
         * 
         * @param Diner
         */
        onGamePlay(Diner: RipLuckyDiner): void {
            console.log("Playing!");
        }

        /**
         * Pauses the game (currently a no-op).
         * 
         * @param Diner
         */
        onGamePause(Diner: RipLuckyDiner): void {
            console.log("Paused.");
        }

        /**
         * Overriden Function to adds a new Thing to the game at a given position,
         * relative to the top left corner of the screen. The Thing is also 
         * added to the MapScreener.thingsById container.
         * 
         * 
         * @param thingRaw   What type of Thing to add. This may be a String of
         *                   the class title, an Array containing the String
         *                   and an Object of settings, or an actual Thing.
         * @param left   The horizontal point to place the Thing's left at (by
         *               default, 0).
         * @param top   The vertical point to place the Thing's top at (by default,
         *              0).
         */
        addThing(thingRaw: string | IThing | [string, any], left: number = 0, top: number = 0): IThing {
            let thing: IThing = <IThing>super.addThing.call(this, thingRaw, left, top);

            if (thing.id) {
                thing.Diner.StateHolder.applyChanges(thing.id, thing);
                thing.Diner.MapScreener.thingsById[thing.id] = thing;
            }

            if (typeof thing.direction !== "undefined") {
                thing.Diner.animateCharacterSetDirection(thing, thing.direction);
            }

            return thing;
        }

        /**
         * Adds a Thing via addPreThing based on the specifications in a PreThing.
         * This is done relative to MapScreener.left and MapScreener.top.
         * 
         * @param prething   A PreThing whose Thing is to be added to the game.
         */
        addPreThing(prething: IPreThing): void {
            let thing: IThing = prething.thing,
                position: string = prething.position || thing.position;

            if (thing.spawned) {
                return;
            }
            thing.spawned = true;

            thing.areaName = thing.areaName || thing.Diner.AreaSpawner.getAreaName();
            thing.mapName = thing.mapName || thing.Diner.AreaSpawner.getMapName();

            thing.Diner.addThing(
                thing,
                prething.left * thing.Diner.unitsize - thing.Diner.MapScreener.left,
                prething.top * thing.Diner.unitsize - thing.Diner.MapScreener.top);

            // Either the prething or thing, in that order, may request to be in the
            // front or back of the container
            if (position) {
                thing.Diner.TimeHandler.addEvent(function (): void {
                    switch (position) {
                        case "beginning":
                            thing.Diner.arrayToBeginning(thing, <any[]>thing.Diner.GroupHolder.getGroup(thing.groupType));
                            break;
                        case "end":
                            thing.Diner.arrayToEnd(thing, <any[]>thing.Diner.GroupHolder.getGroup(thing.groupType));
                            break;
                        default:
                            throw new Error("Unknown position: " + position + ".");
                    }
                });
            }
        }

        /**
         * Adds a new Player Thing to the game and sets it as EightBitter.player. Any
         * required additional settings (namely keys, power/size, and swimming) are
         * applied here.
         * 
         * @param left   A left edge to place the Thing at (by default, 0).
         * @param bottom   A top to place the Thing upon (by default, 0).
         * @returns A newly created Player in the game.
         */
        addPlayer(left: number = 0, top: number = 0): IPlayer {
            let player: IPlayer = this.player = this.ObjectMaker.make("Player");
            player.keys = player.getKeys();

            this.InputWriter.setEventInformation(player);

            this.addThing(player, left || 0, top || 0);

            return player;
        }

        /**
         * Retrieves the Thing in MapScreener.thingById of the given id.
         * 
         * @param id   An id of a Thing to retrieve.
         * @returns The Thing under the given id, if it exists.
         */
        getThingById(id: string): IThing {
            return this.MapScreener.thingsById[id];
        }


        /* Inputs
        */

        /**
         * Checks whether inputs may trigger, which is always true, and prevents the event.
         * 
         * @param Diner
         * @param player   Diner's current user-controlled Player.
         * @param code   An key/mouse code from the event.
         * @param event   The original user-caused Event.
         * @returns Whether inputs may trigger (true).
         */
        canInputsTrigger(Diner: RipLuckyDiner, player?: IPlayer, code?: any, event?: Event): boolean {
            if (event) {
                event.preventDefault();
            }

            return true;
        }

        /**
         * Checks whether direction keys such as up may trigger, which is true if the
         * game isn't paused, the isn't an active menu, and the MapScreener doesn't
         * specify blockInputs = true.
         * 
         * @param Diner
         * @returns Whether direction keys may trigger.
         */
        canDirectionsTrigger(Diner: RipLuckyDiner): boolean {
            if (Diner.GamesRunner.getPaused()) {
                return false;
            }

            if (Diner.MenuGrapher.getActiveMenu()) {
                return true;
            }

            return !Diner.MapScreener.blockInputs;
        }

        /**
         * 
         * Reacts to a Character simulating an up key press. If possible, this causes
         * walking in the up direction. The onKeyDownUp mod trigger is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownUp(thing: ICharacter, event?: Event): void {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }

            if (thing.player) {
                (<IPlayer>thing).keys[Direction.Top] = true;
            }

            thing.Diner.TimeHandler.addEvent(
                thing.Diner.keyDownDirectionReal,
                RipLuckyDiner.inputTimeTolerance,
                thing,
                0);

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * 
         * Reacts to a Character simulating a right key press. If possible, this causes
         * walking in the right direction. The onKeyDownRight mod trigger is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownRight(thing: ICharacter, event?: Event): void {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }

            if (thing.player) {
                (<IPlayer>thing).keys[Direction.Right] = true;
            }

            thing.Diner.TimeHandler.addEvent(
                thing.Diner.keyDownDirectionReal,
                RipLuckyDiner.inputTimeTolerance,
                thing,
                1);

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * 
         * Reacts to a Character simulating a down key press. If possible, this causes
         * walking in the down direction. The onKeyDownDown mod trigger is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownDown(thing: ICharacter, event?: Event): void {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }

            if (thing.player) {
                (<IPlayer>thing).keys[Direction.Bottom] = true;
            }

            thing.Diner.TimeHandler.addEvent(
                thing.Diner.keyDownDirectionReal,
                RipLuckyDiner.inputTimeTolerance,
                thing,
                2);

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to a Character simulating a left key press. If possible, this causes
         * walking in the left direction. The onKeyDownLeft mod trigger is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownLeft(thing: ICharacter, event?: Event): void {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }

            if (thing.player) {
                (<IPlayer>thing).keys[Direction.Left] = true;
            }

            thing.Diner.TimeHandler.addEvent(
                thing.Diner.keyDownDirectionReal,
                RipLuckyDiner.inputTimeTolerance,
                thing,
                3);

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Driver for a direction key being pressed. The MenuGraphr's active menu reacts
         * to the movement if it exists, or the triggering Character attempts to walk
         * if not. The onKeyDownDirectionReal mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownDirectionReal(thing: IPlayer, direction: Direction): void {
            if (!thing.player || !(<IPlayer>thing).keys[direction]) {
                return;
            }

            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.registerDirection(<number>direction);
            } else {
                if (thing.direction !== direction) {
                    thing.turning = direction;
                }

                if (thing.canKeyWalking && !thing.shouldWalk) {
                    thing.Diner.setPlayerDirection(thing, direction);
                    thing.canKeyWalking = false;
                } else {
                    thing.nextDirection = direction;
                }
            }
        }

        /**
         * Reacts to the A key being pressed. The MenuGraphr's active menu reacts to
         * the selection if it exists. The onKeyDownA mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownA(thing: ICharacter, event?: Event): void {
            if (thing.Diner.GamesRunner.getPaused()) {
                return;
            }

            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.registerA();
            } else if (thing.bordering[thing.direction]) {
                if (thing.bordering[thing.direction].activate) {
                    thing.bordering[thing.direction].activate(
                        thing,
                        thing.bordering[thing.direction]);
                }

                if ((<IPlayer>thing).keys) {
                    (<IPlayer>thing).keys.a = true;
                }
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the B key being pressed. The MenuGraphr's active menu reacts to
         * the deselection if it exists. The onKeyDownB mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownB(thing: ICharacter, event?: Event): void {
            if (thing.Diner.GamesRunner.getPaused()) {
                return;
            }

            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.registerB();
            } else if ((<IPlayer>thing).keys) {
                (<IPlayer>thing).keys.b = true;
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the pause key being pressed. The game is paused if it isn't 
         * already. The onKeyDownPause mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownPause(thing: ICharacter, event?: Event): void {
            if (!thing.Diner.GamesRunner.getPaused()) {
                thing.Diner.GamesRunner.pause();
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the mute key being pressed. The game has mute toggled, and the
         * onKeyDownMute mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyDownMute(thing: ICharacter, event?: Event): void {
            thing.Diner.AudioPlayer.toggleMuted();

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the left key being lifted. The onKeyUpLeft mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpLeft(thing: ICharacter, event?: Event): void {
            if (thing.player) {
                (<IPlayer>thing).keys[3] = false;

                if ((<IPlayer>thing).nextDirection === 3) {
                    delete (<IPlayer>thing).nextDirection;
                }
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * 
         * Reacts to the right key being lifted. The onKeyUpRight mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpRight(thing: ICharacter, event?: Event): void {
            if (thing.player) {
                (<IPlayer>thing).keys[1] = false;

                if ((<IPlayer>thing).nextDirection === 1) {
                    delete (<IPlayer>thing).nextDirection;
                }
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the up key being lifted. The onKeyUpUp mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpUp(thing: ICharacter, event?: Event): void {
            if (thing.player) {
                (<IPlayer>thing).keys[0] = false;

                if ((<IPlayer>thing).nextDirection === 0) {
                    delete (<IPlayer>thing).nextDirection;
                }
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * 
         * Reacts to the down key being lifted. The onKeyUpDown mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpDown(thing: ICharacter, event?: Event): void {
            if (thing.player) {
                (<IPlayer>thing).keys[2] = false;

                if ((<IPlayer>thing).nextDirection === 2) {
                    delete (<IPlayer>thing).nextDirection;
                }
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the A key being lifted. The onKeyUpA mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpA(thing: ICharacter, event?: Event): void {
            if (thing.player) {
                (<IPlayer>thing).keys.a = false;
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the B key being lifted. The onKeyUpB mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpB(thing: ICharacter, event?: Event): void {
            if (thing.player) {
                (<IPlayer>thing).keys.b = false;
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }

        /**
         * Reacts to the pause key being lifted. The onKeyUpLeft mod event is fired.
         * 
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        keyUpPause(thing: ICharacter, event?: Event): void {
            if (thing.Diner.GamesRunner.getPaused()) {
                thing.Diner.GamesRunner.play();
            }

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }


        /* Upkeep maintenance
        */

        /**
         * Generic maintenance Function for a group of Things. For each Thing, if
         * it isn't alive, it's removed from the group.
         * 
         * @param Diner
         * @param things   A group of Things to maintain.
         */
        maintainGeneric(Diner: RipLuckyDiner, things: IThing[]): void {
            for (let i: number = 0; i < things.length; i += 1) {
                if (!things[i].alive) {
                    Diner.arrayDeleteThing(things[i], things, i);
                    i -= 1;
                }
            }
        }

        /**
         * Maintenance for all active Characters. Walking, alive
         * checking, and quadrant maintenance are performed. 
         * 
         * @param Diner
         * @param characters   The Characters group of Things.
         */
        maintainCharacters(Diner: RipLuckyDiner, characters: ICharacter[]): void {
            let character: ICharacter;

            for (let i: number = 0; i < characters.length; i += 1) {
                character = characters[i];
                Diner.shiftCharacter(character);

                if (character.shouldWalk && !Diner.MenuGrapher.getActiveMenu()) {
                    character.onWalkingStart(character, character.direction);
                    character.shouldWalk = false;
                }

                if (!character.alive && !character.outerOk) {
                    Diner.arrayDeleteThing(character, characters, i);
                    i -= 1;
                    continue;
                }

                for (let j: number = 0; j < 4; j += 1) {
                    character.bordering[j] = undefined;
                }

                Diner.QuadsKeeper.determineThingQuadrants(character);
                Diner.ThingHitter.checkHitsForThing(character);
            }
        }

        /**
         * Maintenance for a Player. The screen is scrolled according to the global
         * MapScreener.scrollability.
         * 
         * @param Diner
         * @param player   An in-game Player Thing.
         */
        maintainPlayer(Diner: RipLuckyDiner, player: IPlayer): void {
            if (!player || !player.alive) {
                return;
            }

            switch (Diner.MapScreener.scrollability) {
                case Scrollability.Horizontal:
                    Diner.scrollWindow(Diner.getHorizontalScrollAmount(Diner));
                    return;

                case Scrollability.Vertical:
                    Diner.scrollWindow(0, Diner.getVerticalScrollAmount(Diner));
                    return;

                case Scrollability.Both:
                    Diner.scrollWindow(
                        Diner.getHorizontalScrollAmount(Diner),
                        Diner.getVerticalScrollAmount(Diner));
                    return;

                default:
                    return;
            }
        }

        /**
         * Determines how much to scroll horizontally during upkeep based
         * on player xvel and horizontal bordering.
         *
         * @param Diner
         * @returns How far to scroll horizontally.
         */
        getHorizontalScrollAmount(Diner: RipLuckyDiner): number {
            if (!Diner.player.xvel) {
                return 0;
            }

            if (Diner.player.xvel > 0) {
                return Diner.player.bordering[1] ? 0 : Diner.player.xvel;
            } else {
                return Diner.player.bordering[3] ? 0 : Diner.player.xvel;
            }
        }

        /**
         * Determines how much to scroll vertically during upkeep based
         * on player yvel and vertical bordering.
         *
         * @param Diner
         * @returns How far to scroll vertically.
         */
        getVerticalScrollAmount(Diner: RipLuckyDiner): number {
            if (!Diner.player.yvel) {
                return 0;
            }

            if (Diner.player.yvel > 0) {
                return Diner.player.bordering[2] ? 0 : Diner.player.yvel;
            } else {
                return Diner.player.bordering[0] ? 0 : Diner.player.yvel;
            }
        }



        /* General animations
        */

        /**
         * Snaps a moving Thing to a predictable grid position.
         * 
         * @param thing   A Thing to snap the position of.
         */
        animateSnapToGrid(thing: IThing): void {
            let grid: number = thing.Diner.unitsize * 8,
                x: number = (thing.Diner.MapScreener.left + thing.left) / grid,
                y: number = (thing.Diner.MapScreener.top + thing.top) / grid;

            thing.Diner.setLeft(thing, Math.round(x) * grid - thing.Diner.MapScreener.left);
            thing.Diner.setTop(thing, Math.round(y) * grid - thing.Diner.MapScreener.top);
        }

        /**
         * Freezes a Character to start a dialog.
         * 
         * @param thing   A Character to freeze.
         */
        animatePlayerDialogFreeze(thing: ICharacter): void {
            thing.Diner.animateCharacterPreventWalking(thing);
            thing.Diner.TimeHandler.cancelClassCycle(thing, "walking");

            if (thing.walkingFlipping) {
                thing.Diner.TimeHandler.cancelEvent(thing.walkingFlipping);
                thing.walkingFlipping = undefined;
            }
        }

        /**
         * Gradually changes a numeric attribute over time.
         * 
         * @param thing   A Thing whose attribute is to change.
         * @param attribute   The name of the attribute to change.
         * @param change   How much to change the attribute each tick.
         * @param goal   A final value for the attribute to stop at.
         * @param speed   How many ticks between changes.
         * @param onCompletion   A callback for when the attribute reaches the goal.
         * @returns The in-progress TimeEvent.
         */
        animateFadeAttribute(
            thing: IThing,
            attribute: string,
            change: number,
            goal: number,
            speed: number,
            onCompletion?: (thing: IThing) => void): TimeHandlr.ITimeEvent {

            thing[attribute] += change;

            if (change > 0) {
                if (thing[attribute] >= goal) {
                    thing[attribute] = goal;
                    if (typeof onCompletion === "function") {
                        onCompletion(thing);
                    }
                    return;
                }
            } else {
                if (thing[attribute] <= goal) {
                    thing[attribute] = goal;
                    if (typeof onCompletion === "function") {
                        onCompletion(thing);
                    }
                    return;
                }
            }

            return thing.Diner.TimeHandler.addEvent(
                thing.Diner.animateFadeAttribute,
                speed,
                thing,
                attribute,
                change,
                goal,
                speed,
                onCompletion);
        }

        /**
         * Fades the screen out to a solid color.
         * 
         * @param Diner
         * @param settings   Settings for the animation.
         * @returns The solid color Thing.
         */
        animateFadeToColor(Diner: RipLuckyDiner, settings: IColorFadeSettings = {}): IThing {
            let color: string = settings.color || "White",
                callback: (...args: any[]) => void = settings.callback,
                change: number = settings.change || .33,
                speed: number = settings.speed || 4,
                blank: IThing = Diner.ObjectMaker.make(color + "Square", {
                    "width": Diner.MapScreener.width,
                    "height": Diner.MapScreener.height,
                    "opacity": 0
                });

            Diner.addThing(blank);

            Diner.animateFadeAttribute(
                blank,
                "opacity",
                change,
                1,
                speed,
                function (): void {
                    if (!settings.keepColor) {
                        Diner.killNormal(blank);
                    }
                    if (callback) {
                        callback.call(Diner, Diner);
                    }
                });

            return blank;
        }

        /**
         * Places a solid color over the screen and fades it out.
         * 
         * @param Diner
         * @param settings   Settings for the animation.
         * @returns The solid color Thing.
         */
        animateFadeFromColor(Diner: RipLuckyDiner, settings: IColorFadeSettings = {}): IThing {
            let color: string = settings.color || "White",
                callback: (...args: any[]) => void = settings.callback,
                change: number = settings.change || .33,
                speed: number = settings.speed || 4,
                blank: IThing = Diner.ObjectMaker.make(color + "Square", {
                    "width": Diner.MapScreener.width,
                    "height": Diner.MapScreener.height,
                    "opacity": 1
                }),
                args: IArguments = arguments;

            Diner.addThing(blank);

            Diner.animateFadeAttribute(
                blank,
                "opacity",
                -change,
                0,
                speed,
                function (): void {
                    Diner.killNormal(blank);
                    if (callback) {
                        callback.apply(this, args);
                    }
                });

            return blank;
        }

        /**
         * Animates a "flicker" effect on a Thing by repeatedly toggling its hidden
         * flag for a little while.
         * 
         * @param thing   A Thing to flicker.
         * @param cleartime   How long to wait to stop the effect (by default, 49).
         * @param interval   How many steps between hidden toggles (by default, 2).
         * @param callback   A Function to called on the Thing when done flickering.
         * @returns The flickering time event.
         */
        animateFlicker(
            thing: IThing,
            cleartime: number = 49,
            interval: number = 2,
            callback?: (thing: IThing) => void): TimeHandlr.ITimeEvent {
            thing.flickering = true;

            thing.Diner.TimeHandler.addEventInterval(
                function (): void {
                    thing.hidden = !thing.hidden;
                    if (!thing.hidden) {
                        thing.Diner.PixelDrawer.setThingSprite(thing);
                    }
                },
                interval | 0,
                cleartime | 0);

            return thing.Diner.TimeHandler.addEvent(
                function (): void {
                    thing.flickering = thing.hidden = false;
                    thing.Diner.PixelDrawer.setThingSprite(thing);

                    if (callback) {
                        callback(thing);
                    }
                },
                ((cleartime * interval) | 0) + 1);
        }


        /* Character movement animations
        */

        /**
         * Sets a Character's xvel and yvel based on its speed and direction, and marks
         * its destination endpoint.
         * 
         * @param thing   A moving Character.
         * @param distance   How far the Character is moving.
         */
        animateCharacterSetDistanceVelocity(thing: ICharacter, distance: number): void {
            thing.distance = distance;

            switch (thing.direction) {
                case 0:
                    thing.xvel = 0;
                    thing.yvel = -thing.speed;
                    thing.destination = thing.top - distance;
                    break;

                case 1:
                    thing.xvel = thing.speed;
                    thing.yvel = 0;
                    thing.destination = thing.right + distance;
                    break;

                case 2:
                    thing.xvel = 0;
                    thing.yvel = thing.speed;
                    thing.destination = thing.bottom + distance;
                    break;

                case 3:
                    thing.xvel = -thing.speed;
                    thing.yvel = 0;
                    thing.destination = thing.left - distance;
                    break;

                default:
                    throw new Error("Unknown direction: " + thing.direction + ".");
            }
        }

        /**
         * Starts a Character's walking cycle regardless of the direction.
         * 
         * @param thing   A Character to start walking.
         * @param direction   What direction the Character should turn to face.
         * @param onStop   A queue of commands as alternating directions and distances.
         */
        animateCharacterStartWalkingCycle(thing: ICharacter, direction: Direction, onStop: IWalkingOnStop): void {
            if (onStop.length === 0) {
                return;
            }

            // If the first queued command is a 0 distance, walking might be complete
            if (onStop[0] === 0) {
                // More commands indicates walking isn't done, and to continue turning/walking
                if (onStop.length > 1) {
                    if (typeof onStop[1] === "function") {
                        (<IWalkingOnStopCommandFunction>onStop[1])(thing);
                        return;
                    }

                    thing.Diner.animateCharacterSetDirection(thing, DirectionAliases[<number>onStop[1]]);

                    thing.Diner.animateCharacterStartWalkingCycle(
                        thing,
                        DirectionAliases[<number>onStop[1]],
                        onStop.slice(2));
                }

                return;
            }

            thing.Diner.animateCharacterStartWalking(thing, direction, onStop);

            if (!thing.bordering[direction]) {
                thing.Diner.shiftBoth(thing, -thing.xvel, -thing.yvel);
            }
        }

        /**
         * Starts a Character walking in the given direction as part of a walking cycle.
         * 
         * @param thing   The Character to start walking.
         * @param direction   What direction to walk in (by default, up).
         * @param onStop   A queue of commands as alternating directions and distances.
         */
        animateCharacterStartWalking(thing: ICharacter, direction: Direction = Direction.Top, onStop?: any): void {
            let repeats: number = thing.Diner.MathDecider.compute("speedWalking", thing),
                distance: number = repeats * thing.speed;

            thing.walking = true;
            thing.Diner.animateCharacterSetDirection(thing, direction);
            thing.Diner.animateCharacterSetDistanceVelocity(thing, distance);

            if (!thing.cycles || !(<any>thing.cycles).walking) {
                thing.Diner.TimeHandler.addClassCycle(
                    thing,
                    ["walking", "standing"],
                    "walking",
                    repeats / 2);
            }

            if (!thing.walkingFlipping) {
                thing.walkingFlipping = thing.Diner.TimeHandler.addEventInterval(
                    thing.Diner.animateSwitchFlipOnDirection, repeats, Infinity, thing);
            }

            thing.Diner.TimeHandler.addEventInterval(
                thing.onWalkingStop, repeats, Infinity, thing, onStop);

            if (!thing.bordering[direction]) {
                thing.Diner.shiftBoth(thing, thing.xvel, thing.yvel);
            }
        }

        /**
         * Starts a roaming Character walking in a random direction, determined
         * by the allowed directions it may use (that aren't blocked).
         * 
         * @param thing   A roaming Character.
         */
        animateCharacterStartWalkingRandom(thing: ICharacter): void {
            let totalAllowed: number = 0,
                direction: Direction,
                i: number;

            for (i = 0; i < 4; i += 1) {
                if (!thing.bordering[i]) {
                    totalAllowed += 1;
                }
            }

            if (totalAllowed === 0) {
                return;
            }

            direction = thing.Diner.NumberMaker.randomInt(totalAllowed);

            for (i = 0; i <= direction; i += 1) {
                if (thing.bordering[i]) {
                    direction += 1;
                }
            }

            if (thing.roamingDirections.indexOf(direction) === -1) {
                thing.Diner.animateCharacterSetDirection(thing, direction);
            } else {
                thing.Diner.animateCharacterStartWalking(thing, direction);
            }
        }

        /**
         * Continues a Character's walking cycle after taking a step. If .turning
         * is provided, the Character turns. If a Player is provided, its keys
         * and .canKeyWalking are respected.
         * 
         * @param thing   A Character mid-step.
         */
        animateCharacterRepeatWalking(thing: ICharacter): void {
            if (typeof thing.turning !== "undefined") {
                if (!thing.player || !(<IPlayer>thing).keys[thing.turning]) {
                    thing.Diner.animateCharacterSetDirection(thing, thing.turning);
                    thing.turning = undefined;
                    return;
                }

                thing.turning = undefined;
            }

            if (thing.player) {
                (<IPlayer>thing).canKeyWalking = false;
            }

            thing.Diner.animateCharacterStartWalking(thing, thing.direction);
        }

        /**
         * Reacts to a Character finishing a step and either stops all walking or moves to
         * the next action in the onStop queue.
         * 
         * @param thing   A Character finishing a walking step.
         * @param onStop   A queue of commands as alternating directions and distances.
         * @returns True, unless the next onStop is a Function to return the result of.
         */
        animateCharacterStopWalking(thing: ICharacter, onStop?: IWalkingOnStop): boolean {
            thing.xvel = 0;
            thing.yvel = 0;
            thing.walking = false;

            thing.Diner.removeClasses(thing, "walking", "standing");
            thing.Diner.TimeHandler.cancelClassCycle(thing, "walking");

            if (thing.walkingFlipping) {
                thing.Diner.TimeHandler.cancelEvent(thing.walkingFlipping);
                thing.walkingFlipping = undefined;
            }

            thing.Diner.animateSnapToGrid(thing);

            if (!onStop) {
                return true;
            }

            switch (onStop.constructor) {
                case Number:
                    thing.Diner.animateCharacterRepeatWalking(thing);
                    break;

                case Array:
                    if (onStop[0] > 0) {
                        onStop[0] = <number>onStop[0] - 1;
                        thing.Diner.animateCharacterStartWalkingCycle(thing, thing.direction, onStop);
                    } else if (onStop.length === 0) {
                        break;
                    } else {
                        if (onStop[1] instanceof Function) {
                            return <boolean>(<IWalkingOnStopCommandFunction>onStop[1])(thing);
                        }
                        thing.Diner.animateCharacterStartWalkingCycle(
                            thing,
                            DirectionAliases[<number>onStop[1]],
                            onStop.slice(2));
                    }
                    break;

                case Function:
                    return (<any>onStop)(thing);

                default:
                    throw new Error("Unknown onStop: " + onStop + ".");
            }

            return true;
        }

        /**
         * Animates a Player to stop walking, which is the same logic for a normal
         * Character as well as MenuGrapher checks.
         * 
         * @param thing   A Player to stop walking.
         * @param onStop   A queue of commands as alternating directions and distances.
         * @returns True, unless the next onStop is a Function to return the result of.
         */
        animatePlayerStopWalking(thing: IPlayer, onStop: IWalkingOnStop): boolean {
            if (
                !thing.Diner.MenuGrapher.getActiveMenu()
                && thing.keys[thing.direction]) {
                thing.Diner.animateCharacterSetDistanceVelocity(thing, thing.distance);
                return false;
            }

            if (typeof thing.nextDirection !== "undefined") {
                if (thing.nextDirection !== thing.direction && !thing.ledge) {
                    thing.Diner.setPlayerDirection(thing, thing.nextDirection);
                }

                delete thing.nextDirection;
            } else {
                thing.canKeyWalking = true;
            }

            return thing.Diner.animateCharacterStopWalking(thing, onStop);
        }

        /**
         * Animates a Character to no longer be able to walk.
         * 
         * @param thing   A Character that shouldn't be able to walk.
         */
        animateCharacterPreventWalking(thing: ICharacter): void {
            thing.shouldWalk = false;
            thing.xvel = thing.yvel = 0;

            if (thing.player) {
                (<IPlayer>thing).keys = (<IPlayer>thing).getKeys();
            }

            thing.Diner.MapScreener.blockInputs = true;
        }

        /**
         * Sets a Thing facing a particular direction.
         * 
         * @param thing   An in-game Thing.
         * @param direction   A direction for thing to face.
         * @todo Add more logic here for better performance.
         */
        animateCharacterSetDirection(thing: IThing, direction: Direction): void {
            thing.direction = direction;

            if (direction % 2 === 1) {
                thing.Diner.unflipHoriz(thing);
            }

            thing.Diner.removeClasses(
                thing,
                DirectionClasses[Direction.Top],
                DirectionClasses[Direction.Right],
                DirectionClasses[Direction.Bottom],
                DirectionClasses[Direction.Left]);

            thing.Diner.addClass(thing, DirectionClasses[direction]);

            if (direction === Direction.Right) {
                thing.Diner.flipHoriz(thing);
                thing.Diner.addClass(thing, DirectionClasses[Direction.Left]);
            }
        }

        /**
         * Sets a Thing facing a random direction.
         *
         * @param thing   An in-game Thing.
         */
        animateCharacterSetDirectionRandom(thing: IThing): void {
            thing.Diner.animateCharacterSetDirection(thing, thing.Diner.NumberMaker.randomIntWithin(0, 3));
        }

        /**
         * Flips or unflips a Character if its direction is vertical.
         * 
         * @param thing   A Character to flip or unflip.
         */
        animateSwitchFlipOnDirection(thing: ICharacter): void {
            if (thing.direction % 2 !== 0) {
                return;
            }

            if (thing.flipHoriz) {
                thing.Diner.unflipHoriz(thing);
            } else {
                thing.Diner.flipHoriz(thing);
            }
        }

        /**
         * Animates the various logic pieces for finishing a dialog, such as pushes.
         * 
         * @param thing   A Player that's finished talking to other.
         * @param other   A Character that thing has finished talking to.
         */
        animateCharacterDialogFinish(thing: IPlayer, other: ICharacter): void {
            let onStop: IWalkingOnStop;

            if (other.pushSteps) {
                onStop = other.pushSteps;
            }

            if (other.directionPreferred) {
                this.animateCharacterSetDirection(other, other.directionPreferred);
            }

            thing.talking = false;
            other.talking = false;
            thing.canKeyWalking = true;
        }


        /* Collision detection
        */

        /**
         * Function generator for the generic canThingCollide checker. This is used
         * repeatedly by ThingHittr to generate separately optimized Functions for
         * different Thing types.
         * 
         * @returns A Function that generates a canThingCollide checker.
         */
        generateCanThingCollide(): (thing: IThing) => boolean {
            /**
             * Generic checker for canCollide. This just returns if the Thing is alive.
             * 
             * @param thing
             * @returns Whether the thing can collide.
             */
            return function canThingCollide(thing: IThing): boolean {
                return thing.alive;
            };
        }

        /**
         * Function generator for the generic isCharacterTouchingCharacter checker.
         * This is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         * 
         * @returns A Function that generates isCharacterTouchingCharacter. 
         */
        generateIsCharacterTouchingCharacter(): (thing: ICharacter, other: ICharacter) => boolean {
            /**
             * Generic checker for whether two characters are touching each other.
             * This checks to see if either has the nocollide flag, or if they're
             * overlapping, respecting tolerances.
             * 
             * @param thing
             * @param other
             * @returns Whether thing is touching other.
             */
            return function isCharacterTouchingCharacter(thing: ICharacter, other: ICharacter): boolean {
                // if (other.xvel || other.yvel) {
                //     // check destination...
                // }
                return (
                    !thing.nocollide && !other.nocollide
                    && thing.right >= (other.left + other.tolLeft)
                    && thing.left <= (other.right - other.tolRight)
                    && thing.bottom >= (other.top + other.tolTop)
                    && thing.top <= (other.bottom - other.tolBottom));
            };
        }

        /**
         * Function generator for the generic isCharacterTouchingSolid checker. This
         * is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         * 
         * @returns A Function that generates isCharacterTouchingSolid.
         */
        generateIsCharacterTouchingSolid(): (thing: ICharacter, other: IThing) => boolean {
            /**
             * Generic checker for whether a character is touching a solid. The
             * hidden, collideHidden, and nocollidesolid flags are most relevant.
             * 
             * @param thing
             * @param other
             * @returns Whether thing is touching other.
             */
            return function isCharacterTouchingSolid(thing: ICharacter, other: IThing): boolean {
                return (
                    !thing.nocollide && !other.nocollide
                    && thing.right >= (other.left + other.tolLeft)
                    && thing.left <= (other.right - other.tolRight)
                    && thing.bottom >= (other.top + other.tolTop)
                    && thing.top <= (other.bottom - other.tolBottom));
            };
        }

        /**
         * Function generator for the generic hitCharacterThing callback. This is 
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         * 
         * @returns A Function that generates hitCharacterThing.
         */
        generateHitCharacterThing(): (thing: ICharacter, other: IThing) => boolean {
            /**
             * Generic callback for when a Character touches a Thing. Other may have a
             * .collide to override with, but normally this just sets thing's position.
             * 
             * @param thing
             * @param other
             * @returns Whether thing is hitting other.
             */
            return function hitCharacterThing(thing: ICharacter, other: IThing): boolean {
                // If either Thing is the player, it should be the first
                if ((<ICharacter>other).player && !thing.player) {
                    [thing, other] = [<ICharacter>other, thing];
                }

                // The other's collide may return true to cancel overlapping checks
                if (other.collide && other.collide(thing, other)) {
                    return;
                }

                // Both the thing and other should know they're bordering each other
                // If other is a large solid, this will be irreleveant, so it's ok
                // that multiple borderings will be replaced by the most recent
                switch (thing.Diner.getDirectionBordering(thing, other)) {
                    case Direction.Top:
                        if (thing.left !== other.right - other.tolRight && thing.right !== other.left + other.tolLeft) {
                            thing.Diner.setThingBordering(thing, other, Direction.Top);
                            thing.Diner.setThingBordering(other, thing, Direction.Bottom);
                            thing.Diner.setTop(thing, other.bottom - other.tolBottom);
                        }
                        break;

                    case Direction.Right:
                        if (thing.top !== other.bottom - other.tolBottom && thing.bottom !== other.top + other.tolTop) {
                            thing.Diner.setThingBordering(thing, other, Direction.Right);
                            thing.Diner.setThingBordering(other, thing, Direction.Left);
                            thing.Diner.setRight(thing, other.left + other.tolLeft);
                        }
                        break;

                    case Direction.Bottom:
                        if (thing.left !== other.right - other.tolRight && thing.right !== other.left + other.tolLeft) {
                            thing.Diner.setThingBordering(thing, other, Direction.Bottom);
                            thing.Diner.setThingBordering(other, thing, Direction.Top);
                            thing.Diner.setBottom(thing, other.top + other.tolTop);
                        }
                        break;

                    case Direction.Left:
                        if (thing.top !== other.bottom - other.tolBottom && thing.bottom !== other.top + other.tolTop) {
                            thing.Diner.setThingBordering(thing, other, Direction.Left);
                            thing.Diner.setThingBordering(other, thing, Direction.Right);
                            thing.Diner.setLeft(thing, other.right - other.tolRight);
                        }
                        break;

                    default:
                        break;
                }
            };
        }

        /**
         * Marks other as being a border of thing in the given direction, respecting borderPrimary.
         * 
         * @param thing   A Thing whose borders are being checked.
         * @param other   A new border for thing.
         * @param direction   The direction border being changed.
         */
        setThingBordering(thing: IThing, other: IThing, direction: Direction): void {
            if (thing.bordering[direction] && thing.bordering[direction].borderPrimary && !other.borderPrimary) {
                return;
            }

            thing.bordering[direction] = other;
        }

        /**
         * Collision callback for a Character and a CollisionDetector. Only Players may
         * trigger the detector, which has to be active to do anything.
         * 
         * @param thing   A Character triggering other.
         * @param other   A Detector triggered by thing.
         * @returns Whether to override normal positioning logic in hitCharacterThing.
         */
        collideCollisionDetector(thing: IPlayer, other: IDetector): boolean {
            if (!thing.player) {
                return false;
            }

            if (other.active) {
                if (!other.requireOverlap || thing.Diner.isThingWithinOther(thing, other)) {
                    if (
                        typeof other.requireDirection !== "undefined"
                        && !thing.keys[other.requireDirection]
                        && !thing.allowDirectionAsKeys
                        && thing.direction !== other.requireDirection
                    ) {
                        return false;
                    }

                    if (other.singleUse) {
                        other.active = false;
                    }
                    other.activate(thing, other);
                }

                return true;
            }

            // If the thing is moving towards the triggerer, it's now active
            if (thing.direction === thing.Diner.getDirectionBordering(thing, other)) {
                other.active = true;
                return true;
            }
        }

        /**
         * Collision callback for a Player and a dialog-containing Character. The
         * dialog is started if it exists, as with a cutscene from other.
         * 
         * @param thing   A Player triggering other.
         * @param other   A Character with dialog triggered by thing.
         */
        collideCharacterDialog(thing: IPlayer, other: ICharacter): void {
            let dialog: MenuGraphr.IMenuDialogRaw | MenuGraphr.IMenuDialogRaw[] = other.dialog,
                direction: Direction;

            if (other.cutscene) {
                thing.Diner.ScenePlayer.startCutscene(other.cutscene, {
                    "thing": thing,
                    "triggerer": other
                });
            }

            if (!dialog) {
                return;
            }

            direction = thing.Diner.getDirectionBetween(other, thing);

            if (other.dialogDirections) {
                dialog = (<MenuGraphr.IMenuDialogRaw[]>dialog)[direction];
                if (!dialog) {
                    return;
                }
            }

            thing.talking = true;
            other.talking = true;
            thing.canKeyWalking = false;

            if (!thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.createMenu("GeneralText", {
                    "deleteOnFinish": !other.dialogOptions
                });
                thing.Diner.MenuGrapher.setActiveMenu("GeneralText");
                thing.Diner.MenuGrapher.addMenuDialog(
                    "GeneralText",
                    dialog,
                    thing.Diner.animateCharacterDialogFinish.bind(thing.Diner, thing, other)
                );
            }

            if (other.switchDirectionOnDialog) {
                thing.Diner.animateCharacterSetDirection(other, direction);
            }
        }


        /* Death
        */

        /**
         * Standard Function to kill a Thing, which means marking it as dead and
         * clearing its numquads, resting, movement, and cycles. It will later be
         * removed by its maintain* Function.
         * 
         * @param thing   A Thing to kill.
         */
        killNormal(thing: IThing): void {
            if (!thing) {
                return;
            }

            thing.nocollide = thing.hidden = thing.dead = true;
            thing.alive = false;
            thing.numquads = 0;
            thing.movement = undefined;

            if (thing.Diner) {
                thing.Diner.TimeHandler.cancelAllCycles(thing);

                if (thing.id) {
                    delete thing.Diner.MapScreener.thingsById[thing.id];
                }
            }
        }


        /* Activations
        */

        /**
         * Activates a Detector to open a menu, and potentially a dialog.
         * 
         * @param thing   A Character triggering other.
         * @param other   A Detector triggered by thing.
         */
        activateMenuTriggerer(thing: ICharacter, other: IMenuTriggerer): void {
            if (!other.alive || thing.collidedTrigger === other) {
                return;
            }

            let name: string = other.menu || "GeneralText",
                dialog: MenuGraphr.IMenuDialogRaw | MenuGraphr.IMenuDialogRaw[] = other.dialog;

            thing.collidedTrigger = other;
            thing.Diner.animateCharacterPreventWalking(thing);

            if (!other.keepAlive) {
                thing.Diner.killNormal(other);
            }

            if (!thing.Diner.MenuGrapher.getMenu(name)) {
                thing.Diner.MenuGrapher.createMenu(name, other.menuAttributes);
            }

            if (dialog) {
                thing.Diner.MenuGrapher.addMenuDialog(
                    name,
                    dialog,
                    function (): void {
                        let onStop: IWalkingOnStop;

                        if (other.pushSteps) {
                            onStop = other.pushSteps.slice();
                        }

                        thing.Diner.MenuGrapher.deleteMenu("GeneralText");

                        if (typeof other.pushDirection !== "undefined") {
                            onStop.push(function (): void {
                                thing.Diner.MapScreener.blockInputs = false;
                                delete thing.collidedTrigger;
                            });
                            thing.Diner.animateCharacterStartWalkingCycle(
                                thing, other.pushDirection, onStop);
                        } else {
                            thing.Diner.MapScreener.blockInputs = false;
                            delete thing.collidedTrigger;
                        }
                    });
            }

            thing.Diner.MenuGrapher.setActiveMenu(name);
        }

        /**
         * Activation callback for level transports (any Thing with a .transport 
         * attribute). Depending on the transport, either the map or location are 
         * shifted to it.
         * 
         * @param thing   A Character attempting to enter other.
         * @param other   A transporter being entered by thing.
         */
        activateTransporter(thing: ICharacter, other: ITransporter): void {
            if (!thing.player || !other.active) {
                return;
            }

            if (typeof other.transport === "undefined") {
                throw new Error("No transport given to activateTransporter");
            }

            let transport: ITransportSchema = <ITransportSchema>other.transport,
                callback: Function,
                args: any[];

            if (transport.constructor === String) {
                callback = thing.Diner.setLocation.bind(thing.Diner);
                args = [transport];
            } else if (typeof transport.map !== "undefined") {
                callback = thing.Diner.setMap.bind(thing.Diner);
                args = [transport.map, transport.location];
            } else if (typeof transport.location !== "undefined") {
                callback = thing.Diner.setLocation.bind(thing.Diner);
                args = [transport.location];
            } else {
                throw new Error("Unknown transport type:" + transport);
            }

            other.active = false;

            thing.Diner.animateFadeToColor(thing.Diner, {
                "color": "Black",
                "callback": callback.apply.bind(callback, thing.Diner, args)
            });
        }


        /* Physics
        */

        /**
         * Determines the bordering direction from one Thing to another.
         * 
         * @param thing   The source Thing.
         * @param other   The destination Thing.
         * @returns The direction from thing to other.
         */
        getDirectionBordering(thing: IThing, other: IThing): Direction {
            if (Math.abs((thing.top) - (other.bottom - other.tolBottom)) < thing.Diner.unitsize) {
                return Direction.Top;
            }

            if (Math.abs(thing.right - other.left) < thing.Diner.unitsize) {
                return Direction.Right;
            }

            if (Math.abs(thing.bottom - other.top) < thing.Diner.unitsize) {
                return Direction.Bottom;
            }

            if (Math.abs(thing.left - other.right) < thing.Diner.unitsize) {
                return Direction.Left;
            }

            return undefined;
        }

        /**
         * Determines the direction from one Thing to another.
         * 
         * @param thing   The source Thing.
         * @param other   The destination Thing.
         * @returns The direction from thing to other.
         * @remarks Like getDirectionBordering, but for cases where the two Things
         *          aren't necessarily touching.
         */
        getDirectionBetween(thing: IThing, other: IThing): Direction {
            let directionBordering: Direction = thing.Diner.getDirectionBordering(thing, other);

            if (typeof directionBordering !== "undefined") {
                return directionBordering;
            }

            if (thing.top > other.bottom + thing.Diner.unitsize) {
                return Direction.Top;
            }

            if (thing.right < other.left - thing.Diner.unitsize) {
                return Direction.Right;
            }

            if (thing.bottom < other.top - thing.Diner.unitsize) {
                return Direction.Bottom;
            }

            if (thing.left > other.right + thing.Diner.unitsize) {
                return Direction.Left;
            }

            return undefined;
        }

        /**
         * Checks whether one Thing is overlapping another.
         * 
         * @param thing   An in-game Thing.
         * @param other   An in-game Thing.
         * @returns Whether thing and other are overlapping.
         */
        isThingWithinOther(thing: IThing, other: IThing): boolean {
            return (
                thing.top >= other.top
                && thing.right <= other.right
                && thing.bottom <= other.bottom
                && thing.left >= other.left);
        }

        /**
         * Shifts a Character according to its xvel and yvel.
         * 
         * @param thing   A Character to shift.
         */
        shiftCharacter(thing: ICharacter): void {
            if (thing.bordering[Direction.Top] && thing.yvel < 0) {
                thing.yvel = 0;
            }

            if (thing.bordering[Direction.Right] && thing.xvel > 0) {
                thing.xvel = 0;
            }

            if (thing.bordering[Direction.Bottom] && thing.yvel > 0) {
                thing.yvel = 0;
            }

            if (thing.bordering[Direction.Left] && thing.xvel < 0) {
                thing.xvel = 0;
            }

            thing.Diner.shiftBoth(thing, thing.xvel, thing.yvel);
        }

        /**
         * Sets a Player looking in a direction and updates MapScreener.
         * 
         * @param thing   An in-game Player.
         * @param direction   A direction for thing to look at.
         */
        setPlayerDirection(thing: IPlayer, direction: Direction): void {
            thing.direction = direction;
            thing.Diner.MapScreener.playerDirection = direction;
            thing.shouldWalk = true;
        }


        /* Spawning
        */

        /**
         * Spawning callback for Characters. Sight and roaming are accounted for.
         * 
         * @param thing   A newly placed Character.
         */
        spawnCharacter(thing: ICharacter): void {
            if (thing.roaming) {
                thing.Diner.TimeHandler.addEvent(
                    thing.Diner.activateCharacterRoaming,
                    thing.Diner.NumberMaker.randomInt(70),
                    thing);
            }
        }

        /**
         * Starts a Character roaming in random directions.
         * 
         * @param thing   A Character to start roaming.
         * @returns Whether the time cycle should stop (thing is dead).
         */
        activateCharacterRoaming(thing: ICharacter): boolean {
            if (!thing.alive) {
                return true;
            }

            thing.Diner.TimeHandler.addEvent(
                thing.Diner.activateCharacterRoaming,
                24 + thing.Diner.NumberMaker.randomInt(70),
                thing);

            if (!thing.talking && !thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.animateCharacterStartWalkingRandom(thing);
            }

            return false;
        }


        /**
         * Expands the MapScreener boundaries for a newly added Area.
         * 
         * @param Diner
         * @param area   The newly added Area.
         * @param x   The x-location of the expansion.
         * @param y   The y-location of the expansion.
         * @todo For now, this assumes any Area with an added Area is outdoors (which
         *       hasn't been shown to be incorrect yet).
         */
        expandMapBoundariesForArea(Diner: RipLuckyDiner, area: IArea, dx: number, dy: number): void {
            Diner.MapScreener.scrollability = Scrollability.Both;
        }


        /* Map sets
        */

        /**
         * Sets the game state to a new Map, resetting all Things and inputs in the
         * process. The mod events are fired.
         * 
         * @param name   The name of the Map.
         * @param location   The name of the Location within the Map.
         * @param noEntrance    Whether or not an entry Function should
         *                      be skipped (by default, false).
         * @remarks Most of the work here is done by setLocation.
         */
        setMap(name: string, location?: string, noEntrance?: boolean): void {
            if (typeof name === "undefined" || name.constructor === RipLuckyDiner) {
                name = this.AreaSpawner.getMapName();
            }

            let map: IMap = <IMap>this.AreaSpawner.setMap(name);

            this.NumberMaker.resetFromSeed(map.seed);
            this.InputWriter.restartHistory();

            this.setLocation(
                location
                || map.locationDefault
                || this.settings.maps.locationDefault,
                noEntrance);
        }

        /**
         * Sets the game state to a Location within the current map, resetting all
         * Things, inputs, the current Area, PixelRender, and MapScreener in the
         * process. The Location's entry Function is called to bring a new Player
         * into the game if specified. The mod events are fired.
         * 
         * @param name   The name of the Location within the Map.
         * @param noEntrance   Whether or not an entry Function should
         *                     be skipped (by default, false).
         */
        setLocation(name: string, noEntrance?: boolean): void {
            name = name || "0";

            this.AudioPlayer.clearAll();
            this.GroupHolder.clearArrays();
            this.MapScreener.clearScreen();
            this.MapScreener.thingsById = this.generateThingsByIdContainer();
            this.MenuGrapher.deleteAllMenus();
            this.TimeHandler.cancelAllEvents();

            this.AreaSpawner.setLocation(name);
            this.MapScreener.setVariables();

            let location: ILocation = <ILocation>this.AreaSpawner.getLocation(name);
            location.area.spawnedBy = {
                "name": name,
                "timestamp": new Date().getTime()
            };

            this.PixelDrawer.setBackground((<IArea>this.AreaSpawner.getArea()).background);

            this.StateHolder.setCollection(location.area.map.name + "::" + location.area.name);

            this.QuadsKeeper.resetQuadrants();

            let theme: string = location.theme || location.area.theme || location.area.map.theme;
            this.MapScreener.theme = theme;
            if (theme && this.AudioPlayer.getThemeName() !== theme) {
                this.AudioPlayer.playTheme(theme);
            }

            if (!noEntrance) {
                location.entry(this, location);
            }

            this.GamesRunner.play();

            this.animateFadeFromColor(this, {
                "color": "Black"
            });

            if (location.push) {
                this.animateCharacterStartWalking(this.player, this.player.direction);
            }
        }

        /**
         * Determines the in-game measurements of the
         * boundaries of the current Area.
         * 
         * @param Diner
         * @returns The boundaries of the current Area.
         */
        getAreaBoundariesReal(Diner: RipLuckyDiner): IAreaBoundaries {
            let area: IArea = <IArea>Diner.AreaSpawner.getArea();

            if (!area) {
                return {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0,
                    "width": 0,
                    "height": 0
                };
            }

            return {
                "top": area.boundaries.top * Diner.unitsize,
                "right": area.boundaries.right * Diner.unitsize,
                "bottom": area.boundaries.bottom * Diner.unitsize,
                "left": area.boundaries.left * Diner.unitsize,
                "width": (area.boundaries.right - area.boundaries.left) * Diner.unitsize,
                "height": (area.boundaries.bottom - area.boundaries.top) * Diner.unitsize
            };
        }

        /**
         * Determines the scrollable directions.
         * 
         * @param Diner
         * @returns The direction(s) that are scrollable.
         * @todo Strict type the returned string to a new IScrollability.
         *       When TypeScript 1.8 is out of beta, we'll be able to use 
         *       string literals as types. This would be 
         *       "both" | "horizontal" | "vertical" | "none".
         */
        getScreenScrollability(Diner: RipLuckyDiner): Scrollability {
            let area: IArea = <IArea>Diner.AreaSpawner.getArea();
            if (!area) {
                return Scrollability.None;
            }

            let boundaries: IAreaBoundaries = area.boundaries,
                width: number = (boundaries.right - boundaries.left) * Diner.unitsize,
                height: number = (boundaries.bottom - boundaries.top) * Diner.unitsize;

            if (width > Diner.MapScreener.width) {
                if (height > Diner.MapScreener.height) {
                    return Scrollability.Both;
                }

                return Scrollability.Horizontal;
            }

            if (height > Diner.MapScreener.height) {
                return Scrollability.Vertical;
            }

            return Scrollability.None;
        }

        /**
         * 
         */
        generateThingsByIdContainer(): IThingsById {
            return {};
        }


        /* Map entrances
        */

        /**
         * Centers the current view of the Map based on scrollability.
         * 
         * @param Diner
         */
        centerMapScreen(Diner: RipLuckyDiner): void {
            switch (Diner.MapScreener.scrollability) {
                case Scrollability.None:
                    Diner.centerMapScreenHorizontally(Diner);
                    Diner.centerMapScreenVertically(Diner);
                    return;

                case Scrollability.Vertical:
                    Diner.centerMapScreenHorizontally(Diner);
                    Diner.centerMapScreenVerticallyOnPlayer(Diner);
                    return;

                case Scrollability.Horizontal:
                    Diner.centerMapScreenHorizontallyOnPlayer(Diner);
                    Diner.centerMapScreenVertically(Diner);
                    return;

                case Scrollability.Both:
                    Diner.centerMapScreenHorizontallyOnPlayer(Diner);
                    Diner.centerMapScreenVerticallyOnPlayer(Diner);
                    return;

                default:
                    return;
            }
        }

        /**
         * Scrolls the game window horizontally until the Map is centered based on
         * the Area.
         * 
         * @param Diner
         */
        centerMapScreenHorizontally(Diner: RipLuckyDiner): void {
            let boundaries: IAreaBoundaries = Diner.MapScreener.boundaries,
                difference: number = Diner.MapScreener.width - boundaries.width;

            if (difference > 0) {
                Diner.scrollWindow(difference / -2);
            }
        }

        /**
         * Scrolls the game window vertically until the Map is centered based on
         * the Area.
         * 
         * @param Diner
         */
        centerMapScreenVertically(Diner: RipLuckyDiner): void {
            let boundaries: IAreaBoundaries = Diner.MapScreener.boundaries,
                difference: number = Diner.MapScreener.height - boundaries.height;

            Diner.scrollWindow(0, difference / -2);
        }

        /**
         * Scrolls the game window horizontally until the Map is centered on the player.
         * 
         * @param Diner
         */
        centerMapScreenHorizontallyOnPlayer(Diner: RipLuckyDiner): void {
            let difference: number = (Diner.getMidX(Diner.player) - Diner.MapScreener.middleX) | 0;

            if (Math.abs(difference) > 0) {
                Diner.scrollWindow(difference);
            }
        }

        /**
         * Scrolls the game window vertically until the Map is centered on the player.
         * 
         * @param Diner
         */
        centerMapScreenVerticallyOnPlayer(Diner: RipLuckyDiner): void {
            let difference: number = (Diner.getMidY(Diner.player) - Diner.MapScreener.middleY) | 0;

            if (Math.abs(difference) > 0) {
                Diner.scrollWindow(0, difference);
            }
        }

        /**
         * A blank Map entrance Function where no Character is placed.
         * 
         * @param Diner
         * @param location   The Location within the Map.
         */
        mapEntranceBlank(Diner: RipLuckyDiner, location: ILocation): void {
            Diner.addPlayer(0, 0);
            Diner.player.hidden = true;

            if (location.cutscene) {
                Diner.ScenePlayer.startCutscene(location.cutscene, {
                    "player": Diner.player
                });
            }
        }


        /**
         * Standard Map entrance Function. Character is placed based on specified Location. 
         * 
         * @param Diner
         * @param location   The Location within the Map.
         */
        mapEntranceNormal(Diner: RipLuckyDiner, location: ILocation): void {
            Diner.addPlayer(
                location.xloc ? location.xloc * Diner.unitsize : 0,
                location.yloc ? location.yloc * Diner.unitsize : 0);

            Diner.animateCharacterSetDirection(
                Diner.player,
                (typeof location.direction === "undefined"
                    ? Diner.MapScreener.playerDirection
                    : location.direction)
                || 0);

            Diner.centerMapScreen(Diner);

            if (location.cutscene) {
                Diner.ScenePlayer.startCutscene(location.cutscene, {
                    "player": Diner.player
                });
            }

            if (location.routine && Diner.ScenePlayer.getCutsceneName()) {
                Diner.ScenePlayer.playRoutine(location.routine);
            }
        }


        /* Cutscenes
        */

        /**
         * Cutscene for the beginning of the game introduction.
         *
         * @param Diner
         * @param settings   Settings used for the cutscene.
         */
        cutsceneFarewellFadeIn(Diner: RipLuckyDiner): void {
            Diner.animateFadeToColor(Diner, {
                callback: (): void => {
                    Diner.cutsceneFarewellFirstDialog(Diner);
                },
                change: .05,
                keepColor: true,
                speed: 10
            });
        }

        /**
         * Cutscene for Oak's introduction.
         *
         * @param Diner
         * @param settings   Settings used for the cutscene.
         */
        cutsceneFarewellFirstDialog(Diner: RipLuckyDiner): void {
            Diner.MenuGrapher.createMenu("GeneralText");
            Diner.MenuGrapher.addMenuDialog(
                "GeneralText",
                [
                    "Rest in peace, Lucky Diner.",
                    "We'll miss you!",
                ],
                (): void => {
                    Diner.setLocation("Front Door");
                });
            Diner.MenuGrapher.setActiveMenu("GeneralText");
        }


        /* Miscellaneous utilities
        */

        /**
         * Creates a new String equivalent to an old String repeated any number of
         * times. If times is 0, a blank String is returned.
         * 
         * @param {String} string   The characters to repeat.
         * @param {Number} [times]   How many times to repeat (by default, 1).
         */
        stringOf(str: string, times: number = 1): string {
            return (times === 0) ? "" : new Array(1 + (times || 1)).join(str);
        }

        /**
         * Turns a Number into a String with a prefix added to pad it to a certain
         * number of digits.
         * 
         * @param {Mixed} number   The original Number being padded.
         * @param {Number} size   How many digits the output must contain.
         * @param {Mixed} [prefix]   A prefix to repeat for padding (by default, "0").
         * @returns {String}
         * @example 
         * makeDigit(7, 3); // '007'
         * makeDigit(7, 3, 1); // '117'
         */
        makeDigit(num: number | string, size: number, prefix?: any): string {
            return RipLuckyDiner.prototype.stringOf(
                prefix ? prefix.toString() : "0",
                Math.max(0, size - String(num).length)
            ) + num;
        }

        /**
         * Checks all members of an Array to see if a specified key exists within one of them.
         * 
         * @param array   The Array being checked.
         * @param key   The key being searched for.
         * @returns Whether the key exists within the Array members.
         */
        checkArrayMembersIndex(array: any[], key: string): boolean {
            for (let i: number = 0; i < array.length; i += 1) {
                if (array[i][key]) {
                    return true;
                }
            }

            return false;
        }
    }
}
