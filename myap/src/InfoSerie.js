import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from 'react-router-dom';
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
    const { id } = useParams();
    const [form, setform] = useState({});
    const [sucess, setSucess] = useState(false);
    const [data, setData] = useState({})
    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3002/api/series/${id}`)
            .then(res => {
                setData(res.data)
                setform(res.data)
            })
    }, [id])

    useEffect(() => {
        axios.get("http://localhost:3002/api/genres/")
            .then(res => {
                setGenres(res.data.data)
                console.log(data, res.data)
            })
    }, [data])

    // custom header
    const masterHeader = {
        height: '50 vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }



    const onChange = field => evt => {
        setform({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setform({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios.put(`http://localhost:3002/api/series/${id}`,
            form

        )
            .then(res => {
                setSucess(true)
            })
    }
    if (sucess) {
        return <Navigate to="/series/" />
    }



    return (
        <div>

            <header style={masterHeader}>
                <div className="h-100" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} className="img-fluid img-thumbnail" src="data.poster" />
                            </div>
                            <div className="8">
                                <h1 className="font-weight-light text-white">
                                    {data.name}
                                </h1>
                                <div className="lead text-white">
                                    {data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color="warning">Para Assistir</Badge>}
                                    Gênero: {form.genre_name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <button onClick={() => setMode('EDIT')} className="btn btn-primary">Editar</button>
            </div>

            {
                mode === 'EDIT' &&
                <div className="container">
                    <h1>Editar Série </h1>
                    <button onClick={() => setMode('INFO')} className="btn btn-primary">Cancelar Edição</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome da Série" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Comentarios</label>
                            <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="name" placeholder="Nome da Série" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Gênero</label>
                            <select className="form-select" value={form.genre_id} onChange={onChange('genre_id')} >
                                {genres.map(genre => <option key={genre.id} value={genre.id} selected={genre.id === form.genre}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" onClick={seleciona('ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARAASSISTIR" onClick={seleciona('PARA_ASSISTIR')} />
                            <label className="form-check-label" htmlFor="PARAASSISTIR">
                                Para Assistir
                            </label>
                        </div>
                        <button type="button" onClick={save} className="btn btn-primary">Salvar </button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie;