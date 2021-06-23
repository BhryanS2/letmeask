import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

// components
import { Button } from "../components/Button"

import { database } from '../services/firebase'

import IlustrationIMG from "../assets/images/illustration.svg"
import LogoImg from "../assets/images/logo.svg"

import "../styles/auth.scss"

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if(newRoom.trim() === '') return;
    const roomRaf = database.ref('rooms');
    const firebaseRoom = await roomRaf.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
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