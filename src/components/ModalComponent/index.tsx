import "./styles.scss";

type ModalProps = {
  questionID: string;
  description: string;
  title: string;
  icon: string;
  ConfirmFunction: (questionID: string) => void;
  toggle: () => void;
};

export function ModalComponent(props: ModalProps) {

  return (
    <div className="Modal">
      <div className="ModalContainer">
        <div className="image">
          <img src={props.icon} alt="Warning" />
        </div>
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <div className="ButtonsModal">
          <button onClick={props.toggle}>Cancelar</button>
          <button onClick={() => props.ConfirmFunction(props.questionID)}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
