var time = Date.now();

document.onreadystatechange = function (event) {
    if (event.target.readyState !== "complete") {
        return;
    }

    var UserWrapper = new UserWrappr.UserWrappr(RipLuckyDiner.RipLuckyDiner.prototype.proliferate(
        {
            "GameStartrConstructor": RipLuckyDiner.RipLuckyDiner
        }, RipLuckyDiner.RipLuckyDiner.settings.ui, true));

    console.log("It took " + (Date.now() - time) + " milliseconds to start.");

    UserWrapper.GameStarter.UsageHelper.displayHelpMenu();
};
