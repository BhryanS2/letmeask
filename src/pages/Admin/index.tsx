import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

import { useRoom } from "../../hooks/useRoom";
import { RoomExists } from "../../hooks/RoomIsOpen";
import { database } from "../../services/firebase";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Questions } from "../../components/Question";
import { ModalComponent } from "../../components/ModalComponent";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import CloseRoomIcon from "../../assets/images/CloseRoom.svg";
import CloseQuestionIcon from "../../assets/images/ExcludeQuestion.svg";

import "../../styles/AdmRoomAndRoomQuestion.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
  const [isOpenModalQuestion, setIsOpenModalQuestion] = useState<boolean>(false);
  const [isOpenModalEndRoom, setIsOpenModalEndRoom] = useState<boolean>(false);
  const [ModalQuestionID, setModalQuestionID] = useState<string>("");
  const toggleModalQuestion = () => setIsOpenModalQuestion(!isOpenModalQuestion);
  const toggleModalEndRoom = () => setIsOpenModalEndRoom(!isOpenModalEndRoom);
  RoomExists(roomId, "/")

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endDate: new Date(),
    });
    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setIsOpenModalQuestion(false);
  }

  async function handleHighligthQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleCheckQuestionAsAnsered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswred: true,
    });
  }
  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            {isOpenModalEndRoom ? (
              <ModalComponent
                questionID={ModalQuestionID}
                toggle={toggleModalEndRoom}
                description="Tem certeza que você deseja encerrar esta sala?"
                title="Encerrar sala"
                icon={CloseRoomIcon}
                ConfirmFunction={handleEndRoom}
              />
            ) : (
              ""
            )}
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={() => {
                toggleModalEndRoom();
              }}
            >
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="roomTitle">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="questionList">
          {isOpenModalQuestion ? (
            <ModalComponent
              questionID={ModalQuestionID}
              toggle={toggleModalQuestion}
              description="Tem certeza que você deseja excluir esta pergunta?"
              title="Excluir pergunta"
              icon={CloseQuestionIcon}
              ConfirmFunction={handleDeleteQuestion}
            />
          ) : (
            ""
          )}
          {questions.map((question) => {
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
                  onClick={() => {
                    setModalQuestionID(question.id);
                    toggleModalQuestion();
                  }}
                >
                  <img src={deleteImg} alt="Romover Pergunta" />
                </button>
              </Questions>
            );
          })}
        </div>
      </main>
    </div>
  );
}
