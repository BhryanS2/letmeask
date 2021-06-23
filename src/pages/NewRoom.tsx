import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { Button } from "../components/Button"

import IlustrationIMG from "../assets/images/illustration.svg"
import LogoImg from "../assets/images/logo.svg"

import "../styles/auth.scss"


export function NewRoom() {
  // const { user } = useAuth()
  return (
    <div id="page-auth">
      <aside>
        <img src={IlustrationIMG} alt="Ilustração simbolizando perguntas e resposta" />
        <strong>Crei salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="mainContent">
          <img src={LogoImg} alt="letmeask" />
          <h2>Criar uma nova sala</h2>
          <form action="">
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}