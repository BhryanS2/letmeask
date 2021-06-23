import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

import { database } from "../services/firebase"

import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"

import logoImg from "../assets/images/logo.svg"

import "../styles/room.scss"

type FireBaseQuestions = Record<string, {
  athor: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;

}>

type Question = {
  id: string,
  athor: {
    name: string;
    avatar: string;
  }
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
}

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTile] = useState("")

  const roomId = params.id

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.on("value", room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          athor: value.athor,
          content: value.content,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
        }
      })
      setTile(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()
    if (newQuestion.trim() === "") return;

    if (!user) throw new Error("You must be logged in");

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswred: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion("")
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className="roomTitle">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="o que você quer perguntar?"
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <div className="formFooter">
            {
              user ? (
                <div className="userInfo">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>Para enviar uma pergunta, <button>faça seu login</button> </span>
              )
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        
      </main>
    </div>
  )
}