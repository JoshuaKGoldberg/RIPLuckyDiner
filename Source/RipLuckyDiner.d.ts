declare module RipLuckyDiner {
    /**
     * Directions mapped to their String aliases.
     */
    export interface IDirectionsToAliases {
        [i: number]: string;
    }

    /**
     * String aliases of directions mapped to those directions.
     */
    export interface IDirectionAliases {
        [i: string]: Direction;
    }

    /**
     * Direction aliases mapped to their opposites, such as "left" to "right".
     */
    export interface IDirectionOpposites {
        [i: string]: string;
    }

    /**
     * Container for holding the states of objects in the game.
     */
    export interface IStateHistory {
        [i: string]: [any];
    }

    /**
     * An object for saving this object's state history.
     */
    export interface IStateSaveable {
        /**
         * Holds the states of an object in the game.
         */
        state: IStateHistory;
    }

    /**
     * A simple container for Map attributes given by switching to an Area within 
     * that map. A bounding box of the current viewport is kept, along with a bag
     * of assorted variable values.
     */
    export interface IMapScreenr extends MapScreenr.IMapScreenr {
        /**
         * Whether user inputs should be ignored.
         */
        blockInputs: boolean;

        /**
         * The current size of the area Things are placed in.
         */
        boundaries: IAreaBoundaries;

        /**
         * The currently playing cutscene, if any.
         */
        cutscene?: string;

        /**
         * What direction the player is currently facing.
         */
        playerDirection: Direction;

        /**
         * What form of scrolling is currently capable on the screen.
         */
        scrollability: Scrollability;

        /**
         * What theme is currently playing.
         */
        theme?: string;

        /**
         * All Things in the game, keyed by their ids.
         */
        thingsById: IThingsById;
    }

    /**
     * Things keyed by their ids.
     */
    export interface IThingsById {
        [i: string]: IThing;
    }

    /**
     * Settings regarding computations, particularly for an IMathDecidr.
     */
    export interface IMathDecidrCustoms extends GameStartr.IMathDecidrCustoms { }

    /**
     * Settings regarding large-scale state storage, particularly for an IStateHoldr.
     */
    export interface IStateHoldrCustoms extends GameStartr.IGameStartrSettingsObject {
        ItemsHolder: ItemsHoldr.IItemsHoldr;
    }

    /**
     * Stored settings to be stored separately and kept within an IRipLuckyDiner.
     */
    export interface IRipLuckyDinerStoredSettings extends GameStartr.IGameStartrStoredSettings {
        /**
         * Settings regarding computations, particularly for an IMathDecidr.
         */
        math: IMathDecidrCustoms;

        /**
         * Settings regarding a menu system, particularly for an IMenuGraphr.
         */
        menus: any;

        /**
         * Settings regarding large-scale state storage, particularly for an IStateHoldr.
         */
        states: IStateHoldrCustoms;
    }

    /**
     * A Map parsed from its raw JSON-friendly description.
     */
    export interface IMap extends MapsCreatr.IMapsCreatrMap, IStateSaveable {
        /**
         * A listing of areas in the Map, keyed by name.
         */
        areas: {
            [i: string]: IArea;
            [i: number]: IArea;
        };

        /**
         * The default location for the Map.
         */
        locationDefault?: string;

        /**
         * A starting seed to initialize random number generation.
         */
        seed?: number | number[];

        /**
         * What theme to play by default, such as "Pallet Town".
         */
        theme?: string;

        /**
         * The name of the Map, such as "Pallet Town".
         */
        name: string;
    }

    /**
     * An Area parsed from a raw JSON-friendly Map description.
     */
    export interface IArea extends MapsCreatr.IMapsCreatrArea, IStateSaveable {
        /**
         * Whether the Area allows bicycling.
         */
        allowCycling: boolean;

        /**
         * Any additional attributes that should add extra properties to this Area.
         */
        attributes?: {
            [i: string]: any;
        };

        /**
         * What background to display behind all Things.
         */
        background: string;

        /**
         * In-game boundaries of all placed Things.
         */
        boundaries: IAreaBoundaries;

        /**
         * How tall the area is.
         * @todo It's not clear if this is different from boundaries.height.
         */
        height: number;

        /**
         * The Map this Area is within.
         */
        map: IMap;

        /**
         * Whether this Area has been spawned.
         */
        spawned: boolean;

        /**
         * Which Map spawned this Area and when.
         */
        spawnedBy: IAreaSpawnedBy;

        /**
         * A default theme to override the parent Map's.
         */
        theme?: string;

        /**
         * How wide the area is.
         * @todo It's not clear if this is different from boundaries.width.
         */
        width: number;
    }

    /**
     * A description of how an Area has been stretched by its placed Things.
     */
    export interface IAreaBoundaries {
        /**
         * How wide the Area is.
         */
        width: number;

        /**
         * How tall the Area is.
         */
        height: number;

        /**
         * The top border of the boundaries' bounding box.
         */
        top: number;

        /**
         * The right border of the boundaries' bounding box.
         */
        right: number;

        /**
         * The bottom border of the boundaries' bounding box.
         */
        bottom: number;

        /**
         * The left border of the boundaries' bounding box.
         */
        left: number;
    }

    /**
     * A description of which Map spawned an Area and when.
     */
    export interface IAreaSpawnedBy {
        /**
         * The name of the Map that spawned the Area.
         */
        name: string;

        /**
         * When the spawning occurred.
         */
        timestamp: number;
    }

    /**
     * A Location parsed from a raw JSON-friendly Map description.
     */
    export interface ILocation extends MapsCreatr.IMapsCreatrLocation, IStateSaveable {
        /**
         * The Area this Location is a part of.
         */
        area: IArea;

        /**
         * A cutscene to immediately start upon entering.
         */
        cutscene?: string;

        /**
         * A direction to immediately face the player towards.
         */
        direction?: Direction;

        /**
         * Whether the player should immediately walk forward.
         */
        push?: boolean;

        /**
         * A cutscene routine to immediately start upon entering.
         */
        routine?: string;

        /**
         * A theme to immediately play upon entering.
         */
        theme?: string;

        /**
         * The x-location in the parent Area.
         */
        xloc?: number;

        /**
         * The y-location in the parent Area.
         */
        yloc?: number;
    }

    /**
     * Information on a move's metadata and effects.
     */
    export interface IMoveSchema {
        /**
         * The type of move, such as "Water".
         */
        type: string;

        /**
         * What type of damage this does, as "Physical", "Special", or "Non-Damaging".
         */
        damage: string;

        /**
         * What type of alternate effect the move does, such as "Status" or "Raise".
         */
        effect?: string;

        /**
         * The power of the move, as a damage Number or "-".
         */
        power: string | number;

        /**
         * The accuracy of the move, as "<number>%" (such as "70%") or "-".
         */
        accuracy: string;

        /**
         * The maximum PP for the move.
         */
        PP: number;

        /**
         * A friendly description of the move's effects.
         */
        description: string;

        /**
         * How much of an alternate effect the move has for changing statistics.
         */
        amount?: number;

        /**
         * Whether the move has a higher chance of being a critical hit.
         */
        criticalRaised?: boolean;

        /**
         * What status to lower, if applicable.
         */
        lower?: string;

        /**
         * What speed priority this move has.
         */
        priority?: number;

        /**
         * What status to raise, if applicable.
         */
        raise?: string;

        /**
         * Which status to give, such as "Sleep", if applicable.
         */
        status?: string;
    }

    /**
     * A description of a simple general text dialog to start.
     */
    export interface IDialog {
        /**
         * An optional cutscene to start after the dialog.
         */
        cutscene?: string;

        /**
         * Options for a yes or no dialog menu with callbacks after the dialog.
         */
        options?: IDialogOptions;

        /**
         * The actual text to display in the dialog.
         */
        words: MenuGraphr.IMenuDialogRaw;
    }

    /**
     * Dialog settings for a yes or no menu after a dialog.
     */
    export interface IDialogOptions {
        /**
         * What to display after the "Yes" option is activated.
         */
        Yes: string | IDialog;

        /**
         * What to display after the "No" option is activated.
         */
        No: string | IDialog;
    }

    /**
     * A position holder around an in-game Thing.
     */
    export interface IPreThing extends MapsCreatr.IPreThing {
        /**
         * A starting direction to face (by default, up).
         */
        direction?: Direction;

        /**
         * The in-game Thing.
         */
        thing: IThing;

        /**
         * The raw x-location from the Area's creation command.
         */
        x: number;

        /**
         * The raw y-location from the Area's creation command.
         */
        y: number;

        /**
         * How wide the Thing should be.
         */
        width?: number;

        /**
         * How tall the Thing should be.
         */
        height: number;
    }

    /**
     * An in-game Thing with size, velocity, position, and other information.
     */
    export interface IThing extends GameStartr.IThing, IStateSaveable {
        /**
         * The parent IRipLuckyDiner controlling this Thing.
         */
        Diner: RipLuckyDiner;

        /**
         * What to do when a Character, commonly a Player, activates this Thing.
         * 
         * @param activator   The Character activating this.
         * @param activated   The Thing being activated.
         */
        activate?: (activator: ICharacter, activated?: IThing) => void;

        /**
         * The area this was spawned by.
         */
        areaName: string;

        /**
         * Things this is touching in each cardinal direction.
         */
        bordering: IThing[];

        /**
         * Whether this should be chosen over other Things if it is one of multiple
         * potential Thing borders.
         */
        borderPrimary?: boolean;

        /**
         * What to do when a Character collides with this Thing.
         * 
         * @param thing   The Character colliding with this Thing.
         * @param other   This thing being collided by the Character.
         */
        collide: (thing: ICharacter, other: IThing) => boolean;

        /**
         * Animation cycles set by the Diner's ITimeHandlr.
         */
        cycles?: TimeHandlr.ITimeCycles;

        /**
         * Whether this has been killed.
         */
        dead?: boolean;

        /**
         * What cardinal direction this is facing.
         */
        direction: Direction;

        /**
         * Whether this is undergoing a "flicker" effect by toggling .hidden on an interval.
         */
        flickering?: boolean;

        /**
         * The globally identifiable, potentially unique id of this Thing.
         */
        id: string;

        /**
         * The name of the map that spawned this.
         */
        mapName: string;

        /**
         * Whether this is barred from colliding with other Things.
         */
        nocollide?: boolean;

        /**
         * How many quadrants this is contained within.
         */
        numquads: number;

        /**
         * A horizontal visual offset to shift by.
         */
        offsetX?: number;

        /**
         * A vertical visual offset to shift by.
         */
        offsetY?: number;

        /**
         * Whether to shift this to the "beginning" or "end" of its Things group.
         */
        position: string;

        /**
         * Whether this has been spawned into the game.
         */
        spawned: boolean;

        /**
         * Bottom vertical tolerance for not colliding with another Thing.
         */
        tolBottom: number;

        /**
         * Left vertical tolerance for not colliding with another Thing.
         */
        tolLeft: number;

        /**
         * Right horizontal tolerance for not colliding with another Thing.
         */
        tolRight: number;

        /**
         * Top vertical tolerance for not colliding with another Thing.
         */
        tolTop: number;
    }

    /**
     * A Character Thing.
     * @todo This should be separated into its sub-classes the way FSM's ICharacter is.
     */
    export interface ICharacter extends IThing {
        /**
         * For custom triggerable Characters, whether this may be used.
         */
        active?: boolean;

        /**
         * A Thing that activated this character.
         */
        collidedTrigger?: IDetector;

        /**
         * A cutscene to activate when interacting with this Character.
         */
        cutscene?: string;

        /**
         * The x- or y- position this will finish walking to, if applicable.
         */
        destination: number;

        /**
         * A dialog to start when activating this Character. If dialogDirections is true,
         * it will be interpreted as a separate dialog for each direction of interaction.
         */
        dialog?: MenuGraphr.IMenuDialogRaw | MenuGraphr.IMenuDialogRaw[];

        /**
         * Whether dialog should definitely be treated as an Array of one Dialog each direction.
         */
        dialogDirections?: Direction[];

        /**
         * A single set of dialog (or dialog directions) to play after the primary dialog
         * is complete.
         */
        dialogNext?: MenuGraphr.IMenuDialogRaw | MenuGraphr.IMenuDialogRaw[];

        /**
         * A dialog to place after the primary dialog as a yes or no menu.
         * @todo If the need arises, this could be changed to any type of menu.
         */
        dialogOptions?: IDialog;

        /**
         * A direction to always face after a dialog completes.
         */
        directionPreferred?: Direction;

        /**
         * How far this will travel while walking, such as hopping over a ledge. 
         */
        distance: number;

        /**
         * A scratch variable for height, such as when behind grass.
         */
        heightOld?: number;

        /**
         * Whether this is currently moving, generally from walking.
         */
        isMoving: boolean;

        /**
         * A ledge this is hopping over.
         */
        ledge?: IThing;

        /**
         * A callback for when this starts a single walking step.
         * 
         * @param character   This character that has started walking.
         * @param direction   The direction the Character is facing.
         */
        onWalkingStart: (character: ICharacter, direction: Direction) => void;

        /**
         * A callback for when this stops a single walking step, commonly to keep walking.
         * 
         * @param character   A Character mid-step.
         * @param onStop   Commands to run as a walking continuation.
         */
        onWalkingStop: (character: ICharacter, onStop: IWalkingOnStop) => void;

        /**
         * Whether this is allowed to be outside the QuadsKeepr quadrants area, or not
         * have a true .alive, without dieing.
         */
        outerOk?: boolean;

        /**
         * Whether this is a Player.
         */
        player?: boolean;

        /**
         * What direction to push the Player back after a dialog, if any.
         */
        pushDirection?: Direction;

        /**
         * Steps for the Player to take after being pushed back.
         */
        pushSteps?: IWalkingOnStop;

        /**
         * Whether this is sporadically
         */
        roaming?: boolean;

        /**
         * Directions this is allowed to roam.
         */
        roamingDirections?: Direction[];

        /**
         * How far this can "see" a Player to walk forward and trigger a dialog.
         */
        sight?: number;

        /**
         * The Detector stretching in front of this Thing as its sight.
         */
        sightDetector?: ISightDetector;

        /**
         * A shadow Thing for when this is hopping a ledge.
         */
        shadow?: IThing;

        /**
         * Whether this intends to walk when its current walking step is complete.
         */
        shouldWalk: boolean;

        /**
         * How fast this moves.
         */
        speed: number;

        /**
         * A scratch variable for speed.
         */
        speedOld?: number;

        /**
         * Whether the player is currently surfing.
         */
        surfing?: boolean;

        /**
         * Whether this should turn towards an activating Character when a dialog is triggered.
         */
        switchDirectionOnDialog?: boolean;

        /**
         * Whether this is currently engaging in its activated dialog.
         */
        talking?: boolean;

        /**
         * Whether this should transport an activating Character.
         */
        transport?: string | ITransportSchema;

        /**
         * Where this will turn to when its current walking step is complete.
         */
        turning?: Direction;

        /**
         * Whether this is currently walking.
         */
        walking?: boolean;

        /**
         * A queue of walking commands in waiting, used by its follower.
         */
        walkingCommands?: Direction[];

        /**
         * The class cycle for flipping back and forth while walking.
         */
        walkingFlipping?: TimeHandlr.ITimeEvent;
    }

    /**
     * A Player Character.
     */
    export interface IPlayer extends ICharacter {
        /**
         * Whether Detectors this collides with should consider walking to be an indication
         * of activation. This is useful for when the Player is following but needs to trigger
         * a Detector anyway.
         */
        allowDirectionAsKeys?: boolean;

        /**
         * Whether this is allowed to start walking via user input.
         */
        canKeyWalking: boolean;

        /**
         * Whether the player is currently bicycling.
         */
        cycling: boolean;

        /**
         * @returns A new descriptor container for key statuses.
         */
        getKeys: () => IPlayerKeys;

        /**
         * A descriptor for a user's keys' statuses.
         */
        keys: IPlayerKeys;

        /**
         * A next direction to turn to after the current walking step.
         */
        nextDirection?: Direction;
    }

    /**
     * A descriptor for a user's keys' statuses.
     */
    export interface IPlayerKeys {
        /**
         * Whether the user is currently indicating a selection.
         */
        a: boolean;

        /**
         * Whether the user is currently indicating a deselection.
         */
        b: boolean;

        /**
         * Whether the user is currently indicating to go up.
         */
        0: boolean;

        /**
         * Whether the user is currently indicating to go to the right.
         */
        1: boolean;

        /**
         * Whether the user is currently indicating to go down.
         */
        2: boolean;

        /**
         * Whether the user is currently indicating to go to the left.
         */
        3: boolean;
    }

    /**
     * A Detector Thing. These are typically Solids.
     */
    export interface IDetector extends IThing {
        /**
         * Whether this is currently allowed to activate.
         */
        active?: boolean;

        /**
         * A callback for when a Player activates this.
         * 
         * @param thing   The Player activating other, or other if a self-activation.
         * @param other   The Detector being activated by thing.
         */
        activate?: (thing: IPlayer | IDetector, other?: IDetector) => void;

        /**
         * A cutscene to start when this is activated.
         */
        cutscene?: string;

        /**
         * A dialog to start when activating this Character. If an Array, it will be interpreted
         * as a separate dialog for each cardinal direction of interaction.
         */
        dialog?: MenuGraphr.IMenuDialogRaw;

        /**
         * Whether this shouldn't be killed after activation (by default, false).
         */
        keepAlive?: boolean;

        /**
         * Whether this requires a direction to be activated.
         */
        requireDirection?: Direction;

        /**
         * Whether a Player needs to be fully within this Detector to trigger it.
         */
        requireOverlap?: boolean;

        /**
         * A cutscene routine to start when this is activated.
         */
        routine?: string;

        /**
         * Whether this should deactivate itself after a first use (by default, false).
         */
        singleUse?: boolean;
    }

    /**
     * A Detector that adds an Area into the game.
     */
    export interface IAreaSpawner extends IDetector {
        /**
         * The name of the Map to retrieve the Area within.
         */
        map: string;

        /**
         * The Area to add into the game.
         */
        area: string;
    }

    /**
     * A gym statue.
     */
    export interface IGymDetector extends IDetector {
        /**
         * The name of the gym.
         */
        gym: string;

        /**
         * The name of the gym's leader.
         */
        leader: string;
    }

    /**
     * A Detector that activates a menu dialog.
     */
    export interface IMenuTriggerer extends IDetector {
        /**
         * The name of the menu, if not "GeneralText".
         */
        menu?: string;

        /**
         * Custom attributes to apply to the menu.
         */
        menuAttributes?: MenuGraphr.IMenuSchema;

        /**
         * What direction to push the activating Player back after a dialog, if any.
         */
        pushDirection?: Direction;

        /**
         * Steps for the activating Player to take after being pushed back.
         */
        pushSteps?: IWalkingOnStop;
    }

    /**
     * An Character's sight Detector.
     */
    export interface ISightDetector extends IDetector {
        /**
         * The Character using this Detector as its sight.
         */
        viewer: ICharacter;
    }

    /**
     * A Detector to play an audio theme.
     */
    export interface IThemeDetector extends IDetector {
        /**
         * The audio theme to play.
         */
        theme: string;
    }

    /**
     * A detector to transport to a new area.
     */
    export interface ITransporter extends IDetector {
        transport: string | ITransportSchema;
    }

    /**
     * A description of where to transport.
     */
    export type ITransportSchema = {
        /**
         * The name of the Map to transport to.
         */
        map: string;

        /**
         * The name of the Location to transport to.
         */
        location: string;
    }


    /**
     * General attributes for all menus.
     */
    export interface IMenuBase extends MenuGraphr.IMenuBase {
        /**
         * Whether this has the dirty visual background.
         */
        dirty?: boolean;

        /**
         * Whether this has the light visual background.
         */
        light?: boolean;

        /**
         * Whether this has the lined visual background.
         */
        lined?: boolean;

        /**
         * Whether this has the plain white visual background.
         */
        plain?: boolean;

        /**
         * Whether this has the water visual background.
         */
        watery?: boolean;
    }

    /**
     * A schema to specify creating a menu.
     */
    export interface IMenuSchema extends MenuGraphr.IMenuSchema {
        /**
         * Whether the menu should be hidden.
         */
        hidden?: boolean;
    }

    /**
     * A Menu Thing.
     */
    export interface IMenu extends IMenuBase, IThing {
        /**
         * Children Things attached to the Menu.
         */
        children: IThing[];

        /**
         * How tall this is.
         */
        height: number;

        /**
         * Any settings to attach to this Menu.
         */
        settings?: any;

        /**
         * How wide this is.
         */
        width: number;
    }

    /**
     * A ListMenu Thing.
     */
    export interface IListMenu extends IMenu, MenuGraphr.IListMenuBase { }

    /**
     * A Menu to display the results of a KeyboardKeys Menu. A set of "blank" spaces
     * are available, and filled with Text Things as keyboard characters are chosen.
     */
    export interface IKeyboardResultsMenu extends IMenu {
        /**
         * The blinking hypen Thing.
         */
        blinker: IThing;

        /**
         * The complete accumulated values of text characters added, in order.
         */
        completeValue: string[];

        /**
         * The displayed value on the screen.
         */
        displayedValue: string[];

        /**
         * Which blank space is currently available.
         */
        selectedChild: number;
    }

    /**
     * Steps to take after a Character's current walking step. These should be alternating
     * directions and numbers of steps to take; Function commands are allowed as well.
     */
    export type IWalkingOnStop = IWalkingOnStopCommand[];

    /**
     * A single command within an IWalkingOnStop. This can be a number (how many steps to keep
     * taking in the current direction), a String (direction to face), Direction (direction to
     * face), or callback Function to evaluate.
     */
    export type IWalkingOnStopCommand = number | string | Direction | IWalkingOnStopCommandFunction;

    /**
     * A callback to run on a Character mid-step. This may return true to indicate to the
     * managing TimeHandlr to stop the walking cycle.
     * 
     * @param thing   The Character mid-step.
     * @returns Either nothing or whether the walking cycle should stop.
     */
    export interface IWalkingOnStopCommandFunction {
        (thing: ICharacter): void | boolean;
    }

    /**
     * Settings for a color fade animation.
     */
    export interface IColorFadeSettings {
        /**
         * What color to fade to/from (by default, "White").
         */
        color?: string;

        /**
         * How much to change the color's opacity each tick (by default, .33).
         */
        change?: number;

        /**
         * Whether to not kill the color Thing when done (by default, false).
         */
        keepColor?: boolean;

        /**
         * How many game upkeeps are between each tick (by default, 4).
         */
        speed?: number;

        /**
         * A callback for when the animation completes.
         */
        callback?: (Diner: RipLuckyDiner) => void;
    }

    /**
     * A tribute to the former Lucky Diner in Belltown, Seattle.
     */
    export interface IRipLuckyDiner extends GameStartr.IGameStartr {
        /**
         * Overriden MapScreenr refers to the IMapScreenr defined in RipLuckyDiner.d.ts.
         */
        MapScreener: IMapScreenr;

        /**
         * Stored settings to be stored separately and kept within a GameStartr.
         */
        settings: IRipLuckyDinerStoredSettings;

        /**
         * The game's player, which (when defined) will always be a Player Thing.
         */
        player: IPlayer;
    }
}
