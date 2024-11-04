'use client'

import React, { useEffect, useState } from 'react';
import { Usuario } from '../Modelos/Iformulario';
import TablaUsuario from './TablaUsuario';
import axios from 'axios';

export default function Formulario() {
  const [nombre, setnombre] = useState<string>('');
  const [apellido, setapellido] = useState<string>('');
  const [telefono, settelefono] = useState<string>('');
  const [correo, setcorreo] = useState<string>('');
  const [fnacimiento, setfnacimiento] = useState<string>('');
  const [edad, setedad] = useState<string>('');
  const [submit, setsubmit] = useState<Boolean>(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<Usuario[]>('http://localhost:3000/Registro/Consulta');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);



  useEffect(() => {
    console.log('valores actualizados:', {
      nombre,
      apellido,
      telefono,
      correo,
      fnacimiento,
      edad,
    });
  }, [nombre, apellido, telefono, correo, fnacimiento]);

  const calcularEdad = (fecha: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let age = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      age--;
    }
    return age.toString();
  };

  useEffect(() => {
    if (fnacimiento) {
      setedad(calcularEdad(fnacimiento));
    }
  }, [fnacimiento]);

  const limpiarformulario = () => {
    setnombre('');
    setapellido('');
    settelefono('');
    setcorreo('');
    setfnacimiento('');
    setedad('');
    setUsuarioActual(null); 
  };

  const submitform = async (e: any) => {
    e.preventDefault();

    const nuevoUsuario: Usuario = {
      nombre,
      apellido,
      telefono,
      correo,
      fnacimiento,
      edad,
    };

    try {
      if (usuarioActual) {
        // Actualizar usuario existente
        const response = await axios.put(`http://localhost:3000/Registro/NRegistro${usuarioActual.id}`, nuevoUsuario);
        const updatedUser = response.data;
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        // Crear nuevo usuario
        const response = await axios.post('http://localhost:3000/Registro/Nuevo', nuevoUsuario);
        const createdUser = response.data;
        setUsuarios((prevUsuarios) => [...prevUsuarios, createdUser]);
      }

      console.log('formulario enviado con los datos :', { nuevoUsuario });
      setsubmit(true);
      limpiarformulario();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const editarUsuario = (usuario: Usuario) => {
    setid(usuario.id)
    setnombre(usuario.nombre);
    setapellido(usuario.apellido);
    settelefono(usuario.telefono);
    setcorreo(usuario.correo);
    setfnacimiento(usuario.fnacimiento);
    setedad(usuario.edad);
    setUsuarioActual(usuario);
  };

  const eliminarUsuario = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/Registro/${id}`);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={submitform}>
        <div className="mb-5">
          <label htmlFor="" className="form-label">Nombre</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setnombre(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="" className="form-label">Apellido</label>
          <input type="text" className="form-control" value={apellido} onChange={(e) => setapellido(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="" className="form-label">Telefono</label>
          <input type="text" className="form-control" value={telefono} onChange={(e) => settelefono(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="" className="form-label">Correo</label>
          <input type="text" className="form-control" value={correo} onChange={(e) => setcorreo(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="" className="form-label">Fecha de Nacimiento</label>
          <input type="date" className="form-control" value={fnacimiento} onChange={(e) => setfnacimiento(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="" className="form-label">Edad</label>
          <input type="text" className="form-control" value={edad}onChange={(e)=> setedad(e.target.value)} readOnly />
        </div>
        <div className="mb-5">
          <button type="submit" className="btn btn-primary">Enviar registro</button>
        </div>
      </form>

      <TablaUsuario 
        usuarios={usuarios} 
        onEdit={editarUsuario} 
        onDelete={eliminarUsuario} 
      />
    </>
  );
}
