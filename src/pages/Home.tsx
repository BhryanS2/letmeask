import { FormEvent,useState } from "react"
import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

import { database } from "../services/firebase"

import { Button } from "../components/Button"

import IlustrationIMG from "../assets/images/illustration.svg"
import LogoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import "../styles/auth.scss"

export function Home() {
  const history = useHistory()
  const [roomCode, setRoomCode] = useState("")
  const { SignInWithGoogle, user } = useAuth()

  async function HandleCriateRoom() {
    if (!user) await SignInWithGoogle()
    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if(roomCode.trim() === "") return;
    const RoomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!RoomRef.exists()) {
      alert("Room does not exist.")
      return
    }

    history.push(`/rooms/${roomCode}`)
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value= {roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}