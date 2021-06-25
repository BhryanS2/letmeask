import copyImg from '../../assets/images/copy.svg'

import './style.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code)
  }
  return (
    <button className="RoomCode" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="copy" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}