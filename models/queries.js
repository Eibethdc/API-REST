import pool from '../config/db.js'
import format from 'pg-format';

const obtenerJoyas = async ({limits = 10, order_by = 'id_asc', page = 1}) =>{
    const [campo, dirección] = order_by.split('_')
    const offset = (page - 1) * limits
    const consulta = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, dirección, limits, offset)

    try {
        const { rows: joyas } = await pool.query(consulta)
        return joyas
    } catch (error) {
        console.log(error.message)
    }
}

const prepararHATEOAS = (joyas) =>{
    let stockTotal = 0;
    for (const j of joyas) {
    stockTotal += j.stock;
    }
    const results = joyas.map((j) =>{
        return{
            name: j.nombre,
            href: `/joyas/joya/${j.id}`
        }
    }).slice(0, 6)
    const totalJoyas = joyas.length
    const HATEOAS = {
        totalJoyas,
        stockTotal,
        results
    }
    return HATEOAS
}

const obtenerJoyasPorFiltro = async ({precio_max, precio_min, categoria, metal}) =>{
    let filtros = []
    let values = []

    const agregarFiltro = (campo, comprador, valor) =>{
        values.push(valor)
        const { length } = filtros
        filtros.push(`${campo} ${comprador} $${length + 1}`)
    }

    if (precio_max) agregarFiltro('precio', '<=', precio_max)
    if (precio_min) agregarFiltro('precio', '>=', precio_min)
    if (categoria) agregarFiltro('categoria', '=', categoria)
    if (metal) agregarFiltro('metal', '=', metal)
    let consulta = 'SELECT * FROM inventario'
    if(filtros.length > 0) {
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
        }
        const { rows: joyas } = await pool.query(consulta, values)
        return joyas
}

export const models = {
    obtenerJoyas,
    prepararHATEOAS,
    obtenerJoyasPorFiltro
}