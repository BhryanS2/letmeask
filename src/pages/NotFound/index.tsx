import LogoImg from "../../assets/images/logo.svg";
import NotFoundImg from "../../assets/images/empty-questions.svg";
import { Link, useHistory } from "react-router-dom";

import "./styles.scss";
import { Button } from "../../components/Button";

export function NotFound() {
  const history = useHistory()
  function gotoHome() {
    history.push("/")
  }
  return (
    <div id="NotFound">
      <header>
        <div>
          <img src={LogoImg} alt="Logo" />
        </div>
        <div>
            <Button isOutlined onClick={gotoHome}>
              Página inicial
            </Button>
        </div>
      </header>
      <main>
        <div>
          <img src={NotFoundImg} alt="404" />
          <h1>404</h1>
          <p>Sala não encontrada</p>
        </div>
      </main>
    </div>
  );
}
