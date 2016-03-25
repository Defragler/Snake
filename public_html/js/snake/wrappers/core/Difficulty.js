function Difficulty(gameTick, name) {
    this.gameTick = gameTick;
    this.name = name;
    this.scores = [];

    this.getGameTick = function () {
        return this.gameTick;
    }

    this.getName = function () {
        return this.name;
    };

    this.getScores = function () {
        return this.scores;
    }

    this.addScore = function (score) {
        this.scores.push(score);
        this.scores.sort(
                function (a, b) {
                    return b.getScore() - a.getScore();
                }
        );
    }
}
