import React from 'react'
import { useNavigate } from 'react-router';
import { register } from "../firebaseConfig"
import { useForm } from '../hooks/useForm';





const Registro = () => {

  
  const [values, handleInputChange] = useForm({
    username: "",
    email: "",
    email2: "",
    password: "",
    password2: ""
  })

  const { username, email, email2, password, password2 } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    register(email, password, username)
  }


 

  const Navigate = useNavigate()
  return (
   
    <div className="left2">
      <h1>REGISTRO</h1>&nbsp;

      <span className="loginwith"><img src="https://res.cloudinary.com/vrilli/image/upload/v1647741351/580b57fcd9996e24bc43c326_ipblzs.png" width={150} height="auto" alt="" /></span><br/><br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nombre" onChange={handleInputChange} value={username} />
        <input type="text" name="email" placeholder="E-mail" onChange={handleInputChange} value={email} />
        <input type="text" name="email2" placeholder="Confirme su E-mail" onChange={handleInputChange} value={email2} />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} value={password} />
        <input type="password" name="password2" placeholder="Confirme su Contraseña" onChange={handleInputChange} value={password2} />
        <button  type="submit">
          Registrarte
        </button>
      </form>
      <button type="button" className='mt-3' onClick={() => {
        Navigate('/FormLogin')
      }}>
        Login
      </button><br/><br/>
    </div>


  )
}

export default Registro