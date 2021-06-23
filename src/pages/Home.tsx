import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { Button } from "../components/Button"

import IlustrationIMG from "../assets/images/illustration.svg"
import LogoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import "../styles/auth.scss"

export function Home() {
  const history = useHistory()
  const { SignInWithGoogle, user } = useAuth()

  async function HandleCriateRoom() {
    if (!user) await SignInWithGoogle()
    history.push('/rooms/new')
  }

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
          <button onClick={HandleCriateRoom} className="CreateRoom">
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o google
          </button>
          <div className="Separator">ou entre em uma sala</div>
          <form action="">
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}