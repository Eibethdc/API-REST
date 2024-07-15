import { models } from "../models/queries.js";

const home = (req, res) =>{
    res.send('Bienvenidos al Desafio Tienda de Joyas')
}

const obtenerJoyas = async (req, res) =>{
    try {
        const query = req.query;
        const joyas = await models.obtenerJoyas(query)
        const HATEOAS = await models.prepararHATEOAS(joyas)
        res.status(200).send(HATEOAS)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const obtenerJoyasPorFiltro = async (req, res) =>{
    try {
        const query = req.query;
        const joyas = await models.obtenerJoyasPorFiltro(query)
        res.status(200).send(joyas)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const notFound = (req, res) =>{
    res.status(404).send('Pagina no encontrada')
}

export const controller = {
    home,
    notFound,
    obtenerJoyas,
    obtenerJoyasPorFiltro
}