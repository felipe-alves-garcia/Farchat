import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import fechar from '../img/fechar.png';
import mandar from '../img/mandar.png';

function Mensagens (){

    const {tipoSala} = useParams();
    const {nomeSala} = useParams();
    const {idUser} = useParams();
    const {nick} = useParams();
    const {token} = useParams();
    const {idSala} = useParams();

    //console.log(idUser)
    //console.log(nick)
    //console.log(token)
    //console.log(idSala)

    const [sala, setSala] = useState([]);
    let time;
    useEffect(() => {
        const url = axios.create({
            baseURL:"https://chat-crng.onrender.com",
            headers: {
                "idUser":idUser,
                "nick":nick,
                "token":token
            }
        })
        url.put("sala/entrar?idsala="+idSala)
        .then((resp) => {
            console.log(resp.data)
            setSala(resp.data)
            time = clearInterval(time);
            time = setInterval(funListarMsgs, 2000);
        }).catch((error) => {
            console.log(error)
        })
    }, [nick])

    //---

    const [mensagens, setMensagens] = useState([]);
    function funListarMsgs (){
        const url = axios.create({
            baseURL:"https://chat-crng.onrender.com",
            headers: {
                "idUser":idUser,
                "nick":nick,
                "token":token
            }
        })
        url.get("sala/mensagens?idSala="+idSala+"&timestamp")
        .then((resp) => {
            console.log(resp.data.msgs)
            setMensagens(resp.data.msgs);
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        funListarMsgs();
    }, [sala])

    //---

    const [msg, setMsg] = useState();
    function funEnviarMsg (e){
        e.preventDefault();
        if (msg === "" || msg === undefined){
            
        }
        else{
            const url = axios.create({
                baseURL:"https://chat-crng.onrender.com",
                headers: {
                    "idUser":idUser,
                    "nick":nick,
                    "token":token
                }
            })
            url.post("sala/mensagem?idSala="+idSala, {
                "msg": msg,
                "idSala": idSala
            }).then((resp) => {
                console.log(resp.data)
                setMsg("");
                funListarMsgs();
            }).catch((error) => {
                console.log(error)
            })    
        }
        
    }

    return(
        <>
            <header className="bg1">
                <div className="container-fluid">
                    <div className="row py-3">
                        <h1 className="ps-4 col-6 fs-5 text-white mt-2">{nomeSala}</h1>
                        <div className="col-6 justify-content-end d-flex align-items-center">
                            <a href={`/salas/${idUser}/${nick}/${token}`}><img src={fechar} style={{width:"1.5rem", height:"1.5rem"}} className="me-4 hover2" alt=""/></a>
                        </div>
                    </div>
                </div>
            </header>

            <main id="mensagens">
                <div className="container-fluid">

                    {mensagens.map((msg) => {
                        if(msg.nick === nick){
                            const date = new Date(msg.timestamp);

                            return (
                                <>
                                    <div className="row mt-4 justify-content-end">
                                        <div className="col-9 col-sm-8 col-md-7 col-lg-6 bg5 msg2">
                                            <p className="p-2 pt-3 m-0 text-end">{date.toLocaleTimeString()}</p>
                                            <p className="p-4 pb-2 pt-0 texto-end">{msg.msg}</p>
                                        </div>
                                        <div className="col-3 col-sm-2 col-lg-1 position-relative">
                                            <div className="bg5 ponta2"></div>
                                            <div className="bg4 suportePonta2"></div>
                                        </div>
                                    </div>    
                                </>
                            );
                            
                        }

                        else if(msg.nick === undefined ){
                            const date = new Date(msg.timestamp);

                            return (
                                <>
                                    <div className="row d-flex justify-content-center my-4">
                                        <div className="col-6 col-sm-4 col-md-2" id="dia">
                                            <p className="text-center p-2 m-0"><b>{date.toLocaleDateString()}</b></p>
                                        </div>
                                    </div>   
                                </>
                            );
                            
                        }

                        const date = new Date(msg.timestamp);

                        return (
                            <>
                                <div className="row mt-4">
                                    <div className="col-3 col-sm-2 col-lg-1 position-relative">
                                        <div className="bg3 ponta"></div>
                                        <div className="bg4 suportePonta"></div>
                                    </div>
                                    <div className="col-9 col-sm-8 col-md-7 col-lg-6 bg3 msg">
                                        <p className="p-2 pt-3 m-0"><b>{msg.nick} - </b>{date.toLocaleTimeString()}</p>
                                        <p className="p-4 pb-2 pt-0">{msg.msg}</p>
                                    </div>
                                </div>        
                            </>
                        );
                    })}
                </div>
            </main>

            <section id="texto" className="bg4 pt-3 pt-lg-2">
                <div className="container">
                    <form className="row d-flex justify-content-center" onSubmit={funEnviarMsg}>
                        <div className="col-9 col-md-8">
                            <input type="text" className="rounded-pill border-0 py-3 px-5 fs-6 mb-3 w-100" value={msg} onChange={(e) => {setMsg(e.target.value)}} style={{outline: "none"}} placeholder="Digite..."/>
                        </div>
                        <div className="col-3 col-sm-2">
                            <div id="enviarMsg">
                                <img src={mandar} alt="" style={{height:"3.5rem"}} className="hover"/>
                                <input type="submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Mensagens