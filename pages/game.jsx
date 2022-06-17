import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';

export default function Game() {
    const alias = useRef();
    var seconds = 0;

    const [game, todoGame] = useState({
        game: 'ClickerGame',
        id: uuidv4(),
        points: 0,
        wins: 0,
        clicksPerSecond: 0,
        required: 1000,
        clicks: 0,
    })

    var points = game.points;
    var wins = game.wins;
    var clicksPerSecond = game.clicksPerSecond;
    var required = game.required;
    var clicks = game.clicks;
    var id = game.id;

    var gameObject = {
        game: 'ClickerGame',
        id: id,
        points: points,
        wins: wins,
        clicksPerSecond: clicksPerSecond,
        required: required,
        clicks: clicks,
    }


    useEffect(() => {
        const localStorageGame = JSON.parse(localStorage.getItem(game.game));
        if(!localStorageGame) return;
        todoGame(localStorageGame);
    }, [])

    useEffect(() => {
            localStorage.setItem(game.game, JSON.stringify(game));
        }, [game]
    )

    const handleClick = () => {
        todoGame({
            ...game,
            points: points + 1,
            clicks: game.clicks + 1,
        })
        points = points + 1;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            seconds++;
            clicksPerSecond = clicks / seconds;
            todoGame(gameObject);
        }, 1000);
        return () => clearInterval(interval);
    }, [])



    
    return (
        <>
            <Head>
                <title>clicker game</title>
            </Head>
                    <h1> Bienvenido al clicker game </h1>
                <h2>Clickea tantas veces como puedas</h2>
                
                
                <h3>Clicks {game.points}</h3>
                <h3>Clicks necesarios para ganar {game.required}</h3>
                <h3>Victorias {game.wins} </h3>
                <h3>Clicks totales {game.clicks}</h3>
                <h3 className='clicks_per_second'>Clicks por segundo {game.clicksPerSecond}</h3>
                <div>
                    <h4>Escribe tu alias aqui abajo</h4>
                    <input type="text" placeholder='Alias' ref={alias} />
                </div>
                <button id="boton" onClick={handleClick}>Click aca!</button>
                <div id="end_game">
                </div>
        </>
    );
}