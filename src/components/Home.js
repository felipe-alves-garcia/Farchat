import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//import botao from '../img/botao.png';
import aviao from '../img/aviao.png';
import mensagem from '../img/mensagem.png';
import usuario1 from '../img/usuario1.png';
import usuario2 from '../img/usuario2.png';

function Home (){
    
    /*var express = require('express')
    var cors = require('cors')
    var app = express()

    app.use(cors())

    app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
    })

    app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
    })*/

    const [nick, setNick] = useState();
    const [nickP, setNickP]= useState(nick);

    function funEntrarChat (e){
        e.preventDefault();
        setNick(nickP);
        console.log(nickP);
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.post("https://chat-crng.onrender.com/entrar", {
            nick: nick,
        }).then((resp) => {
            console.log(resp.data);
            navigate("/salas/"+resp.data.idUser+"/"+resp.data.nick+"/"+resp.data.token);
        }).catch((error) => {
            console.log(error);
        })
    }, [nick]);   
    
    /*useEffect(() => {
        fetch("https://chat-crng.onrender.com/entrar", {
            method: "POST",
            body: JSON.stringify({
                "nick": nick,
            })
        }).then((resp) => {
            console.log(resp.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [nick]);*/

    /*export function listarSalas (){
        url.get("/salas")
        .then((resp) => {
            console.log(resp.data);
        }).catch((error) => {
            console.log(error);
        })
    }*/
    

    return(
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 justify-content-center">
                        <h1 className="text-center mt-5 mb-5"><a href="/sobre" className="a hover2" id="titulo">FARCHAT</a></h1>
                        <div className="w-100 p-5 px-3 px-sm-5 row bg1 justify-content-center m-auto" style={{borderRadius:"25px"}}>
                            <p className="text-white mb-2 ms-4 text-start">Nome:</p>
                            <form onSubmit={funEntrarChat} className="row d-flex justify-content-center">
                                <input onChange={(e) => setNickP(e.target.value)} type="text" className="rounded-pill w-100 bg2 border-0 py-3 px-5 fs-6 text-white mb-4" style={{outline: "none"}} placeholder="Nome..."/>
                                <div className="col-10 col-sm-8 col-md-7 col-lg-6">
                                    <input type="submit" value="Entrar" className="d-inline py-2 my-5 w-100" id="entrarSalas"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="imgBg" className="d-none d-sm-block">
                <img src={aviao} alt="" className="imgFundo" style={{right:"10%", top:"28%"}}/>
                <img src={aviao} alt="" className="imgFundo" style={{left:"26%", bottom: "12%", transform: "scaleX(-1)"}}/>
                <img src={mensagem} alt="" className="imgFundo" style={{left:"6.5%", bottom:"35%", transform: "rotate(-55deg)"}}/>
                <img src={mensagem} alt="" className="imgFundo" style={{right:"11%", bottom:"20%"}}/>
                <img src={usuario1} alt="" className="imgFundo" style={{left:"8%", top:"24%"}}/>
                <img src={usuario2} alt="" className="imgFundo" style={{right:"32%", bottom:"10%"}}/>
            </div>
        </>
    )
}

export default Home;