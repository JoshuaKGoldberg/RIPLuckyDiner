// @echo '/// <reference path="GameStartr-0.2.0.ts" />'
// @echo '/// <reference path="MenuGraphr-0.2.0.ts" />'
// @echo '/// <reference path="StateHoldr-0.2.0.ts" />'
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// @ifdef INCLUDE_DEFINITIONS
/// <reference path="References/GameStartr-0.2.0.ts" />
/// <reference path="References/MenuGraphr-0.2.0.ts" />
/// <reference path="References/StateHoldr-0.2.0.ts" />
/// <reference path="RipLuckyDiner.d.ts" />
// @endif
// @include ../Source/RipLuckyDiner.d.ts
var RipLuckyDiner;
(function (RipLuckyDiner_1) {
    "use strict";
    /**
     * What direction(s) the screen may scroll from player movement.
     */
    (function (Scrollability) {
        /**
         * The screen may not scroll in either direction.
         */
        Scrollability[Scrollability["None"] = 0] = "None";
        /**
         * The screen may scroll vertically.
         */
        Scrollability[Scrollability["Vertical"] = 1] = "Vertical";
        /**
         * The screen may scroll horizontally.
         */
        Scrollability[Scrollability["Horizontal"] = 2] = "Horizontal";
        /**
         * The screen may scroll vertically and horizontally.
         */
        Scrollability[Scrollability["Both"] = 3] = "Both";
    })(RipLuckyDiner_1.Scrollability || (RipLuckyDiner_1.Scrollability = {}));
    var Scrollability = RipLuckyDiner_1.Scrollability;
    ;
    /**
     * Cardinal directions a Thing may face in-game.
     */
    (function (Direction) {
        Direction[Direction["Top"] = 0] = "Top";
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["Bottom"] = 2] = "Bottom";
        Direction[Direction["Left"] = 3] = "Left";
    })(RipLuckyDiner_1.Direction || (RipLuckyDiner_1.Direction = {}));
    var Direction = RipLuckyDiner_1.Direction;
    ;
    /**
     * Direction names, mapped to their opposites.
     */
    RipLuckyDiner_1.DirectionOpposites = {
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
    RipLuckyDiner_1.DirectionAliases = {
        "top": Direction.Top,
        "right": Direction.Right,
        "bottom": Direction.Bottom,
        "left": Direction.Left
    };
    /**
     * String aliases of directions, keyed by the direction.
     */
    RipLuckyDiner_1.DirectionsToAliases = ["top", "right", "bottom", "left"];
    /**
     * Classes to add to Things facing particular directions.
     */
    RipLuckyDiner_1.DirectionClasses = ["up", "right", "down", "left"];
    /**
     * Direction aliases for AreaSpawner activations.
     */
    RipLuckyDiner_1.DirectionSpawns = ["yDec", "xInc", "yInc", "xInc"];
    /**
     * A tribute to the former Lucky Diner in Belltown, Seattle.
     */
    var RipLuckyDiner = (function (_super) {
        __extends(RipLuckyDiner, _super);
        /**
         * Initializes a new instance of the RipLuckyDiner class using the static
         * settings stored in `RipLuckyDiner.settings`.
         *
         * @param settings   Extra settings such as screen size.
         */
        function RipLuckyDiner(settings) {
            this.settings = RipLuckyDiner.settings;
            this.ticksElapsed = 0;
            _super.call(this, this.proliferate({
                "constantsSource": RipLuckyDiner,
                "constants": [
                    "unitsize",
                    "scale"
                ],
                "extraResets": [
                    "resetStateHolder",
                    "resetMenuGrapher"
                ]
            }, settings));
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
        RipLuckyDiner.prototype.resetObjectMaker = function (Diner, settings) {
            Diner.ObjectMaker = new ObjectMakr.ObjectMakr(Diner.proliferate({
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
            }, Diner.settings.objects));
        };
        /**
         * Sets this.MathDecider, adding its existing NumberMaker to the constants.
         *
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        RipLuckyDiner.prototype.resetMathDecider = function (Diner, settings) {
            Diner.MathDecider = new MathDecidr.MathDecidr(Diner.proliferate({
                "constants": {
                    "NumberMaker": Diner.NumberMaker
                }
            }, Diner.settings.math));
        };
        /**
         * Sets this.StateHolder.
         *
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        RipLuckyDiner.prototype.resetStateHolder = function (Diner, settings) {
            Diner.StateHolder = new StateHoldr.StateHoldr(Diner.proliferate({
                "ItemsHolder": Diner.ItemsHolder
            }, Diner.settings.states));
        };
        /**
         * Sets this.MenuGrapher.
         *
         * @param Diner
         * @param customs   Any optional custom settings.
         */
        RipLuckyDiner.prototype.resetMenuGrapher = function (Diner, settings) {
            Diner.MenuGrapher = new MenuGraphr.MenuGraphr(Diner.proliferate({
                "GameStarter": Diner
            }, Diner.settings.menus));
        };
        /**
         * Sets this.container.
         *
         * The container is given the "Press Start" font, and the PixelRender is told
         * which groups to draw in order.
         *
         * @param FSM
         * @param settings   Extra settings such as screen size.
         */
        RipLuckyDiner.prototype.resetContainer = function (Diner, settings) {
            _super.prototype.resetContainer.call(this, Diner, settings);
            Diner.container.style.fontFamily = "Press Start";
            Diner.container.className += " RipLuckyDiner";
            Diner.PixelDrawer.setThingArrays([
                Diner.GroupHolder.getGroup("Terrain"),
                Diner.GroupHolder.getGroup("Solid"),
                Diner.GroupHolder.getGroup("Scenery"),
                Diner.GroupHolder.getGroup("Character"),
                Diner.GroupHolder.getGroup("Text")
            ]);
        };
        /* Global manipulations
        */
        /**
         * Completely restarts the game. The StartOptions menu is shown.
         */
        RipLuckyDiner.prototype.gameStart = function () {
            this.setMap("Lucky Diner");
        };
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
        RipLuckyDiner.prototype.thingProcess = function (thing, title, settings, defaults) {
            _super.prototype.thingProcess.call(this, thing, title, settings, defaults);
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
        };
        /**
         * Processes additional Thing attributes. For each attribute the Area's
         * class says it may have, if it has it, the attribute value proliferated
         * onto the Area.
         *
         * @param area The Area being processed.
         */
        RipLuckyDiner.prototype.areaProcess = function (area) {
            var attributes = area.attributes;
            for (var attribute in attributes) {
                if (area[attribute]) {
                    RipLuckyDiner.prototype.proliferate(area, attributes[attribute]);
                }
            }
        };
        /**
         * Starts the game (currently a no-op).
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.onGamePlay = function (Diner) {
            console.log("Playing!");
        };
        /**
         * Pauses the game (currently a no-op).
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.onGamePause = function (Diner) {
            console.log("Paused.");
        };
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
         * @param useSavedInfo   Whether an Area's saved info in StateHolder should be
         *                       applied to the Thing's position (by default, false).
         */
        RipLuckyDiner.prototype.addThing = function (thingRaw, left, top, useSavedInfo) {
            if (left === void 0) { left = 0; }
            if (top === void 0) { top = 0; }
            var thing = _super.prototype.addThing.call(this, thingRaw, left, top);
            if (useSavedInfo) {
                thing.Diner.applyThingSavedPosition(thing);
            }
            if (thing.id) {
                thing.Diner.StateHolder.applyChanges(thing.id, thing);
                thing.Diner.MapScreener.thingsById[thing.id] = thing;
            }
            if (typeof thing.direction !== "undefined") {
                thing.Diner.animateCharacterSetDirection(thing, thing.direction);
            }
            return thing;
        };
        /**
         * Applies a thing's stored xloc and yloc to its position.
         *
         * @param thing   A Thing being placed in the game.
         */
        RipLuckyDiner.prototype.applyThingSavedPosition = function (thing) {
            var savedInfo = thing.Diner.StateHolder.getChanges(thing.id);
            if (!savedInfo) {
                return;
            }
            if (savedInfo.xloc) {
                thing.Diner.setLeft(thing, thing.Diner.MapScreener.left + savedInfo.xloc * thing.Diner.unitsize);
            }
            if (savedInfo.yloc) {
                thing.Diner.setTop(thing, thing.Diner.MapScreener.top + savedInfo.yloc * thing.Diner.unitsize);
            }
        };
        /**
         * Adds a Thing via addPreThing based on the specifications in a PreThing.
         * This is done relative to MapScreener.left and MapScreener.top.
         *
         * @param prething   A PreThing whose Thing is to be added to the game.
         */
        RipLuckyDiner.prototype.addPreThing = function (prething) {
            var thing = prething.thing, position = prething.position || thing.position;
            if (thing.spawned) {
                return;
            }
            thing.spawned = true;
            thing.areaName = thing.areaName || thing.Diner.AreaSpawner.getAreaName();
            thing.mapName = thing.mapName || thing.Diner.AreaSpawner.getMapName();
            thing.Diner.addThing(thing, prething.left * thing.Diner.unitsize - thing.Diner.MapScreener.left, prething.top * thing.Diner.unitsize - thing.Diner.MapScreener.top, true);
            // Either the prething or thing, in that order, may request to be in the
            // front or back of the container
            if (position) {
                thing.Diner.TimeHandler.addEvent(function () {
                    switch (position) {
                        case "beginning":
                            thing.Diner.arrayToBeginning(thing, thing.Diner.GroupHolder.getGroup(thing.groupType));
                            break;
                        case "end":
                            thing.Diner.arrayToEnd(thing, thing.Diner.GroupHolder.getGroup(thing.groupType));
                            break;
                        default:
                            throw new Error("Unknown position: " + position + ".");
                    }
                });
            }
            thing.Diner.ModAttacher.fireEvent("onAddPreThing", prething);
        };
        /**
         * Adds a new Player Thing to the game and sets it as EightBitter.player. Any
         * required additional settings (namely keys, power/size, and swimming) are
         * applied here.
         *
         * @param left   A left edge to place the Thing at (by default, 0).
         * @param bottom   A top to place the Thing upon (by default, 0).
         * @param useSavedInfo   Whether an Area's saved info in StateHolder should be
         *                       applied to the Thing's position (by default, false).
         * @returns A newly created Player in the game.
         */
        RipLuckyDiner.prototype.addPlayer = function (left, top, useSavedInfo) {
            if (left === void 0) { left = 0; }
            if (top === void 0) { top = 0; }
            var player = this.player = this.ObjectMaker.make("Player");
            player.keys = player.getKeys();
            this.InputWriter.setEventInformation(player);
            this.addThing(player, left || 0, top || 0, useSavedInfo);
            this.ModAttacher.fireEvent("onAddPlayer", player);
            return player;
        };
        /**
         * Retrieves the Thing in MapScreener.thingById of the given id.
         *
         * @param id   An id of a Thing to retrieve.
         * @returns The Thing under the given id, if it exists.
         */
        RipLuckyDiner.prototype.getThingById = function (id) {
            return this.MapScreener.thingsById[id];
        };
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
        RipLuckyDiner.prototype.canInputsTrigger = function (Diner, player, code, event) {
            if (event) {
                event.preventDefault();
            }
            return true;
        };
        /**
         * Checks whether direction keys such as up may trigger, which is true if the
         * game isn't paused, the isn't an active menu, and the MapScreener doesn't
         * specify blockInputs = true.
         *
         * @param Diner
         * @returns Whether direction keys may trigger.
         */
        RipLuckyDiner.prototype.canDirectionsTrigger = function (Diner) {
            if (Diner.GamesRunner.getPaused()) {
                return false;
            }
            if (Diner.MenuGrapher.getActiveMenu()) {
                return true;
            }
            return !Diner.MapScreener.blockInputs;
        };
        /**
         *
         * Reacts to a Character simulating an up key press. If possible, this causes
         * walking in the up direction. The onKeyDownUp mod trigger is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownUp = function (thing, event) {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }
            if (thing.player) {
                thing.keys[Direction.Top] = true;
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.keyDownDirectionReal, RipLuckyDiner.inputTimeTolerance, thing, 0);
            thing.Diner.ModAttacher.fireEvent("onKeyDownUpReal");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         *
         * Reacts to a Character simulating a right key press. If possible, this causes
         * walking in the right direction. The onKeyDownRight mod trigger is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownRight = function (thing, event) {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }
            if (thing.player) {
                thing.keys[Direction.Right] = true;
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.keyDownDirectionReal, RipLuckyDiner.inputTimeTolerance, thing, 1);
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         *
         * Reacts to a Character simulating a down key press. If possible, this causes
         * walking in the down direction. The onKeyDownDown mod trigger is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownDown = function (thing, event) {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }
            if (thing.player) {
                thing.keys[Direction.Bottom] = true;
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.keyDownDirectionReal, RipLuckyDiner.inputTimeTolerance, thing, 2);
            thing.Diner.ModAttacher.fireEvent("onKeyDownDown");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to a Character simulating a left key press. If possible, this causes
         * walking in the left direction. The onKeyDownLeft mod trigger is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownLeft = function (thing, event) {
            if (!thing.Diner.canDirectionsTrigger(thing.Diner)) {
                return;
            }
            if (thing.player) {
                thing.keys[Direction.Left] = true;
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.keyDownDirectionReal, RipLuckyDiner.inputTimeTolerance, thing, 3);
            thing.Diner.ModAttacher.fireEvent("onKeyDownLeft");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Driver for a direction key being pressed. The MenuGraphr's active menu reacts
         * to the movement if it exists, or the triggering Character attempts to walk
         * if not. The onKeyDownDirectionReal mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownDirectionReal = function (thing, direction) {
            if (!thing.player || !thing.keys[direction]) {
                return;
            }
            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.registerDirection(direction);
            }
            else {
                if (thing.direction !== direction) {
                    thing.turning = direction;
                }
                if (thing.canKeyWalking && !thing.shouldWalk) {
                    thing.Diner.setPlayerDirection(thing, direction);
                    thing.canKeyWalking = false;
                }
                else {
                    thing.nextDirection = direction;
                }
            }
            thing.Diner.ModAttacher.fireEvent("onKeyDownDirectionReal", direction);
        };
        /**
         * Reacts to the A key being pressed. The MenuGraphr's active menu reacts to
         * the selection if it exists. The onKeyDownA mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownA = function (thing, event) {
            if (thing.Diner.GamesRunner.getPaused()) {
                return;
            }
            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.registerA();
            }
            else if (thing.bordering[thing.direction]) {
                if (thing.bordering[thing.direction].activate) {
                    thing.bordering[thing.direction].activate(thing, thing.bordering[thing.direction]);
                }
                if (thing.keys) {
                    thing.keys.a = true;
                }
            }
            thing.Diner.ModAttacher.fireEvent("onKeyDownA");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the B key being pressed. The MenuGraphr's active menu reacts to
         * the deselection if it exists. The onKeyDownB mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownB = function (thing, event) {
            if (thing.Diner.GamesRunner.getPaused()) {
                return;
            }
            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.MenuGrapher.registerB();
            }
            else if (thing.keys) {
                thing.keys.b = true;
            }
            thing.Diner.ModAttacher.fireEvent("onKeyDownB");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the pause key being pressed. The game is paused if it isn't
         * already. The onKeyDownPause mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownPause = function (thing, event) {
            if (!thing.Diner.GamesRunner.getPaused()) {
                thing.Diner.GamesRunner.pause();
            }
            thing.Diner.ModAttacher.fireEvent("onKeyDownPause");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the mute key being pressed. The game has mute toggled, and the
         * onKeyDownMute mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyDownMute = function (thing, event) {
            thing.Diner.AudioPlayer.toggleMuted();
            thing.Diner.ModAttacher.fireEvent("onKeyDownMute");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the left key being lifted. The onKeyUpLeft mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpLeft = function (thing, event) {
            thing.Diner.ModAttacher.fireEvent("onKeyUpLeft");
            if (thing.player) {
                thing.keys[3] = false;
                if (thing.nextDirection === 3) {
                    delete thing.nextDirection;
                }
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         *
         * Reacts to the right key being lifted. The onKeyUpRight mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpRight = function (thing, event) {
            thing.Diner.ModAttacher.fireEvent("onKeyUpRight");
            if (thing.player) {
                thing.keys[1] = false;
                if (thing.nextDirection === 1) {
                    delete thing.nextDirection;
                }
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the up key being lifted. The onKeyUpUp mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpUp = function (thing, event) {
            thing.Diner.ModAttacher.fireEvent("onKeyUpUp");
            if (thing.player) {
                thing.keys[0] = false;
                if (thing.nextDirection === 0) {
                    delete thing.nextDirection;
                }
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         *
         * Reacts to the down key being lifted. The onKeyUpDown mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpDown = function (thing, event) {
            thing.Diner.ModAttacher.fireEvent("onKeyUpDown");
            if (thing.player) {
                thing.keys[2] = false;
                if (thing.nextDirection === 2) {
                    delete thing.nextDirection;
                }
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the A key being lifted. The onKeyUpA mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpA = function (thing, event) {
            thing.Diner.ModAttacher.fireEvent("onKeyUpA");
            if (thing.player) {
                thing.keys.a = false;
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the B key being lifted. The onKeyUpB mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpB = function (thing, event) {
            thing.Diner.ModAttacher.fireEvent("onKeyUpB");
            if (thing.player) {
                thing.keys.b = false;
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /**
         * Reacts to the pause key being lifted. The onKeyUpLeft mod event is fired.
         *
         * @param thing   The triggering Character.
         * @param event   The original user-caused Event.
         */
        RipLuckyDiner.prototype.keyUpPause = function (thing, event) {
            if (thing.Diner.GamesRunner.getPaused()) {
                thing.Diner.GamesRunner.play();
            }
            thing.Diner.ModAttacher.fireEvent("onKeyUpPause");
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
        /* Upkeep maintenance
        */
        /**
         * Generic maintenance Function for a group of Things. For each Thing, if
         * it isn't alive, it's removed from the group.
         *
         * @param Diner
         * @param things   A group of Things to maintain.
         */
        RipLuckyDiner.prototype.maintainGeneric = function (Diner, things) {
            for (var i = 0; i < things.length; i += 1) {
                if (!things[i].alive) {
                    Diner.arrayDeleteThing(things[i], things, i);
                    i -= 1;
                }
            }
        };
        /**
         * Maintenance for all active Characters. Walking, grass maintenance, alive
         * checking, and quadrant maintenance are performed.
         *
         * @param Diner
         * @param characters   The Characters group of Things.
         */
        RipLuckyDiner.prototype.maintainCharacters = function (Diner, characters) {
            var character;
            for (var i = 0; i < characters.length; i += 1) {
                character = characters[i];
                Diner.shiftCharacter(character);
                if (character.shouldWalk && !Diner.MenuGrapher.getActiveMenu()) {
                    character.onWalkingStart(character, character.direction);
                    character.shouldWalk = false;
                }
                if (character.grass) {
                    Diner.maintainCharacterGrass(Diner, character, character.grass);
                }
                if (!character.alive && !character.outerOk) {
                    Diner.arrayDeleteThing(character, characters, i);
                    i -= 1;
                    continue;
                }
                for (var j = 0; j < 4; j += 1) {
                    character.bordering[j] = undefined;
                }
                Diner.QuadsKeeper.determineThingQuadrants(character);
                Diner.ThingHitter.checkHitsForThing(character);
            }
        };
        /**
         * Maintenance for a Character visually in grass. The shadow is updated to
         * move or be deleted as needed.
         *
         * @param Diner
         * @param thing   A Character in grass.
         * @param other   Grass that thing is in.
         */
        RipLuckyDiner.prototype.maintainCharacterGrass = function (Diner, thing, other) {
            // If thing is no longer in grass, delete the shadow and stop
            if (!thing.Diner.isThingWithinGrass(thing, other)) {
                thing.Diner.killNormal(thing.shadow);
                thing.canvas.height = thing.height * thing.Diner.unitsize;
                thing.Diner.PixelDrawer.setThingSprite(thing);
                delete thing.shadow;
                delete thing.grass;
                return;
            }
            // Keep the shadow in sync with thing in position and visuals.
            thing.Diner.setLeft(thing.shadow, thing.left);
            thing.Diner.setTop(thing.shadow, thing.top);
            if (thing.shadow.className !== thing.className) {
                thing.Diner.setClass(thing.shadow, thing.className);
            }
        };
        /**
         * Maintenance for a Player. The screen is scrolled according to the global
         * MapScreener.scrollability.
         *
         * @param Diner
         * @param player   An in-game Player Thing.
         */
        RipLuckyDiner.prototype.maintainPlayer = function (Diner, player) {
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
                    Diner.scrollWindow(Diner.getHorizontalScrollAmount(Diner), Diner.getVerticalScrollAmount(Diner));
                    return;
                default:
                    return;
            }
        };
        /**
         * Determines how much to scroll horizontally during upkeep based
         * on player xvel and horizontal bordering.
         *
         * @param Diner
         * @returns How far to scroll horizontally.
         */
        RipLuckyDiner.prototype.getHorizontalScrollAmount = function (Diner) {
            if (!Diner.player.xvel) {
                return 0;
            }
            if (Diner.player.xvel > 0) {
                return Diner.player.bordering[1] ? 0 : Diner.player.xvel;
            }
            else {
                return Diner.player.bordering[3] ? 0 : Diner.player.xvel;
            }
        };
        /**
         * Determines how much to scroll vertically during upkeep based
         * on player yvel and vertical bordering.
         *
         * @param Diner
         * @returns How far to scroll vertically.
         */
        RipLuckyDiner.prototype.getVerticalScrollAmount = function (Diner) {
            if (!Diner.player.yvel) {
                return 0;
            }
            if (Diner.player.yvel > 0) {
                return Diner.player.bordering[2] ? 0 : Diner.player.yvel;
            }
            else {
                return Diner.player.bordering[0] ? 0 : Diner.player.yvel;
            }
        };
        /**
         * Displays message when a Player tries to use an item that cannot be used.
         *
         * @param player   A Player who cannot use an item.
         */
        RipLuckyDiner.prototype.cannotDoThat = function (player) {
            player.Diner.displayMessage(player, "OAK: %%%%%%%PLAYER%%%%%%%! \n This isn't the \n time to use that!");
        };
        /* General animations
        */
        /**
         * Snaps a moving Thing to a predictable grid position.
         *
         * @param thing   A Thing to snap the position of.
         */
        RipLuckyDiner.prototype.animateSnapToGrid = function (thing) {
            var grid = thing.Diner.unitsize * 8, x = (thing.Diner.MapScreener.left + thing.left) / grid, y = (thing.Diner.MapScreener.top + thing.top) / grid;
            thing.Diner.setLeft(thing, Math.round(x) * grid - thing.Diner.MapScreener.left);
            thing.Diner.setTop(thing, Math.round(y) * grid - thing.Diner.MapScreener.top);
        };
        /**
         * Freezes a Character to start a dialog.
         *
         * @param thing   A Character to freeze.
         */
        RipLuckyDiner.prototype.animatePlayerDialogFreeze = function (thing) {
            thing.Diner.animateCharacterPreventWalking(thing);
            thing.Diner.TimeHandler.cancelClassCycle(thing, "walking");
            if (thing.walkingFlipping) {
                thing.Diner.TimeHandler.cancelEvent(thing.walkingFlipping);
                thing.walkingFlipping = undefined;
            }
        };
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
        RipLuckyDiner.prototype.animateFadeAttribute = function (thing, attribute, change, goal, speed, onCompletion) {
            thing[attribute] += change;
            if (change > 0) {
                if (thing[attribute] >= goal) {
                    thing[attribute] = goal;
                    if (typeof onCompletion === "function") {
                        onCompletion(thing);
                    }
                    return;
                }
            }
            else {
                if (thing[attribute] <= goal) {
                    thing[attribute] = goal;
                    if (typeof onCompletion === "function") {
                        onCompletion(thing);
                    }
                    return;
                }
            }
            return thing.Diner.TimeHandler.addEvent(thing.Diner.animateFadeAttribute, speed, thing, attribute, change, goal, speed, onCompletion);
        };
        /**
         * Slides a Thing across the screen horizontally over time.
         *
         * @param thing   A Thing to slide across the screen.
         * @param change   How far to move each tick.
         * @param goal   A midX location to stop sliding at.
         * @param speed   How many ticks between movements.
         * @param onCompletion   A callback for when the Thing reaches the goal.
         * @returns The in-progress TimeEvent.
         */
        RipLuckyDiner.prototype.animateSlideHorizontal = function (thing, change, goal, speed, onCompletion) {
            thing.Diner.shiftHoriz(thing, change);
            if (change > 0) {
                if (thing.Diner.getMidX(thing) >= goal) {
                    thing.Diner.setMidX(thing, goal);
                    if (onCompletion) {
                        onCompletion(thing);
                    }
                    return;
                }
            }
            else {
                if (thing.Diner.getMidX(thing) <= goal) {
                    thing.Diner.setMidX(thing, goal);
                    if (onCompletion) {
                        onCompletion(thing);
                    }
                    return;
                }
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.animateSlideHorizontal, speed, thing, change, goal, speed, onCompletion);
        };
        /**
         * Slides a Thing across the screen vertically over time.
         *
         * @param thing   A Thing to slide across the screen.
         * @param change   How far to move each tick.
         * @param goal   A midY location to stop sliding at.
         * @param speed   How many ticks between movements.
         * @param onCompletion   A callback for when the Thing reaches the goal.
         * @returns The in-progress TimeEvent.
         */
        RipLuckyDiner.prototype.animateSlideVertical = function (thing, change, goal, speed, onCompletion) {
            thing.Diner.shiftVert(thing, change);
            if (change > 0) {
                if (thing.Diner.getMidY(thing) >= goal) {
                    thing.Diner.setMidY(thing, goal);
                    if (onCompletion) {
                        onCompletion(thing);
                    }
                    return;
                }
            }
            else {
                if (thing.Diner.getMidY(thing) <= goal) {
                    thing.Diner.setMidY(thing, goal);
                    if (onCompletion) {
                        onCompletion(thing);
                    }
                    return;
                }
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.animateSlideVertical, speed, thing, change, goal, speed, onCompletion);
        };
        /**
         * Creates and positions a set of four Things around a point.
         *
         * @param Diner
         * @param x   The horizontal value of the point.
         * @param y   The vertical value of the point.
         * @param title   A title for each Thing to create.
         * @param settings   Additional settings for each Thing.
         * @param groupType   Which group to move the Things into, if any.
         * @returns The four created Things.
         */
        RipLuckyDiner.prototype.animateThingCorners = function (Diner, x, y, title, settings, groupType) {
            var things = [], i;
            for (i = 0; i < 4; i += 1) {
                things.push(Diner.addThing([title, settings]));
            }
            if (groupType) {
                for (i = 0; i < things.length; i += 1) {
                    Diner.GroupHolder.switchMemberGroup(things[i], things[i].groupType, groupType);
                }
            }
            Diner.setLeft(things[0], x);
            Diner.setLeft(things[1], x);
            Diner.setRight(things[2], x);
            Diner.setRight(things[3], x);
            Diner.setBottom(things[0], y);
            Diner.setBottom(things[3], y);
            Diner.setTop(things[1], y);
            Diner.setTop(things[2], y);
            Diner.flipHoriz(things[0]);
            Diner.flipHoriz(things[1]);
            Diner.flipVert(things[1]);
            Diner.flipVert(things[2]);
            return things;
        };
        /**
         * Moves a set of four Things away from a point.
         *
         * @param things   The four Things to move.
         * @param amount   How far to move each Thing horizontally and vertically.
         */
        RipLuckyDiner.prototype.animateExpandCorners = function (things, amount) {
            var Diner = things[0].Diner;
            Diner.shiftHoriz(things[0], amount);
            Diner.shiftHoriz(things[1], amount);
            Diner.shiftHoriz(things[2], -amount);
            Diner.shiftHoriz(things[3], -amount);
            Diner.shiftVert(things[0], -amount);
            Diner.shiftVert(things[1], amount);
            Diner.shiftVert(things[2], amount);
            Diner.shiftVert(things[3], -amount);
        };
        /**
         * Creates a small smoke animation from a point.
         *
         * @param Diner
         * @param x   The horizontal location of the point.
         * @param y   The vertical location of the point.
         * @param callback   A callback for when the animation is done.
         */
        RipLuckyDiner.prototype.animateSmokeSmall = function (Diner, x, y, callback) {
            var things = Diner.animateThingCorners(Diner, x, y, "SmokeSmall", undefined, "Text");
            Diner.TimeHandler.addEvent(things.forEach.bind(things), 7, Diner.killNormal);
            Diner.TimeHandler.addEvent(Diner.animateSmokeMedium, 7, Diner, x, y, callback);
        };
        /**
         * Creates a medium-sized smoke animation from a point.
         *
         * @param Diner
         * @param x   The horizontal location of the point.
         * @param y   The vertical location of the point.
         * @param callback   A callback for when the animation is done.
         */
        RipLuckyDiner.prototype.animateSmokeMedium = function (Diner, x, y, callback) {
            var things = Diner.animateThingCorners(Diner, x, y, "SmokeMedium", undefined, "Text");
            Diner.TimeHandler.addEvent(Diner.animateExpandCorners, 7, things, Diner.unitsize);
            Diner.TimeHandler.addEvent(things.forEach.bind(things), 14, Diner.killNormal);
            Diner.TimeHandler.addEvent(Diner.animateSmokeLarge, 14, Diner, x, y, callback);
        };
        /**
         * Creates a large smoke animation from a point.
         *
         * @param Diner
         * @param x   The horizontal location of the point.
         * @param y   The vertical location of the point.
         * @param callback   A callback for when the animation is done.
         */
        RipLuckyDiner.prototype.animateSmokeLarge = function (Diner, x, y, callback) {
            var things = Diner.animateThingCorners(Diner, x, y, "SmokeLarge", undefined, "Text");
            Diner.animateExpandCorners(things, Diner.unitsize * 2.5);
            Diner.TimeHandler.addEvent(Diner.animateExpandCorners, 7, things, Diner.unitsize * 2);
            Diner.TimeHandler.addEvent(things.forEach.bind(things), 21, Diner.killNormal);
            if (callback) {
                Diner.TimeHandler.addEvent(callback, 21);
            }
        };
        /**
         * Animates an exclamation mark above a Thing.
         *
         * @param thing   A Thing to show the exclamation over.
         * @param timeout   How long to keep the exclamation (by default, 140).
         * @param callback   A callback for when the exclamation is removed.
         * @returns The exclamation Thing.
         */
        RipLuckyDiner.prototype.animateExclamation = function (thing, timeout, callback) {
            var exclamation = thing.Diner.addThing("Exclamation");
            timeout = timeout || 140;
            thing.Diner.setMidXObj(exclamation, thing);
            thing.Diner.setBottom(exclamation, thing.top);
            thing.Diner.TimeHandler.addEvent(thing.Diner.killNormal, timeout, exclamation);
            if (callback) {
                thing.Diner.TimeHandler.addEvent(callback, timeout);
            }
            return exclamation;
        };
        /**
         * Fades the screen out to a solid color.
         *
         * @param Diner
         * @param settings   Settings for the animation.
         * @returns The solid color Thing.
         */
        RipLuckyDiner.prototype.animateFadeToColor = function (Diner, settings) {
            if (settings === void 0) { settings = {}; }
            var color = settings.color || "White", callback = settings.callback, change = settings.change || .33, speed = settings.speed || 4, blank = Diner.ObjectMaker.make(color + "Square", {
                "width": Diner.MapScreener.width,
                "height": Diner.MapScreener.height,
                "opacity": 0
            });
            Diner.addThing(blank);
            Diner.animateFadeAttribute(blank, "opacity", change, 1, speed, function () {
                if (!settings.keepColor) {
                    Diner.killNormal(blank);
                }
                if (callback) {
                    callback.call(Diner, Diner);
                }
            });
            return blank;
        };
        /**
         * Places a solid color over the screen and fades it out.
         *
         * @param Diner
         * @param settings   Settings for the animation.
         * @returns The solid color Thing.
         */
        RipLuckyDiner.prototype.animateFadeFromColor = function (Diner, settings) {
            if (settings === void 0) { settings = {}; }
            var color = settings.color || "White", callback = settings.callback, change = settings.change || .33, speed = settings.speed || 4, blank = Diner.ObjectMaker.make(color + "Square", {
                "width": Diner.MapScreener.width,
                "height": Diner.MapScreener.height,
                "opacity": 1
            }), args = arguments;
            Diner.addThing(blank);
            Diner.animateFadeAttribute(blank, "opacity", -change, 0, speed, function () {
                Diner.killNormal(blank);
                if (callback) {
                    callback.apply(this, args);
                }
            });
            return blank;
        };
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
        RipLuckyDiner.prototype.animateFlicker = function (thing, cleartime, interval, callback) {
            if (cleartime === void 0) { cleartime = 49; }
            if (interval === void 0) { interval = 2; }
            thing.flickering = true;
            thing.Diner.TimeHandler.addEventInterval(function () {
                thing.hidden = !thing.hidden;
                if (!thing.hidden) {
                    thing.Diner.PixelDrawer.setThingSprite(thing);
                }
            }, interval | 0, cleartime | 0);
            return thing.Diner.TimeHandler.addEvent(function () {
                thing.flickering = thing.hidden = false;
                thing.Diner.PixelDrawer.setThingSprite(thing);
                if (callback) {
                    callback(thing);
                }
            }, ((cleartime * interval) | 0) + 1);
        };
        /**
         * Shakes all Things on the screen back and forth for a little bit.
         *
         *
         * @param Diner
         * @param dx   How far to shift horizontally (by default, 0).
         * @param dy   How far to shift horizontally (by default, 0).
         * @param cleartime   How long until the screen is done shaking.
         * @param interval   How many game upkeeps between movements.
         * @returns The shaking time event.
         */
        RipLuckyDiner.prototype.animateScreenShake = function (Diner, dx, dy, cleartime, interval, callback) {
            if (dx === void 0) { dx = 0; }
            if (dy === void 0) { dy = 0; }
            if (cleartime === void 0) { cleartime = 8; }
            if (interval === void 0) { interval = 8; }
            Diner.TimeHandler.addEventInterval(function () {
                Diner.GroupHolder.callOnAll(Diner, Diner.shiftHoriz, dx);
                Diner.GroupHolder.callOnAll(Diner, Diner.shiftVert, dy);
            }, 1, cleartime * interval);
            return Diner.TimeHandler.addEvent(function () {
                dx *= -1;
                dy *= -1;
                Diner.TimeHandler.addEventInterval(function () {
                    dx *= -1;
                    dy *= -1;
                }, interval, cleartime);
                if (callback) {
                    Diner.TimeHandler.addEvent(callback, interval * cleartime, Diner);
                }
            }, (interval / 2) | 0);
        };
        /* Character movement animations
        */
        /**
         * Sets a Character's xvel and yvel based on its speed and direction, and marks
         * its destination endpoint.
         *
         * @param thing   A moving Character.
         * @param distance   How far the Character is moving.
         */
        RipLuckyDiner.prototype.animateCharacterSetDistanceVelocity = function (thing, distance) {
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
        };
        /**
         * Starts a Character's walking cycle regardless of the direction.
         *
         * @param thing   A Character to start walking.
         * @param direction   What direction the Character should turn to face.
         * @param onStop   A queue of commands as alternating directions and distances.
         */
        RipLuckyDiner.prototype.animateCharacterStartWalkingCycle = function (thing, direction, onStop) {
            if (onStop.length === 0) {
                return;
            }
            // If the first queued command is a 0 distance, walking might be complete
            if (onStop[0] === 0) {
                // More commands indicates walking isn't done, and to continue turning/walking
                if (onStop.length > 1) {
                    if (typeof onStop[1] === "function") {
                        onStop[1](thing);
                        return;
                    }
                    thing.Diner.animateCharacterSetDirection(thing, RipLuckyDiner_1.DirectionAliases[onStop[1]]);
                    thing.Diner.animateCharacterStartWalkingCycle(thing, RipLuckyDiner_1.DirectionAliases[onStop[1]], onStop.slice(2));
                }
                return;
            }
            if (thing.follower) {
                thing.walkingCommands.push(direction);
            }
            thing.Diner.animateCharacterStartWalking(thing, direction, onStop);
            if (!thing.bordering[direction]) {
                thing.Diner.shiftBoth(thing, -thing.xvel, -thing.yvel);
            }
        };
        /**
         * Starts a Character walking in the given direction as part of a walking cycle.
         *
         * @param thing   The Character to start walking.
         * @param direction   What direction to walk in (by default, up).
         * @param onStop   A queue of commands as alternating directions and distances.
         */
        RipLuckyDiner.prototype.animateCharacterStartWalking = function (thing, direction, onStop) {
            if (direction === void 0) { direction = Direction.Top; }
            var repeats = thing.Diner.MathDecider.compute("speedWalking", thing), distance = repeats * thing.speed;
            thing.walking = true;
            thing.Diner.animateCharacterSetDirection(thing, direction);
            thing.Diner.animateCharacterSetDistanceVelocity(thing, distance);
            if (!thing.cycles || !thing.cycles.walking) {
                thing.Diner.TimeHandler.addClassCycle(thing, ["walking", "standing"], "walking", repeats / 2);
            }
            if (!thing.walkingFlipping) {
                thing.walkingFlipping = thing.Diner.TimeHandler.addEventInterval(thing.Diner.animateSwitchFlipOnDirection, repeats, Infinity, thing);
            }
            if (thing.sight) {
                thing.sightDetector.nocollide = true;
            }
            thing.Diner.TimeHandler.addEventInterval(thing.onWalkingStop, repeats, Infinity, thing, onStop);
            if (!thing.bordering[direction]) {
                thing.Diner.shiftBoth(thing, thing.xvel, thing.yvel);
            }
        };
        /**
         * Starts a roaming Character walking in a random direction, determined
         * by the allowed directions it may use (that aren't blocked).
         *
         * @param thing   A roaming Character.
         */
        RipLuckyDiner.prototype.animateCharacterStartWalkingRandom = function (thing) {
            var totalAllowed = 0, direction, i;
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
            }
            else {
                thing.Diner.animateCharacterStartWalking(thing, direction);
            }
        };
        /**
         * Continues a Character's walking cycle after taking a step. If .turning
         * is provided, the Character turns. If a Player is provided, its keys
         * and .canKeyWalking are respected.
         *
         * @param thing   A Character mid-step.
         */
        RipLuckyDiner.prototype.animateCharacterRepeatWalking = function (thing) {
            if (typeof thing.turning !== "undefined") {
                if (!thing.player || !thing.keys[thing.turning]) {
                    thing.Diner.animateCharacterSetDirection(thing, thing.turning);
                    thing.turning = undefined;
                    return;
                }
                thing.turning = undefined;
            }
            if (thing.player) {
                thing.canKeyWalking = false;
            }
            thing.Diner.animateCharacterStartWalking(thing, thing.direction);
        };
        /**
         * Reacts to a Character finishing a step and either stops all walking or moves to
         * the next action in the onStop queue.
         *
         * @param thing   A Character finishing a walking step.
         * @param onStop   A queue of commands as alternating directions and distances.
         * @returns True, unless the next onStop is a Function to return the result of.
         */
        RipLuckyDiner.prototype.animateCharacterStopWalking = function (thing, onStop) {
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
            if (thing.sight) {
                thing.sightDetector.nocollide = false;
                thing.Diner.animatePositionSightDetector(thing);
            }
            if (!onStop) {
                return true;
            }
            switch (onStop.constructor) {
                case Number:
                    thing.Diner.animateCharacterRepeatWalking(thing);
                    break;
                case Array:
                    if (onStop[0] > 0) {
                        onStop[0] = onStop[0] - 1;
                        thing.Diner.animateCharacterStartWalkingCycle(thing, thing.direction, onStop);
                    }
                    else if (onStop.length === 0) {
                        break;
                    }
                    else {
                        if (onStop[1] instanceof Function) {
                            return onStop[1](thing);
                        }
                        thing.Diner.animateCharacterStartWalkingCycle(thing, RipLuckyDiner_1.DirectionAliases[onStop[1]], onStop.slice(2));
                    }
                    break;
                case Function:
                    return onStop(thing);
                default:
                    throw new Error("Unknown onStop: " + onStop + ".");
            }
            return true;
        };
        /**
         * Animates a Player to stop walking, which is the same logic for a normal
         * Character as well as MenuGrapher and following checks.
         *
         * @param thing   A Player to stop walking.
         * @param onStop   A queue of commands as alternating directions and distances.
         * @returns True, unless the next onStop is a Function to return the result of.
         */
        RipLuckyDiner.prototype.animatePlayerStopWalking = function (thing, onStop) {
            if (thing.following) {
                return thing.Diner.animateCharacterStopWalking(thing, onStop);
            }
            if (!thing.Diner.MenuGrapher.getActiveMenu()
                && thing.keys[thing.direction]) {
                thing.Diner.animateCharacterSetDistanceVelocity(thing, thing.distance);
                return false;
            }
            if (typeof thing.nextDirection !== "undefined") {
                if (thing.nextDirection !== thing.direction && !thing.ledge) {
                    thing.Diner.setPlayerDirection(thing, thing.nextDirection);
                }
                delete thing.nextDirection;
            }
            else {
                thing.canKeyWalking = true;
            }
            return thing.Diner.animateCharacterStopWalking(thing, onStop);
        };
        /**
         * Animates a Character to no longer be able to walk.
         *
         * @param thing   A Character that shouldn't be able to walk.
         */
        RipLuckyDiner.prototype.animateCharacterPreventWalking = function (thing) {
            thing.shouldWalk = false;
            thing.xvel = thing.yvel = 0;
            if (thing.player) {
                thing.keys = thing.getKeys();
            }
            thing.Diner.MapScreener.blockInputs = true;
        };
        /**
         * Sets a Thing facing a particular direction.
         *
         * @param thing   An in-game Thing.
         * @param direction   A direction for thing to face.
         * @todo Add more logic here for better performance.
         */
        RipLuckyDiner.prototype.animateCharacterSetDirection = function (thing, direction) {
            thing.direction = direction;
            if (direction % 2 === 1) {
                thing.Diner.unflipHoriz(thing);
            }
            thing.Diner.removeClasses(thing, RipLuckyDiner_1.DirectionClasses[Direction.Top], RipLuckyDiner_1.DirectionClasses[Direction.Right], RipLuckyDiner_1.DirectionClasses[Direction.Bottom], RipLuckyDiner_1.DirectionClasses[Direction.Left]);
            thing.Diner.addClass(thing, RipLuckyDiner_1.DirectionClasses[direction]);
            if (direction === Direction.Right) {
                thing.Diner.flipHoriz(thing);
                thing.Diner.addClass(thing, RipLuckyDiner_1.DirectionClasses[Direction.Left]);
            }
        };
        /**
         * Sets a Thing facing a random direction.
         *
         * @param thing   An in-game Thing.
         */
        RipLuckyDiner.prototype.animateCharacterSetDirectionRandom = function (thing) {
            thing.Diner.animateCharacterSetDirection(thing, thing.Diner.NumberMaker.randomIntWithin(0, 3));
        };
        /**
         * Flips or unflips a Character if its direction is vertical.
         *
         * @param thing   A Character to flip or unflip.
         */
        RipLuckyDiner.prototype.animateSwitchFlipOnDirection = function (thing) {
            if (thing.direction % 2 !== 0) {
                return;
            }
            if (thing.flipHoriz) {
                thing.Diner.unflipHoriz(thing);
            }
            else {
                thing.Diner.flipHoriz(thing);
            }
        };
        /**
         * Positions a Character's detector in front of it as its sight.
         *
         * @param thing   A Character that should be able to see.
         */
        RipLuckyDiner.prototype.animatePositionSightDetector = function (thing) {
            var detector = thing.sightDetector, direction = thing.direction, sight = Number(thing.sight);
            if (detector.direction !== direction) {
                if (thing.direction % 2 === 0) {
                    thing.Diner.setWidth(detector, thing.width);
                    thing.Diner.setHeight(detector, sight * 8);
                }
                else {
                    thing.Diner.setWidth(detector, sight * 8);
                    thing.Diner.setHeight(detector, thing.height);
                }
                detector.direction = direction;
            }
            switch (direction) {
                case 0:
                    thing.Diner.setBottom(detector, thing.top);
                    thing.Diner.setMidXObj(detector, thing);
                    break;
                case 1:
                    thing.Diner.setLeft(detector, thing.right);
                    thing.Diner.setMidYObj(detector, thing);
                    break;
                case 2:
                    thing.Diner.setTop(detector, thing.bottom);
                    thing.Diner.setMidXObj(detector, thing);
                    break;
                case 3:
                    thing.Diner.setRight(detector, thing.left);
                    thing.Diner.setMidYObj(detector, thing);
                    break;
                default:
                    throw new Error("Unknown direction: " + direction + ".");
            }
        };
        /**
         * Animates the various logic pieces for finishing a dialog, such as pushes,
         * gifts, options, and battle starting or disabling.
         *
         * @param thing   A Player that's finished talking to other.
         * @param other   A Character that thing has finished talking to.
         */
        RipLuckyDiner.prototype.animateCharacterDialogFinish = function (thing, other) {
            var onStop;
            thing.Diner.ModAttacher.fireEvent("onDialogFinish", other);
            if (other.pushSteps) {
                onStop = other.pushSteps;
            }
            thing.talking = false;
            other.talking = false;
            thing.canKeyWalking = true;
            if (other.directionPreferred) {
                thing.Diner.animateCharacterSetDirection(other, other.directionPreferred);
            }
            if (other.transport) {
                other.active = true;
                thing.Diner.activateTransporter(thing, other);
                return;
            }
            if (typeof other.pushDirection !== "undefined") {
                thing.Diner.animateCharacterStartWalkingCycle(thing, other.pushDirection, onStop);
            }
            if (other.dialogNext) {
                other.dialog = other.dialogNext;
                other.dialogNext = undefined;
                thing.Diner.StateHolder.addChange(other.id, "dialog", other.dialog);
                thing.Diner.StateHolder.addChange(other.id, "dialogNext", undefined);
            }
            if (other.dialogOptions) {
                thing.Diner.animateCharacterDialogOptions(thing, other, other.dialogOptions);
            }
        };
        /**
         * Displays a yes/no options menu for after a dialog has completed.
         *
         *
         * @param thing   A Player that's finished talking to other.
         * @param other   A Character that thing has finished talking to.
         * @param dialog   The dialog settings that just finished.
         */
        RipLuckyDiner.prototype.animateCharacterDialogOptions = function (thing, other, dialog) {
            var options = dialog.options, generateCallback = function (dialog) {
                if (!dialog) {
                    return undefined;
                }
                var callback, words;
                if (dialog.constructor === Object && dialog.options) {
                    words = dialog.words;
                    callback = thing.Diner.animateCharacterDialogOptions.bind(thing.Diner, thing, other, dialog);
                }
                else {
                    words = dialog.words || dialog;
                    if (dialog.cutscene) {
                        callback = thing.Diner.ScenePlayer.bindCutscene(dialog.cutscene, {
                            "player": thing,
                            "tirggerer": other
                        });
                    }
                }
                return function () {
                    thing.Diner.MenuGrapher.deleteMenu("Yes/No");
                    thing.Diner.MenuGrapher.createMenu("GeneralText", {});
                    thing.Diner.MenuGrapher.addMenuDialog("GeneralText", words, callback);
                    thing.Diner.MenuGrapher.setActiveMenu("GeneralText");
                };
            };
            console.warn("DialogOptions assumes type = Yes/No for now...");
            thing.Diner.MenuGrapher.createMenu("Yes/No", {
                "position": {
                    "offset": {
                        "left": 28
                    }
                }
            });
            thing.Diner.MenuGrapher.addMenuList("Yes/No", {
                "options": [
                    {
                        "text": "YES",
                        "callback": generateCallback(options.Yes)
                    }, {
                        "text": "NO",
                        "callback": generateCallback(options.No)
                    }]
            });
            thing.Diner.MenuGrapher.setActiveMenu("Yes/No");
        };
        /**
         * Starts a Character walking behind another Character. The leader is given a
         * .walkingCommands queue of recent steps that the follower will mimic.
         *
         * @param thing   The following Character.
         * @param other   The leading Character.
         */
        RipLuckyDiner.prototype.animateCharacterFollow = function (thing, other) {
            var direction = thing.Diner.getDirectionBordering(thing, other);
            thing.nocollide = true;
            if (thing.player) {
                thing.allowDirectionAsKeys = true;
                thing.shouldWalk = false;
            }
            thing.following = other;
            other.follower = thing;
            thing.Diner.addStateHistory(thing, "speed", thing.speed);
            thing.speed = other.speed;
            other.walkingCommands = [];
            thing.Diner.animateCharacterSetDirection(thing, direction);
            switch (direction) {
                case 0:
                    thing.Diner.setTop(thing, other.bottom);
                    break;
                case 1:
                    thing.Diner.setRight(thing, other.left);
                    break;
                case 2:
                    thing.Diner.setBottom(thing, other.top);
                    break;
                case 3:
                    thing.Diner.setLeft(thing, other.right);
                    break;
                default:
                    break;
            }
            // Manually start the walking process without giving a 0 onStop,
            // so that it continues smoothly in the walking interval
            thing.Diner.animateCharacterStartWalking(thing, direction);
            thing.followingLoop = thing.Diner.TimeHandler.addEventInterval(thing.Diner.animateCharacterFollowContinue, thing.Diner.MathDecider.compute("speedWalking", thing), Infinity, thing, other);
        };
        /**
         * Continuation helper for a following cycle. The next walking command is
         * played, if it exists.
         *
         * @param thing   The following Character.
         * @param other   The leading Character.
         */
        RipLuckyDiner.prototype.animateCharacterFollowContinue = function (thing, other) {
            if (other.walkingCommands.length === 0) {
                return;
            }
            var direction = other.walkingCommands.shift();
            thing.Diner.animateCharacterStartWalking(thing, direction, 0);
        };
        /**
         * Animates a Character to stop having a follower.
         *
         * @param thing   The leading Character.
         * @returns True, to stop TimeHandlr cycles.
         */
        RipLuckyDiner.prototype.animateCharacterFollowStop = function (thing) {
            var other = thing.following;
            if (!other) {
                return true;
            }
            thing.nocollide = false;
            delete thing.following;
            delete other.follower;
            thing.Diner.animateCharacterStopWalking(thing);
            thing.Diner.TimeHandler.cancelEvent(thing.followingLoop);
            return true;
        };
        /**
         * Animates a Character to hop over a ledge.
         *
         * @param thing   A walking Character.
         * @param other   A ledge for thing to hop over.
         */
        RipLuckyDiner.prototype.animateCharacterHopLedge = function (thing, other) {
            var shadow = thing.Diner.addThing("Shadow"), dy = -thing.Diner.unitsize, speed = 2, steps = 14, changed = 0;
            thing.shadow = shadow;
            thing.ledge = other;
            // Center the shadow below the Thing
            thing.Diner.setMidXObj(shadow, thing);
            thing.Diner.setBottom(shadow, thing.bottom);
            // Continuously ensure The Thing still moves off the ledge if not walking
            thing.Diner.TimeHandler.addEventInterval(function () {
                if (thing.walking) {
                    return false;
                }
                thing.Diner.animateCharacterSetDistanceVelocity(thing, thing.distance);
                return true;
            }, 1, steps * speed - 1);
            // Keep the shadow below the Thing, and move the Thing's offsetY
            thing.Diner.TimeHandler.addEventInterval(function () {
                thing.Diner.setBottom(shadow, thing.bottom);
                if (changed % speed === 0) {
                    thing.offsetY += dy;
                }
                changed += 1;
            }, 1, steps * speed);
            // Inverse the Thing's offsetY changes halfway through the hop
            thing.Diner.TimeHandler.addEvent(function () {
                dy *= -1;
            }, speed * (steps / 2) | 0);
            // Delete the shadow after the jump is done
            thing.Diner.TimeHandler.addEvent(function () {
                delete thing.ledge;
                thing.Diner.killNormal(shadow);
                if (!thing.walking) {
                    thing.Diner.animateCharacterStopWalking(thing);
                }
                if (thing.player) {
                    thing.canKeyWalking = true;
                    thing.Diner.MapScreener.blockInputs = false;
                }
            }, steps * speed);
        };
        /* Collision detection
        */
        /**
         * Function generator for the generic canThingCollide checker. This is used
         * repeatedly by ThingHittr to generate separately optimized Functions for
         * different Thing types.
         *
         * @returns A Function that generates a canThingCollide checker.
         */
        RipLuckyDiner.prototype.generateCanThingCollide = function () {
            /**
             * Generic checker for canCollide. This just returns if the Thing is alive.
             *
             * @param thing
             * @returns Whether the thing can collide.
             */
            return function canThingCollide(thing) {
                return thing.alive;
            };
        };
        /**
         * Function generator for the generic isCharacterTouchingCharacter checker.
         * This is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         *
         * @returns A Function that generates isCharacterTouchingCharacter.
         */
        RipLuckyDiner.prototype.generateIsCharacterTouchingCharacter = function () {
            /**
             * Generic checker for whether two characters are touching each other.
             * This checks to see if either has the nocollide flag, or if they're
             * overlapping, respecting tolerances.
             *
             * @param thing
             * @param other
             * @returns Whether thing is touching other.
             */
            return function isCharacterTouchingCharacter(thing, other) {
                // if (other.xvel || other.yvel) {
                //     // check destination...
                // }
                return (!thing.nocollide && !other.nocollide
                    && thing.right >= (other.left + other.tolLeft)
                    && thing.left <= (other.right - other.tolRight)
                    && thing.bottom >= (other.top + other.tolTop)
                    && thing.top <= (other.bottom - other.tolBottom));
            };
        };
        /**
         * Function generator for the generic isCharacterTouchingSolid checker. This
         * is used repeatedly by ThingHittr to generate separately optimized
         * Functions for different Thing types.
         *
         * @returns A Function that generates isCharacterTouchingSolid.
         */
        RipLuckyDiner.prototype.generateIsCharacterTouchingSolid = function () {
            /**
             * Generic checker for whether a character is touching a solid. The
             * hidden, collideHidden, and nocollidesolid flags are most relevant.
             *
             * @param thing
             * @param other
             * @returns Whether thing is touching other.
             */
            return function isCharacterTouchingSolid(thing, other) {
                return (!thing.nocollide && !other.nocollide
                    && thing.right >= (other.left + other.tolLeft)
                    && thing.left <= (other.right - other.tolRight)
                    && thing.bottom >= (other.top + other.tolTop)
                    && thing.top <= (other.bottom - other.tolBottom));
            };
        };
        /**
         * Function generator for the generic hitCharacterThing callback. This is
         * used repeatedly by ThingHittr to generate separately optimized Functions
         * for different Thing types.
         *
         * @returns A Function that generates hitCharacterThing.
         */
        RipLuckyDiner.prototype.generateHitCharacterThing = function () {
            /**
             * Generic callback for when a Character touches a Thing. Other may have a
             * .collide to override with, but normally this just sets thing's position.
             *
             * @param thing
             * @param other
             * @returns Whether thing is hitting other.
             */
            return function hitCharacterThing(thing, other) {
                // If either Thing is the player, it should be the first
                if (other.player && !thing.player) {
                    _a = [other, thing], thing = _a[0], other = _a[1];
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
                var _a;
            };
        };
        /**
         * Marks other as being a border of thing in the given direction, respecting borderPrimary.
         *
         * @param thing   A Thing whose borders are being checked.
         * @param other   A new border for thing.
         * @param direction   The direction border being changed.
         */
        RipLuckyDiner.prototype.setThingBordering = function (thing, other, direction) {
            if (thing.bordering[direction] && thing.bordering[direction].borderPrimary && !other.borderPrimary) {
                return;
            }
            thing.bordering[direction] = other;
        };
        /**
         * Collision callback for a Character and a CollisionDetector. Only Players may
         * trigger the detector, which has to be active to do anything.
         *
         * @param thing   A Character triggering other.
         * @param other   A Detector triggered by thing.
         * @returns Whether to override normal positioning logic in hitCharacterThing.
         */
        RipLuckyDiner.prototype.collideCollisionDetector = function (thing, other) {
            if (!thing.player) {
                return false;
            }
            if (other.active) {
                if (!other.requireOverlap || thing.Diner.isThingWithinOther(thing, other)) {
                    if (typeof other.requireDirection !== "undefined"
                        && !thing.keys[other.requireDirection]
                        && !thing.allowDirectionAsKeys
                        && thing.direction !== other.requireDirection) {
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
        };
        /**
         * Collision callback for a Player and a dialog-containing Character. The
         * dialog is started if it exists, as with a cutscene from other.
         *
         * @param thing   A Player triggering other.
         * @param other   A Character with dialog triggered by thing.
         */
        RipLuckyDiner.prototype.collideCharacterDialog = function (thing, other) {
            var dialog = other.dialog, direction;
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
                dialog = dialog[direction];
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
                thing.Diner.MenuGrapher.addMenuDialog("GeneralText", dialog, thing.Diner.animateCharacterDialogFinish.bind(thing.Diner, thing, other));
            }
            if (other.switchDirectionOnDialog) {
                thing.Diner.animateCharacterSetDirection(other, direction);
            }
        };
        /* Death
        */
        /**
         * Standard Function to kill a Thing, which means marking it as dead and
         * clearing its numquads, resting, movement, and cycles. It will later be
         * removed by its maintain* Function.
         *
         * @param thing   A Thing to kill.
         */
        RipLuckyDiner.prototype.killNormal = function (thing) {
            if (!thing) {
                return;
            }
            thing.nocollide = thing.hidden = thing.dead = true;
            thing.alive = false;
            thing.numquads = 0;
            thing.movement = undefined;
            if (thing.Diner) {
                thing.Diner.TimeHandler.cancelAllCycles(thing);
                thing.Diner.ModAttacher.fireEvent("onKillNormal", thing);
                if (thing.id) {
                    delete thing.Diner.MapScreener.thingsById[thing.id];
                }
            }
        };
        /* Activations
        */
        /**
         * Activates a Detector to trigger a cutscene and/or routine.
         *
         * @param thing   A Player triggering other.
         * @param other   A Detector triggered by thing.
         */
        RipLuckyDiner.prototype.activateCutsceneTriggerer = function (thing, other) {
            if (!other.alive || thing.collidedTrigger === other) {
                return;
            }
            thing.collidedTrigger = other;
            thing.Diner.animatePlayerDialogFreeze(thing);
            if (!other.keepAlive) {
                other.alive = false;
                if (other.id.indexOf("Anonymous") !== -1) {
                    console.warn("Deleting anonymous CutsceneTriggerer:", other.id);
                }
                thing.Diner.StateHolder.addChange(other.id, "alive", false);
                thing.Diner.killNormal(other);
            }
            if (other.cutscene) {
                thing.Diner.ScenePlayer.startCutscene(other.cutscene, {
                    "player": thing,
                    "triggerer": other
                });
            }
            if (other.routine) {
                thing.Diner.ScenePlayer.playRoutine(other.routine);
            }
        };
        /**
         * Activates a Detector to play an audio theme.
         *
         * @param thing   A Player triggering other.
         * @param other   A Detector triggered by thing.
         */
        RipLuckyDiner.prototype.activateThemePlayer = function (thing, other) {
            if (!thing.player || thing.Diner.AudioPlayer.getThemeName() === other.theme) {
                return;
            }
            thing.Diner.AudioPlayer.playTheme(other.theme);
        };
        /**
         * Activates a Detector to play a cutscene, and potentially a dialog.
         *
         * @param thing   A Player triggering other.
         * @param other   A Detector triggered by thing.
         */
        RipLuckyDiner.prototype.activateCutsceneResponder = function (thing, other) {
            if (!thing.player || !other.alive) {
                return;
            }
            if (other.dialog) {
                thing.Diner.activateMenuTriggerer(thing, other);
                return;
            }
            thing.Diner.ScenePlayer.startCutscene(other.cutscene, {
                "player": thing,
                "triggerer": other
            });
        };
        /**
         * Activates a Detector to open a menu, and potentially a dialog.
         *
         * @param thing   A Character triggering other.
         * @param other   A Detector triggered by thing.
         */
        RipLuckyDiner.prototype.activateMenuTriggerer = function (thing, other) {
            if (!other.alive || thing.collidedTrigger === other) {
                return;
            }
            var name = other.menu || "GeneralText", dialog = other.dialog;
            thing.collidedTrigger = other;
            thing.Diner.animateCharacterPreventWalking(thing);
            if (!other.keepAlive) {
                thing.Diner.killNormal(other);
            }
            if (!thing.Diner.MenuGrapher.getMenu(name)) {
                thing.Diner.MenuGrapher.createMenu(name, other.menuAttributes);
            }
            if (dialog) {
                thing.Diner.MenuGrapher.addMenuDialog(name, dialog, function () {
                    var onStop;
                    if (other.pushSteps) {
                        onStop = other.pushSteps.slice();
                    }
                    thing.Diner.MenuGrapher.deleteMenu("GeneralText");
                    if (typeof other.pushDirection !== "undefined") {
                        onStop.push(function () {
                            thing.Diner.MapScreener.blockInputs = false;
                            delete thing.collidedTrigger;
                        });
                        thing.Diner.animateCharacterStartWalkingCycle(thing, other.pushDirection, onStop);
                    }
                    else {
                        thing.Diner.MapScreener.blockInputs = false;
                        delete thing.collidedTrigger;
                    }
                });
            }
            thing.Diner.MenuGrapher.setActiveMenu(name);
        };
        /**
         * Activates a Character's sight detector for when another Character walks
         * into it.
         *
         * @param thing   A Character triggering other.
         * @param other   A sight detector being triggered by thing.
         */
        RipLuckyDiner.prototype.activateSightDetector = function (thing, other) {
            if (other.viewer.talking) {
                return;
            }
            other.viewer.talking = true;
            other.active = false;
            thing.Diner.MapScreener.blockInputs = true;
            thing.Diner.ScenePlayer.startCutscene("TrainerSpotted", {
                "player": thing,
                "sightDetector": other,
                "triggerer": other.viewer
            });
        };
        /**
         * Activation callback for level transports (any Thing with a .transport
         * attribute). Depending on the transport, either the map or location are
         * shifted to it.
         *
         * @param thing   A Character attempting to enter other.
         * @param other   A transporter being entered by thing.
         */
        RipLuckyDiner.prototype.activateTransporter = function (thing, other) {
            if (!thing.player || !other.active) {
                return;
            }
            if (typeof other.transport === "undefined") {
                throw new Error("No transport given to activateTransporter");
            }
            var transport = other.transport, callback, args;
            if (transport.constructor === String) {
                callback = thing.Diner.setLocation.bind(thing.Diner);
                args = [transport];
            }
            else if (typeof transport.map !== "undefined") {
                callback = thing.Diner.setMap.bind(thing.Diner);
                args = [transport.map, transport.location];
            }
            else if (typeof transport.location !== "undefined") {
                callback = thing.Diner.setLocation.bind(thing.Diner);
                args = [transport.location];
            }
            else {
                throw new Error("Unknown transport type:" + transport);
            }
            other.active = false;
            thing.Diner.animateFadeToColor(thing.Diner, {
                "color": "Black",
                "callback": callback.apply.bind(callback, thing.Diner, args)
            });
        };
        /* Physics
        */
        /**
         * Determines the bordering direction from one Thing to another.
         *
         * @param thing   The source Thing.
         * @param other   The destination Thing.
         * @returns The direction from thing to other.
         */
        RipLuckyDiner.prototype.getDirectionBordering = function (thing, other) {
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
        };
        /**
         * Determines the direction from one Thing to another.
         *
         * @param thing   The source Thing.
         * @param other   The destination Thing.
         * @returns The direction from thing to other.
         * @remarks Like getDirectionBordering, but for cases where the two Things
         *          aren't necessarily touching.
         */
        RipLuckyDiner.prototype.getDirectionBetween = function (thing, other) {
            var directionBordering = thing.Diner.getDirectionBordering(thing, other);
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
        };
        /**
         * Checks whether one Thing is overlapping another.
         *
         * @param thing   An in-game Thing.
         * @param other   An in-game Thing.
         * @returns Whether thing and other are overlapping.
         */
        RipLuckyDiner.prototype.isThingWithinOther = function (thing, other) {
            return (thing.top >= other.top
                && thing.right <= other.right
                && thing.bottom <= other.bottom
                && thing.left >= other.left);
        };
        /**
         * Determines whether a Character is visually within grass.
         *
         * @param thing   An in-game Character.
         * @param other   Grass that thing might be in.
         * @returns Whether thing is visually within other.
         */
        RipLuckyDiner.prototype.isThingWithinGrass = function (thing, other) {
            if (thing.right <= other.left) {
                return false;
            }
            if (thing.left >= other.right) {
                return false;
            }
            if (other.top > (thing.top + thing.heightGrass * thing.Diner.unitsize)) {
                return false;
            }
            if (other.bottom < (thing.top + thing.heightGrass * thing.Diner.unitsize)) {
                return false;
            }
            return true;
        };
        /**
         * Shifts a Character according to its xvel and yvel.
         *
         * @param thing   A Character to shift.
         */
        RipLuckyDiner.prototype.shiftCharacter = function (thing) {
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
        };
        /**
         * Sets a Player looking in a direction and updates MapScreener.
         *
         * @param thing   An in-game Player.
         * @param direction   A direction for thing to look at.
         */
        RipLuckyDiner.prototype.setPlayerDirection = function (thing, direction) {
            thing.direction = direction;
            thing.Diner.MapScreener.playerDirection = direction;
            thing.shouldWalk = true;
        };
        /* Spawning
        */
        /**
         * Spawning callback for Characters. Sight and roaming are accounted for.
         *
         * @param thing   A newly placed Character.
         */
        RipLuckyDiner.prototype.spawnCharacter = function (thing) {
            if (thing.sight) {
                thing.sightDetector = thing.Diner.addThing([
                    "SightDetector",
                    {
                        "direction": thing.direction,
                        "width": thing.sight * 8
                    }
                ]);
                thing.sightDetector.viewer = thing;
                thing.Diner.animatePositionSightDetector(thing);
            }
            if (thing.roaming) {
                thing.Diner.TimeHandler.addEvent(thing.Diner.activateCharacterRoaming, thing.Diner.NumberMaker.randomInt(70), thing);
            }
        };
        /**
         * Starts a Character roaming in random directions.
         *
         * @param thing   A Character to start roaming.
         * @returns Whether the time cycle should stop (thing is dead).
         */
        RipLuckyDiner.prototype.activateCharacterRoaming = function (thing) {
            if (!thing.alive) {
                return true;
            }
            thing.Diner.TimeHandler.addEvent(thing.Diner.activateCharacterRoaming, 24 + thing.Diner.NumberMaker.randomInt(70), thing);
            if (!thing.talking && !thing.Diner.MenuGrapher.getActiveMenu()) {
                thing.Diner.animateCharacterStartWalkingRandom(thing);
            }
            return false;
        };
        /**
         * Activates a Spawner by calling its .activate.
         *
         * @param thing   A newly placed Spawner.
         */
        RipLuckyDiner.prototype.activateSpawner = function (thing) {
            thing.activate(thing);
        };
        /**
         * Activates a WindowDetector by immediately starting its cycle of
         * checking whether it's in-frame to activate.
         *
         * @param thing   A newly placed WindowDetector.
         */
        RipLuckyDiner.prototype.spawnWindowDetector = function (thing) {
            if (!thing.Diner.checkWindowDetector(thing)) {
                thing.Diner.TimeHandler.addEventInterval(thing.Diner.checkWindowDetector, 7, Infinity, thing);
            }
        };
        /**
         * Checks if a WindowDetector is within frame, and activates it if so.
         *
         * @param thing   An in-game WindowDetector.
         */
        RipLuckyDiner.prototype.checkWindowDetector = function (thing) {
            if (thing.bottom < 0
                || thing.left > thing.Diner.MapScreener.width
                || thing.top > thing.Diner.MapScreener.height
                || thing.right < 0) {
                return false;
            }
            thing.activate(thing);
            thing.Diner.killNormal(thing);
            return true;
        };
        /**
         * Activates an AreaSpawner. If it's for a different Area than the current,
         * that area is spawned in the appropriate direction.
         *
         * @param thing   An AreaSpawner to activate.
         */
        RipLuckyDiner.prototype.spawnAreaSpawner = function (thing) {
            var map = thing.Diner.AreaSpawner.getMap(thing.map), area = map.areas[thing.area];
            if (area === thing.Diner.AreaSpawner.getArea()) {
                thing.Diner.killNormal(thing);
                return;
            }
            if (area.spawnedBy
                && area.spawnedBy === thing.Diner.AreaSpawner.getArea().spawnedBy) {
                thing.Diner.killNormal(thing);
                return;
            }
            area.spawnedBy = thing.Diner.AreaSpawner.getArea().spawnedBy;
            thing.Diner.activateAreaSpawner(thing, area);
        };
        /**
         * Runs an AreaSpawner to place its Area's Things in the map.
         *
         * @param thing   An in-game AreaSpawner.
         * @param area   The Area associated with thing.
         */
        RipLuckyDiner.prototype.activateAreaSpawner = function (thing, area) {
            var direction = thing.direction, creation = area.creation, Diner = thing.Diner, MapsCreator = Diner.MapsCreator, AreaSpawner = Diner.AreaSpawner, QuadsKeeper = Diner.QuadsKeeper, areaCurrent = AreaSpawner.getArea(), mapCurrent = AreaSpawner.getMap(), prethingsCurrent = AreaSpawner.getPreThings(), left = thing.left + thing.Diner.MapScreener.left, top = thing.top + thing.Diner.MapScreener.top;
            switch (direction) {
                case 0:
                    top -= area.height * thing.Diner.unitsize;
                    break;
                case 1:
                    left += thing.width * thing.Diner.unitsize;
                    break;
                case 2:
                    top += thing.height * thing.Diner.unitsize;
                    break;
                case 3:
                    left -= area.width * thing.Diner.unitsize;
                    break;
                default:
                    throw new Error("Unknown direction: " + direction + ".");
            }
            var x = left / Diner.unitsize + (thing.offsetX || 0);
            var y = top / Diner.unitsize + (thing.offsetY || 0);
            Diner.expandMapBoundariesForArea(Diner, area, x, y);
            for (var i = 0; i < creation.length; i += 1) {
                // A copy of the command must be used, so as to not modify the original 
                var command = Diner.proliferate({
                    "noBoundaryStretch": true,
                    "areaName": area.name,
                    "mapName": area.map.name
                }, creation[i]);
                if (!command.x) {
                    command.x = x;
                }
                else {
                    command.x += x;
                }
                if (!command.y) {
                    command.y = y;
                }
                else {
                    command.y += y;
                }
                // Having an entrance might conflict with previously set Locations
                if (command.hasOwnProperty("entrance")) {
                    delete command.entrance;
                }
                MapsCreator.analyzePreSwitch(command, prethingsCurrent, areaCurrent, mapCurrent);
            }
            AreaSpawner.spawnArea(RipLuckyDiner_1.DirectionSpawns[direction], QuadsKeeper.top / Diner.unitsize, QuadsKeeper.right / Diner.unitsize, QuadsKeeper.bottom / Diner.unitsize, QuadsKeeper.left / Diner.unitsize);
            area.spawned = true;
            Diner.killNormal(thing);
        };
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
        RipLuckyDiner.prototype.expandMapBoundariesForArea = function (Diner, area, dx, dy) {
            Diner.MapScreener.scrollability = Scrollability.Both;
        };
        /* Memory
        */
        /**
         * Saves the positions of all Characters in the game.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.saveCharacterPositions = function (Diner) {
            var characters = Diner.GroupHolder.getGroup("Character");
            for (var i = 0; i < characters.length; i += 1) {
                var character = characters[i];
                var id = character.id;
                Diner.saveCharacterPosition(Diner, character, id);
            }
        };
        /**
         * Saves the position of a certain Character.
         *
         * @param Diner
         * @param character   An in-game Character.
         * @param id   The ID associated with the Character.
         */
        RipLuckyDiner.prototype.saveCharacterPosition = function (Diner, character, id) {
            Diner.StateHolder.addChange(id, "xloc", (character.left + Diner.MapScreener.left) / Diner.unitsize);
            Diner.StateHolder.addChange(id, "yloc", (character.top + Diner.MapScreener.top) / Diner.unitsize);
            Diner.StateHolder.addChange(id, "direction", character.direction);
        };
        /**
         * Pushes and saves the current state of a variable to a stack.
         *
         * @param thing   The Thing, Area, Map, or Location saving its state of a variable.
         * @param title   Name for the state being saved.
         * @param value   The values of the variable to be saved.
         */
        RipLuckyDiner.prototype.addStateHistory = function (thing, title, value) {
            if (!thing.state) {
                thing.state = {};
            }
            var stateHistory = thing.state[title];
            if (stateHistory) {
                stateHistory.push(value);
            }
            else {
                thing.state[title] = [value];
            }
        };
        /**
         * Updates to the most recently saved state for a variable.
         *
         * @param thing   The Thing having its state restored.
         * @param title   The name of the state to restore.
         */
        RipLuckyDiner.prototype.popStateHistory = function (thing, title) {
            if (!thing.state) {
                throw new Error("State property is not defined for '" + thing + "'.");
            }
            var stateHistory = thing.state[title];
            if (!stateHistory || stateHistory.length === 0) {
                throw new Error("No state saved for '" + title + "'.");
            }
            thing[title] = stateHistory.pop();
        };
        /**
         * Clears the data saved in localStorage and saves it in a new object in localStorage
         * upon a new game being started.
         */
        RipLuckyDiner.prototype.clearSavedData = function () {
            var oldLocalStorage = this.ItemsHolder.exportItems();
            var collectionKeys = this.ItemsHolder.getItem(this.StateHolder.getPrefix() + "collectionKeys");
            for (var i = 0; collectionKeys && i < collectionKeys.length; i += 1) {
                oldLocalStorage[collectionKeys[i]] = this.ItemsHolder.getItem(collectionKeys[i]);
            }
            var keys = this.ItemsHolder.getKeys();
            for (var i = 0; i < keys.length; i += 1) {
                this.ItemsHolder.removeItem(keys[i]);
            }
            this.ItemsHolder.clear();
            this.ItemsHolder.setItem("oldLocalStorage", oldLocalStorage);
            this.ItemsHolder.saveItem("oldLocalStorage");
        };
        /**
         * Checks to see if oldLocalStorage is defined in localStorage; if that is true and a prior game
         * hasn't been saved, the data is restored under localStorage
         */
        RipLuckyDiner.prototype.checkForOldStorageData = function () {
            if (!this.ItemsHolder.getItem("oldLocalStorage") || this.ItemsHolder.getItem("gameStarted")) {
                return;
            }
            var oldLocalStorage = this.ItemsHolder.getItem("oldLocalStorage");
            for (var key in oldLocalStorage) {
                if (!oldLocalStorage.hasOwnProperty(key)) {
                    continue;
                }
                if (key.slice(0, "StateHolder".length) === "StateHolder") {
                    this.StateHolder.setCollection(key.slice(11), oldLocalStorage[key]);
                }
                else {
                    this.ItemsHolder.setItem(key, oldLocalStorage[key]);
                }
            }
            this.ItemsHolder.saveAll();
        };
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
        RipLuckyDiner.prototype.setMap = function (name, location, noEntrance) {
            if (typeof name === "undefined" || name.constructor === RipLuckyDiner) {
                name = this.AreaSpawner.getMapName();
            }
            var map = this.AreaSpawner.setMap(name);
            this.ModAttacher.fireEvent("onPreSetMap", map);
            this.NumberMaker.resetFromSeed(map.seed);
            this.InputWriter.restartHistory();
            this.ModAttacher.fireEvent("onSetMap", map);
            this.setLocation(location
                || map.locationDefault
                || this.settings.maps.locationDefault, noEntrance);
        };
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
        RipLuckyDiner.prototype.setLocation = function (name, noEntrance) {
            name = name || "0";
            this.AudioPlayer.clearAll();
            this.GroupHolder.clearArrays();
            this.MapScreener.clearScreen();
            this.MapScreener.thingsById = this.generateThingsByIdContainer();
            this.MenuGrapher.deleteAllMenus();
            this.TimeHandler.cancelAllEvents();
            this.AreaSpawner.setLocation(name);
            this.MapScreener.setVariables();
            var location = this.AreaSpawner.getLocation(name);
            location.area.spawnedBy = {
                "name": name,
                "timestamp": new Date().getTime()
            };
            this.ModAttacher.fireEvent("onPreSetLocation", location);
            this.PixelDrawer.setBackground(this.AreaSpawner.getArea().background);
            this.StateHolder.setCollection(location.area.map.name + "::" + location.area.name);
            this.QuadsKeeper.resetQuadrants();
            var theme = location.theme || location.area.theme || location.area.map.theme;
            this.MapScreener.theme = theme;
            if (theme && this.AudioPlayer.getThemeName() !== theme) {
                this.AudioPlayer.playTheme(theme);
            }
            if (!noEntrance) {
                location.entry(this, location);
            }
            this.ModAttacher.fireEvent("onSetLocation", location);
            this.GamesRunner.play();
            this.animateFadeFromColor(this, {
                "color": "Black"
            });
            if (location.push) {
                this.animateCharacterStartWalking(this.player, this.player.direction);
            }
        };
        /**
         * Determines the in-game measurements of the
         * boundaries of the current Area.
         *
         * @param Diner
         * @returns The boundaries of the current Area.
         */
        RipLuckyDiner.prototype.getAreaBoundariesReal = function (Diner) {
            var area = Diner.AreaSpawner.getArea();
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
        };
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
        RipLuckyDiner.prototype.getScreenScrollability = function (Diner) {
            var area = Diner.AreaSpawner.getArea();
            if (!area) {
                return Scrollability.None;
            }
            var boundaries = area.boundaries, width = (boundaries.right - boundaries.left) * Diner.unitsize, height = (boundaries.bottom - boundaries.top) * Diner.unitsize;
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
        };
        /**
         *
         */
        RipLuckyDiner.prototype.generateThingsByIdContainer = function () {
            return {};
        };
        /**
         * Analyzes a PreThing to be placed in one of the
         * cardinal directions of the current Map's boundaries
         * (just outside of the current Area).
         *
         * @param prething   A PreThing whose Thing is to be added to the game.
         * @param direction   The cardinal direction the Character is facing.
         * @remarks Direction is taken in by the .forEach call as the index.
         */
        RipLuckyDiner.prototype.mapAddAfter = function (prething, direction) {
            var MapsCreator = this.MapsCreator, AreaSpawner = this.AreaSpawner, prethings = AreaSpawner.getPreThings(), area = AreaSpawner.getArea(), map = AreaSpawner.getMap(), boundaries = this.AreaSpawner.getArea().boundaries;
            prething.direction = direction;
            switch (direction) {
                case 0:
                    prething.x = boundaries.left;
                    prething.y = boundaries.top - 8;
                    prething.width = boundaries.right - boundaries.left;
                    break;
                case 1:
                    prething.x = boundaries.right;
                    prething.y = boundaries.top;
                    prething.height = boundaries.bottom - boundaries.top;
                    break;
                case 2:
                    prething.x = boundaries.left;
                    prething.y = boundaries.bottom;
                    prething.width = boundaries.right - boundaries.left;
                    break;
                case 3:
                    prething.x = boundaries.left - 8;
                    prething.y = boundaries.top;
                    prething.height = boundaries.bottom - boundaries.top;
                    break;
                default:
                    throw new Error("Unknown direction: " + direction + ".");
            }
            MapsCreator.analyzePreSwitch(prething, prethings, area, map);
        };
        /* Map entrances
        */
        /**
         * Centers the current view of the Map based on scrollability.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.centerMapScreen = function (Diner) {
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
        };
        /**
         * Scrolls the game window horizontally until the Map is centered based on
         * the Area.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.centerMapScreenHorizontally = function (Diner) {
            var boundaries = Diner.MapScreener.boundaries, difference = Diner.MapScreener.width - boundaries.width;
            if (difference > 0) {
                Diner.scrollWindow(difference / -2);
            }
        };
        /**
         * Scrolls the game window vertically until the Map is centered based on
         * the Area.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.centerMapScreenVertically = function (Diner) {
            var boundaries = Diner.MapScreener.boundaries, difference = Diner.MapScreener.height - boundaries.height;
            Diner.scrollWindow(0, difference / -2);
        };
        /**
         * Scrolls the game window horizontally until the Map is centered on the player.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.centerMapScreenHorizontallyOnPlayer = function (Diner) {
            var difference = (Diner.getMidX(Diner.player) - Diner.MapScreener.middleX) | 0;
            if (Math.abs(difference) > 0) {
                Diner.scrollWindow(difference);
            }
        };
        /**
         * Scrolls the game window vertically until the Map is centered on the player.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.centerMapScreenVerticallyOnPlayer = function (Diner) {
            var difference = (Diner.getMidY(Diner.player) - Diner.MapScreener.middleY) | 0;
            if (Math.abs(difference) > 0) {
                Diner.scrollWindow(0, difference);
            }
        };
        /**
         * A blank Map entrance Function where no Character is placed.
         *
         * @param Diner
         * @param location   The Location within the Map.
         */
        RipLuckyDiner.prototype.mapEntranceBlank = function (Diner, location) {
            Diner.addPlayer(0, 0);
            Diner.player.hidden = true;
            if (location.cutscene) {
                Diner.ScenePlayer.startCutscene(location.cutscene, {
                    "player": Diner.player
                });
            }
        };
        /**
         * Standard Map entrance Function. Character is placed based on specified Location.
         *
         * @param Diner
         * @param location   The Location within the Map.
         */
        RipLuckyDiner.prototype.mapEntranceNormal = function (Diner, location) {
            Diner.addPlayer(location.xloc ? location.xloc * Diner.unitsize : 0, location.yloc ? location.yloc * Diner.unitsize : 0);
            Diner.animateCharacterSetDirection(Diner.player, (typeof location.direction === "undefined"
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
        };
        /**
         * Map entrace Function used when player is added to the Map at the beginning
         * of play. Retrieves Character position from the previous save state.
         *
         * @param Diner
         */
        RipLuckyDiner.prototype.mapEntranceResume = function (Diner) {
            var savedInfo = Diner.StateHolder.getChanges("player") || {};
            Diner.addPlayer(savedInfo.xloc || 0, savedInfo.yloc || 0, true);
            Diner.animateCharacterSetDirection(Diner.player, savedInfo.direction || Direction.Top);
            Diner.centerMapScreen(Diner);
        };
        /* Cutscenes
        */
        /**
         * Cutscene for the beginning of the game introduction.
         *
         * @param Diner
         * @param settings   Settings used for the cutscene.
         */
        RipLuckyDiner.prototype.cutsceneFarewellFadeIn = function (Diner) {
            Diner.animateFadeToColor(Diner, {
                callback: function () {
                    Diner.cutsceneFarewellFirstDialog(Diner);
                },
                change: .05,
                keepColor: true,
                speed: 10
            });
        };
        /**
         * Cutscene for Oak's introduction.
         *
         * @param Diner
         * @param settings   Settings used for the cutscene.
         */
        RipLuckyDiner.prototype.cutsceneFarewellFirstDialog = function (Diner) {
            Diner.MenuGrapher.createMenu("GeneralText");
            Diner.MenuGrapher.addMenuDialog("GeneralText", [
                "Rest in peace, Lucky Diner.",
                "We'll miss you!",
            ], function () {
                Diner.setLocation("Front Door");
            });
            Diner.MenuGrapher.setActiveMenu("GeneralText");
        };
        /* Miscellaneous utilities
        */
        /**
         * Creates a new String equivalent to an old String repeated any number of
         * times. If times is 0, a blank String is returned.
         *
         * @param {String} string   The characters to repeat.
         * @param {Number} [times]   How many times to repeat (by default, 1).
         */
        RipLuckyDiner.prototype.stringOf = function (str, times) {
            if (times === void 0) { times = 1; }
            return (times === 0) ? "" : new Array(1 + (times || 1)).join(str);
        };
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
        RipLuckyDiner.prototype.makeDigit = function (num, size, prefix) {
            return RipLuckyDiner.prototype.stringOf(prefix ? prefix.toString() : "0", Math.max(0, size - String(num).length)) + num;
        };
        /**
         * Checks all members of an Array to see if a specified key exists within one of them.
         *
         * @param array   The Array being checked.
         * @param key   The key being searched for.
         * @returns Whether the key exists within the Array members.
         */
        RipLuckyDiner.prototype.checkArrayMembersIndex = function (array, key) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][key]) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Function to add a stackable item to an Array. If it already exists,
         * the Function increases its value by count. Otherwise, it adds a new item
         * to the Array.
         *
         * @param array   The Array containing the stackable items.
         * @param title   The name of the stackable item to be added.
         * @param count   The number of these stackable items.
         * @param keyTitle   The key associated with the item's name, such as "item".
         * @param keyCount   The key associated with the item's count, such as "amount".
         * @returns Whether the stackable item was newly added.
         */
        RipLuckyDiner.prototype.combineArrayMembers = function (array, title, count, keyTitle, keyCount) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][keyTitle] === title) {
                    array[i][keyCount] += count;
                    return false;
                }
            }
            var object = {};
            object[keyTitle] = title;
            object[keyCount] = count;
            array.push(object);
            return true;
        };
        /**
         * Displays a message to the user.
         *
         * @param thing   The Thing that triggered the error.
         * @param message   The message to be displayed.
         */
        RipLuckyDiner.prototype.displayMessage = function (thing, message) {
            if (thing.Diner.MenuGrapher.getActiveMenu()) {
                return;
            }
            thing.Diner.MenuGrapher.createMenu("GeneralText", {
                "deleteOnFinish": true
            });
            thing.Diner.MenuGrapher.addMenuDialog("GeneralText", [
                message
            ]);
            thing.Diner.MenuGrapher.setActiveMenu("GeneralText");
        };
        // For the sake of reset functions, constants are stored as members of the 
        // RipLuckyDiner Function itself - this allows prototype setters to use 
        // them regardless of whether the prototype has been instantiated yet.
        /**
         * Static settings passed to individual reset Functions.
         */
        RipLuckyDiner.settings = {
            "audio": undefined,
            "collisions": undefined,
            "devices": undefined,
            "editor": undefined,
            "generator": undefined,
            "groups": undefined,
            "events": undefined,
            "help": undefined,
            "items": undefined,
            "input": undefined,
            "maps": undefined,
            "math": undefined,
            "menus": undefined,
            "mods": undefined,
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
        RipLuckyDiner.unitsize = 4;
        /**
         * Static scale of 2, to exand to two pixels per one game pixel.
         */
        RipLuckyDiner.scale = 2;
        /**
         * Quickly tapping direction keys means to look in a direction, not walk.
         */
        RipLuckyDiner.inputTimeTolerance = 4;
        return RipLuckyDiner;
    })(GameStartr.GameStartr);
    RipLuckyDiner_1.RipLuckyDiner = RipLuckyDiner;
})(RipLuckyDiner || (RipLuckyDiner = {}));
