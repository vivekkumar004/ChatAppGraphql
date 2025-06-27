import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation postMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
    }
  }
`;
