import { database } from "../services/firebase";

export const RoomExists = async (RoomId: string) => {
  try {
    const RoomRef = await database.ref(`rooms/${RoomId}`).get();
    return !RoomRef.exists() || RoomRef.val().endDate;
  } catch (error) {
    console.error(error);
  }
};
