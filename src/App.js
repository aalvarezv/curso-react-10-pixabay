import React, {useState, useEffect, Fragment} from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

    const [busqueda, guardarBusqueda] = useState('')
    const [imagenes, guardarImagenes] = useState([])
    const [paginaactual, guardarPaginaActual] = useState(1)
    const [totalpaginas, guardarTotalPaginas] = useState(1) 

    useEffect(() => {
        if(busqueda === ''){
            return
        }
      
        const consultarAPI = async() =>{
            const imagenesPagina = 10
            const key = '15320513-e5b89c9747622b071f431627d'
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPagina}&page=${paginaactual}`
    
            const resultado = await fetch(url)
            const respuesta = await resultado.json()
            const paginas = Math.ceil(respuesta.totalHits / imagenesPagina)
            guardarTotalPaginas(paginas)
            guardarImagenes(respuesta.hits)

            //mover la pantalla hacia arriba
            const jumbotron = document.querySelector('.jumbotron')
            jumbotron.scrollIntoView({behavior: 'smooth'})
        }
       consultarAPI()

    },[busqueda, paginaactual])

    
    const paginaAnterior = (e) =>{
        e.preventDefault()
        const nuevaPaginaActual = paginaactual - 1;
        if(nuevaPaginaActual === 0) return
        guardarPaginaActual(nuevaPaginaActual)
   }

    const paginaSiguiente = (e) =>{
        e.preventDefault()
        const nuevaPaginaActual = paginaactual + 1;
        if(nuevaPaginaActual > totalpaginas) return
        guardarPaginaActual(nuevaPaginaActual)
   }

    return ( 
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imágenes</p>
                <Formulario 
                    guardarBusqueda = {guardarBusqueda}
                />
               
            </div>
            <div className="row justify-content-center">
                 {imagenes.length > 0 

                    ? <Fragment>
                        <ListadoImagenes imagenes = {imagenes}/> 
                        {paginaactual === 1 
                        ? null 
                        : <button 
                            type="button"
                            className="btn btn-info mr-1"
                            onClick={paginaAnterior}
                            >&laquo; Anterior</button>
                        
                        }
                       {paginaactual === totalpaginas 
                        ? null
                        : <button 
                            type="button"
                            className="btn btn-info"
                            onClick={paginaSiguiente}
                            >Siguiente &raquo;</button>
                       }
                      </Fragment>
                    : null }  

            </div>
        </div>
    );
}

export default App;