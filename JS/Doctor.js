var Doctor = function(game,  x, image, patrol) {
    var something = new Person(game, x, image, patrol);

    isoGroup.children[5].tint =  0xe06773;


    var move = something.movePlayer;
    something.movePlayer = function (direction) {

        //remove red tiles

        return move.call(this, direction);



        //add red tiles in front

        isoGroup.children[this.currentTile + 1].tint =  0xDCFBE6;




    };


    var infect = something.infect;
    something.infect = function () {
        return false;
    };


    return something;
}
