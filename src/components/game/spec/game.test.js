const {game} = require('../game');
const {gameboard} = require('../../gameboard/gameboard');
const {playerFactory} = require('../../player/player');

describe("game", ()=>{
    beforeEach(()=>{ game.reset() });
    let length = 3;
    let gboard = gameboard;
    let players = [playerFactory("First", "X"), playerFactory("Second", "O")];
    game.setBoard(gboard);
    game.setPlayers(players);
    it("has a gameboard", ()=>{
        expect(game.getBoard()).toBe(gboard);
    });
    it("has Players", ()=>{
        expect(game.getPlayers()).toBe(players);
    });
    describe("setMove", ()=>{
        it("can set a move in the board", ()=>{
            game.setMove([0,0]);
            expect(game.getBoard().cells()).toEqual([[players[0].token, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]]);
        });
        it("alternates between players", ()=>{
            game.setMove([0,0]);
            game.setMove([1,1]);
            game.setMove([1,0]);
            game.setMove([2,2]);
            expect(game.getBoard().cells()).toEqual([[players[0].token, players[0].token, NaN], [NaN, players[1].token , NaN], [NaN, NaN, players[1].token]]);
        })
        it("doesn't allow overwriting", ()=>{
           game.setMove([0,0]);
           game.setMove([0,0]);
           game.setMove([0,1]);
           expect(game.getBoard().cells()).toEqual([[players[0].token, NaN, NaN], [players[1].token, NaN, NaN], [NaN, NaN, NaN]]);
        });
    });
    describe("hasEnded", ()=>{
        it("is true when the board has a sequence of length N", ()=>{
            for(let i = 0; i < length; i++){
                for(let j = 0; j < length; j++){
                    //console.log(`${game.getBoard().cells()[0]}` + "\n" + `${game.getBoard().cells()[1]}` + "\n" + `${game.getBoard().cells()[2]}`);
                    game.setMove([j,i])
                }
            }
            expect(game.getBoard().cells()).toEqual([[players[0].token, players[1].token, players[0].token], [players[1].token, players[0].token, players[1].token], [players[0].token, players[1].token, players[0].token]]);
            expect(game.hasEnded()).toEqual(true);
        })
        it("is true when the board is full", ()=>{
            [0,2,1].forEach((i)=>{
                for(let j = 0; j < length; j++){
                    //console.log(`${game.getBoard().cells()[0]}` + "\n" + `${game.getBoard().cells()[1]}` + "\n" + `${game.getBoard().cells()[2]}`);
                    game.setMove([j,i])
                }
            })
            expect(game.getBoard().cells()).toEqual([[players[0].token, players[1].token, players[0].token],[players[0].token, players[1].token, players[0].token], [players[1].token, players[0].token, players[1].token]]);
            expect(game.hasEnded()).toEqual(true);
        });
    });
    describe("winner", ()=>{
        it("is NaN if the game ends in tie", ()=>{
            [0,2,1].forEach((i)=>{
                for(let j = 0; j < length; j++){
                    //console.log(`${game.getBoard().cells()[0]}` + "\n" + `${game.getBoard().cells()[1]}` + "\n" + `${game.getBoard().cells()[2]}`);
                    game.setMove([j,i])
                }
            });
            console.log(game.winner());
            expect(Number.isNaN(game.winner())).toEqual(true);
            expect(game.hasEnded()).toEqual(true);
        });
        it("stores the player who got the sequence", ()=>{
            for(let i = 0; i < length; i++){
                for(let j = 0; j < length; j++){
                    //console.log(`${game.getBoard().cells()[0]}` + "\n" + `${game.getBoard().cells()[1]}` + "\n" + `${game.getBoard().cells()[2]}`);
                    game.setMove([j,i])
                }
            }
            expect(game.winner()).toEqual(players[0]);
            expect(game.hasEnded()).toEqual(true);
        })

    });
    describe("getTurn", ()=>{
        it("returns the current turn number", ()=>{
            let turns = 3;
            for(let i = 0; i < turns; i++){
                game.setMove([i,i]);
            }
            expect(game.getTurn()).toEqual(turns);
        })
    })
});