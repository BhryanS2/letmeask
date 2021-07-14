import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

export const RoomExists = async (RoomId: string, redirect: string) => {
  const history = useHistory()
  const RoomRef = await database.ref(`rooms/${RoomId}`).get();
  if (!RoomRef.exists() || RoomRef.val().endDate) {
    history.push(redirect);
    return;
  }
};
