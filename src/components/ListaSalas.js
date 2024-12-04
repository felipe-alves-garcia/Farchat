import {useParams} from "react-router-dom"; 
import {useState, useEffect} from 'react';
import axios from 'axios';

import sair from '../img/sair.png'
import botao from '../img/botao.png'
import publica from '../img/publica.png'
import privada from '../img/privada.png'
//import up from '../img/up.png'

function ListaSalas (){

    const {idUser} = useParams();
    const {nick} = useParams();
    const {token} = useParams();

    //console.log(idUser)
    //console.log(nick)
    //console.log(token)

    const [salas, setSalas] = useState([]);

    function funListarSalas (){
        const url = axios.create({
            baseURL:"https://chat-crng.onrender.com",
            headers: {
                "idUser":idUser,
                "nick":nick,
                "token":token
            }
        })
        url.get("salas")
        .then((resp) => {
            console.log(resp.data)
            setSalas(resp.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        funListarSalas();
    }, [nick])

    return (
        <>
            <div id="mascara"></div>
            <div className="container-fluid mt-4" id="porta">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 justify-content-center">
                        <h1 className="text-center mt-5 mb-5" id="titulo">Cimol 631A</h1>
                        <div className="w-100 p-5 px-3 px-sm-5 row bg1 justify-content-center m-auto" style={{borderRadius:"25px"}}>
                            <p className="text-white mb-2 ms-4">Senha:</p>
                            <input type="password" className="rounded-pill bg2 border-0 py-3 px-5 fs-6 text-white mb-4" style={{outline: "none"}} placeholder="********"/>
                            <a href="/mensagens" className="a d-inline col-8 col-sm-6 col-md-5 col-lg-4  my-5"><img src={botao} className="w-100 hover" alt=""/></a>
                        </div>
                    </div>
                </div>
            </div>

            <header className="bg1 py-2 py-sm-1">
                <div className="container-fluid">
                    <div className="row">
                        <h1 className="ps-4 col-6 mt-1 mt-md-0"><a href="/sobre" className="a ms-2 hover2" id="titulo2">FARCHAT</a></h1>
                        <div className="col-6 justify-content-end d-flex align-items-center">
                            <a href="/"><img src={sair} style={{width:"1.5rem", height:"1.5rem"}} className="me-4 me-sm-5 hover2" alt=""/></a>
                        </div>
                    </div>
                </div>
            </header>

            <main id="salas">
                <div className="container mt-5 mb-5">
                    {salas.map((item) => {

                        let tipoSala = publica;
                        if(item.tipo == "privada"){
                            tipoSala = privada
                        }
                        
                        return (
                            <>
                                <a className="row bg2 rounded a my-2 mx-1" id="sala" href={`/sala/${idUser}/${nick}/${token}/${item._id}/${item.tipo}/${item.nome}`}>
                                    <div className="col-9">
                                        <h2 className="text-white fs-5 p-3 mt-2">{item.nome}</h2>
                                    </div>
                                    <div className="col-3 d-flex justify-content-end align-items-center">
                                        <div>
                                            <img src={tipoSala} alt="" style={{width:"1.75rem"}} className="me-4"/>
                                        </div>
                                    </div>
                                </a>
                            </>
                        );
                    })}
                </div>
            </main>
        </>
    )
}

export default ListaSalas;