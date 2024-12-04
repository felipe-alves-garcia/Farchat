import voltar from '../img/voltar.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SobreSite (){
    const [sobre, setSobre] = useState([]);
    useEffect(() => {
        axios.get("https://chat-crng.onrender.com/sobre"
        ).then((resp) => {
            console.log(resp.data)
            setSobre(resp.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <a href="/" id="voltar" className="mt-5 hover">
                <img src={voltar} alt="" className="mt-1"/>
            </a>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-7 justify-content-center">
                        <h1 className="text-center mt-5 mb-5" id="titulo">FARCHAT</h1>
                    </div>
                    <div className="row mt-5">
                        <b><p className="text-white col-12 mb-2">AUTOR: {sobre.autor}</p>
                        <p className="text-white col-12 mb-2">NOME: {sobre.nome}</p>
                        <p className="text-white col-12 mb-2">VERSÃO: {sobre.versao}</p></b>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SobreSite;