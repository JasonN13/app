import React from 'react';
import { Usuario } from '../Modelos/Iformulario';

interface TablaUsuarioProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void;
}

const TablaUsuario: React.FC<TablaUsuarioProps> = ({ usuarios, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Telefono</th>
          <th>Correo</th>
          <th>Fecha de Nacimiento</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.fnacimiento}</td>
            <td>{usuario.edad}</td>
            <td>
              <button onClick={() => onEdit(usuario)} className="btn btn-warning">Editar</button>
              <button onClick={() => onDelete(usuario.id)} className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaUsuario;
