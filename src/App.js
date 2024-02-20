import { useState } from "react";

function Input({ type, id, name, placeholder, value, onChange}) {
  return <input className="border border-gray-400 rounded-full p-2 w-80 placeholder:text-sm pl-6" 
  type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
}

function Span(){
  return <span className="text-red-700">*</span>
}

function App() {

  const [dadosLogin, setDadosLogin] = useState({
    fullName: "", 
    email: "", 
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDadosLogin((prev) => {
      const newDadosLogin = {...prev, [name]: value}
      return newDadosLogin
    })
  }

  const calculateProgress = () =>{
    let value = 0
    const add = 100/Object.keys(dadosLogin).length
    if(dadosLogin.fullName){
      const explodeString = dadosLogin.fullName.split(" ")
      if(explodeString[1]){
        value += add
      }
    }
    if(dadosLogin.email){
      const validate = /\S+@\S+\.\S+/;
      if(validate.test(dadosLogin.email)){
        value += add
      }
    }
    if(dadosLogin.password.length >= 6){
      value += add
    }
    console.log(value)
    return value
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("ok")
  }

  calculateProgress()

  return (
    <div className="text-black grid grid-cols-2">
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold	">Create your account</h1>
      <p className="text-xs mb-6 pt-2 pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      <div className="bar-container"><div className="bar" style={{width: `${calculateProgress()}%`}}></div></div>
      <form className="flex flex-col gap-4">
        <div>
        <label htmlFor="name">Nome:<Span /> </label>
          <p><Input type="text" id="name" name="fullName" placeholder="Enter your name" value={dadosLogin.fullName} onChange={handleChange}/></p>
        </div>
        <div>
          <label htmlFor="email">Email:<Span /> </label>
          <p><Input type="email" id="email" name="email" placeholder="Enter your email" value={dadosLogin.email} onChange={handleChange}/></p>
        </div>
        <div>
          <label htmlFor="password">Senha:<Span /> </label>
          <p><Input type="password" id="password" name="password" placeholder="Enter your password" value={dadosLogin.password} onChange={handleChange}/></p>
        </div>
        <button onClick={handleSubmit} type="submit" className="bg-black text-white p-1 rounded-full disabled:bg-gray-400 text-slate-200" disabled={calculateProgress() != 100}>Sign Up</button>
      </form>
      </div>
      <div>
        <img className="object-cover h-screen w-screen" src={"../../img/1__.jpg"}></img> 
      </div>
    </div>
  );
}

export default App;
