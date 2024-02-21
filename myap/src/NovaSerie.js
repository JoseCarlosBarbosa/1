import React, { useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

const NovoSerie = () => {
    const [name, setName] = useState("");
    const [sucess, setSucess] = useState(false);
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios.post("http://localhost:3002/api/series/", {
            name

        })
            .then(res => {
                setSucess(true);
            })
    }
    if (sucess) {
        return <Navigate to="/series/" />
    }

    return (
        <div className="container">
            <h1>Nova Série </h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da Série" />

                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar </button>
            </form>
        </div>
    )
}

export default NovoSerie;