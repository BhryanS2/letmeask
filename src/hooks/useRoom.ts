import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswred: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FireBaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswred: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTile] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      try {
        const databaseRoom = room.val();
        const firebaseQuestions: FireBaseQuestions =
          databaseRoom.questions ?? {};

        const parsedQuestions = Object.entries(firebaseQuestions).map(
          ([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isAnswred: value.isAnswred,
              isHighlighted: value.isHighlighted,
              likeCount: Object.values(value.likes ?? {}).length,
              likeId: Object.entries(value.likes ?? {}).find(
                ([key, value]) => value.authorId === user?.id
              )?.[0],
            };
          }
        );
        setTile(databaseRoom.title);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Room not exists");
      }
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { questions, title };
}
