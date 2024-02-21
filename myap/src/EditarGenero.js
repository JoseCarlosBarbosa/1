import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from 'react-router-dom';

const EditarGenero = ({ match }) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [sucess, setSucess] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3002/api/genres/${id}`)
            .then(res => {
                setName(res.data.name)
            })
    }, [id])

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios.put(`http://localhost:3002/api/genres/${id}`, {
            name

        })
            .then(res => {
                setSucess(true);
            })
    }
    if (sucess) {
        return <Navigate to="/generos/" />
    }

    return (
        <div className="container">
            <h1>Editar Genero </h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do Genero" />

                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar </button>
            </form>
        </div>
    )
}

export default EditarGenero;