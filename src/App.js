import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataEmpleados = [
  ];

  const [data, setData] = useState(dataEmpleados);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    id: '',
    fotografia: '',
    nombre: '',
    edad: '',
    sexo: '',
    salario: '',
    opciones: '',
    foto: ''
  });

  const seleccionarEmpleado=(elemento, caso)=>{
setEmpleadoSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setEmpleadoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setEmpleadoSeleccionado((prevState)=>({
      ...prevState,
      fotografia: base64
    }));
    console.log(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const readURL=e=>{
    const {name, value}=e.target;
    setEmpleadoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(empleado=>{
      if(empleado.id===empleadoSeleccionado.id){
        empleado.fotografia=empleadoSeleccionado.fotografia;
        empleado.nombre=empleadoSeleccionado.nombre;
        empleado.edad=empleadoSeleccionado.edad;
        empleado.sexo=empleadoSeleccionado.sexo;
        empleado.salario=empleadoSeleccionado.salario;
        empleado.opciones=empleadoSeleccionado.opciones;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(empleado=>empleado.id!==empleadoSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setEmpleadoSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=empleadoSeleccionado;
    if(data.length==0){
      valorInsertar.id=1;
    }else{
      valorInsertar.id=data[data.length-1].id+1;
    }
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div class="container" style={{marginTop: '30px'}}>
    <div className="App">
    <br />
      <h2>LISTA DE EMPLEADOS</h2>
    <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Clave</th>
            <th>Fotografia</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Salario</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td><img style={{width : '150px'}} src={elemento.fotografia}></img> </td>
              <td>{elemento.nombre}</td>
              <td>{elemento.edad}</td>
              <td>{elemento.sexo}</td>
              <td>{elemento.salario}</td>
              
              <td><button className="btn btn-primary" onClick={()=>seleccionarEmpleado(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarEmpleado(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <br />
        <button type="button" class="btn btn-success" onClick={()=>abrirModalInsertar()} style={{width: '25%'}} data-bs-toggle="modal" data-bs-target="#insertModal" > Insertar Empleado</button>
        </div>


      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Empleado</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Clave</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={empleadoSeleccionado && empleadoSeleccionado.id}
            />
           
           <label>Fotografia</label>
            <br/>
            <input
              type="file"
              name="fotografia"
              onChange={(e) => {
                uploadImage(e);
              }}            />
            <br/>
            <br/>

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={empleadoSeleccionado && empleadoSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Edad</label>
            <input
              className="form-control"
              type="number"
              name="edad"
              value={empleadoSeleccionado && empleadoSeleccionado.edad}
              onChange={handleChange}
            />
            <br />

            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="sexo"
              value={empleadoSeleccionado && empleadoSeleccionado.sexo}
              onChange={handleChange} 
            />
            <br />

            <label>Salario</label>
            <input
              className="form-control"
              type="number"
              name="salario"
              value={empleadoSeleccionado && empleadoSeleccionado.salario}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿ Eliminar empleado: {empleadoSeleccionado && empleadoSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()} >
           Eliminar
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
          Cancelar
          </button>
        </ModalFooter>
      </Modal>

        
        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Empleado</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">


            <label>Fotografia</label>
            <br/>
            
            <input
              type="file"
              name="fotografia"
              onChange={(e) => {
                uploadImage(e);
              }}            />
            <br/><br/>

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              onChange={handleChange}
            />
            <br />

            <label>Edad</label>
            <input
              className="form-control"
              type="number"
              name="edad"
              onChange={handleChange}
            />
            <br/>

            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="sexo"
              onChange={handleChange}
            />
            <br />

            <label>Salario</label>
            <input
              className="form-control"
              type="number"
              name="salario"
              onChange={handleChange}
            />
            <br />

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
          Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
          Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
