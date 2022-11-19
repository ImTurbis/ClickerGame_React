import { Suspense, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/Game.module.css';
import Head from 'next/head';
import axios from 'axios';



export default function Game() {
    const alias = useRef(); 
    var seconds = 0;

    //Obtener ip


    const [game, todoGame] = useState({
        game: 'ClickerGame',
        id: uuidv4(),
        points: 0,
        wins: 0,
        clicksPerSecond: 0,
        required: 1000,
        clicks: 0,
        seconds: 0,
        isActive: false
    })

    useEffect(() => {
            localStorage.setItem(game.game, JSON.stringify(game));
        }, [game]
    )

    useEffect(() => {
        alert(`Guarda tu ID de juego: ${game.id}`)
        const localStorageGame = JSON.parse(localStorage.getItem(game.game));
        if(!localStorageGame) return alert('No hay nada en el localStorage');
        todoGame(() => {return {...localStorageGame}});
        console.log('Data Cargada')
        isLoad = true;
    }, [])


    var points = game.points;
    var wins = game.wins;
    var clicksPerSecond = game.clicksPerSecond;
    var required = game.required;
    var clicks = game.clicks; 
    var isLoad = false

    
    const handleClick = () => {
        if(points >= required) { 
            points = 0;
            wins++; 
            required = required * 2;
            todoGame((prevGame) => {
                return {
                    ...prevGame,
                    points: 0,
                    clicks: prevGame.clicks + 1,
                    wins: prevGame.wins + 1,
                    required: prevGame.required * 2,
                }
            })
        } else {
            todoGame((prevGame) => {
                return {
                        ...prevGame,
                        points: prevGame.points + 1,
                        clicks: prevGame.clicks + 1,
                    }
                }
            )
            points = points + 1;
        }
    }


    const handleAlias = () => {
        const aliasget = alias.current;
        if(!aliasget) return alert('No pusiste nada');
        console.log(aliasget)
        todoGame((prevGame) => {
            return {
                ...prevGame,
                alias: aliasget,
            }
        })
    }


    const handleClickPerSecond = () => {
        if(!game.isActive) return console.warn('No se a iniciado a dar clicks')
        todoGame((prevGame) => {
                return {
                    ...prevGame,
                    clicksPerSecond: prevGame.clicks / prevGame.seconds,
                    seconds: prevGame.seconds + 1,
                }
            }
        )
    }


    useEffect(() => {
        if(!isLoad) return todoGame(() => {const localStorageGame = JSON.parse(localStorage.getItem(game.game)); return localStorageGame});
        const interval = setInterval(() => {
            handleClickPerSecond()
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
                    <input type="text" placeholder='Alias' defaultValue='null' ref={alias} /><button>SetAlias</button>
                </div>
                <button id="boton" onClick={handleClick}>Click aca!</button>
                    <h3 id='nextjs'>Powered by: Next.js</h3>
                    <h4>Segundos: {game.seconds}</h4>
                <div id="end_game">
                </div>

                
        </>
    );
}