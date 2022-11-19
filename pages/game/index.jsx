import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import Head from 'next/head'; 

export default function Game() {
    const alias = useRef(); 

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
        isActive: false,
        isLoad: false,
    })
    console.log(game)

    useEffect(() => {
            if(!game.isLoad) return;
            localStorage.setItem(game.game, JSON.stringify(game));
        }, [game]
    )

    useEffect(() => {
        alert(`Guarda tu ID de juego: ${game.id}`)
        const localStorageGame = JSON.parse(localStorage.getItem(game.game));
        if(!localStorageGame) return alert('No hay nada en el localStorage');
        todoGame(() => {return {...localStorageGame, isLoad: true}});
        console.log('Data Cargada')
    }, [])

    var isLoad = false

    
    const handleClick = () => {
        if(game.points >= game.required) { 
            todoGame((prevGame) => {
                return {
                    ...prevGame,
                    points: 0,
                    clicks: prevGame.clicks + 1,
                    wins: prevGame.wins + 1,
                    required: prevGame.required * 2,
                    isActive: true,
                }
            })
        } else {
            todoGame((prevGame) => {
                return {
                        ...prevGame,
                        points: prevGame.points + 1,
                        clicks: prevGame.clicks + 1,
                        isActive: true,
                    }
                }
            )
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
        console.log(game)
        if(game.isActive === false) return console.warn('No se a iniciado a dar clicks')
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
           <div id='title'>
                <h1> Bienvenido al clicker game </h1>
                <h2>Clickea tantas veces como puedas</h2>
           </div>
                
            <style jsx>{`
                h1 {
                    text-align: center;
                    font-size: 360%;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                }
                h2 {
                    text-align: center;
                    font-size: 180%;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                }
                body {
                    background-color: rgb(55, 69, 63, .1);
                    background-position: center;
                }
                #button {
                    text-align: center;
                }
                #puntos {
                    text-align: center;
                }
                #title {
                    text-align: center;
                }
            `}</style>
                
                <h3>Clicks {game.points}</h3>
                <h3>Clicks necesarios para ganar {game.required}</h3>
                <h3>Victorias {game.wins} </h3>
                <h3>Clicks totales {game.clicks}</h3>
                <h3 className='clicks_per_second'>Clicks por segundo {game.clicksPerSecond}</h3>
                <div>
                    <h4>Escribe tu alias aqui abajo</h4>
                    <input type="text" placeholder='Alias' value={ "Undefined"} ref={alias} /><button>SetAlias</button>
                </div>
                <button id="button" onClick={handleClick}>Click aca!</button>
                    <h3 id='nextjs'>Powered by: Next.js</h3>
                    <h4>Segundos: {game.seconds}</h4>
                <div id="end_game">
                </div>
        </>
    );
}