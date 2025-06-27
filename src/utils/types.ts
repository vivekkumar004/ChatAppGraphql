import { UserType } from "../context/AppContextProvider";

export interface MessagesType {
  datetime: string;
  messageId: string;
  text: string;
  userId: UserType;
}

export interface ProcessedMessageType extends MessagesType {
  statusSuccess: boolean;
}
