import { useHistory, useParams } from "react-router-dom"

// import { useAuth } from "../../hooks/useAuth"
import { database } from "../../services/firebase"

import { Button } from "../../components/Button"
import { RoomCode } from "../../components/RoomCode"
import { Questions } from "../../components/Question"

import logoImg from "../../assets/images/logo.svg"
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import "../../styles/AdmRoomAndRoomQuestion.scss"
import { useRoom } from "../../hooks/useRoom"
type RoomParams = {
  id: string
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endDate: new Date()
    })
    history.push("/")
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta ?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleHighligthQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  async function handleCheckQuestionAsAnsered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswred: true,
    })
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="roomTitle">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="questionList">
          {questions.map(question => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswerd={question.isAnswred}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswred && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnsered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar como respondida" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighligthQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Romver Pergunta" />
                </button>

              </Questions>
            )
          })}
        </div>
      </main>
    </div>
  )
}