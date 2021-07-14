import { useState } from "react";
import copyImg from "../../assets/images/copy.svg";

import "./style.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const [isCopy, setIsCopy] = useState(false);

  const toggle = () => setIsCopy(!isCopy);
  async function copyRoomCodeToClipBoard() {
    toggle();
    await navigator.clipboard.writeText(props.code);
  }

  return (
    <button
      className={`RoomCode ${isCopy ? "copy" : ""}`}
      onClick={copyRoomCodeToClipBoard}
    >
      <div>
        <img src={copyImg} alt="copy" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
