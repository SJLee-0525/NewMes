// {
//       "id": 9007199254741000,
//       "patientName": "홍길동",
//       "contentSummary": "Consultation about pneumonia",
//       "createDate": "2025-04-24T14:55:32.817579",
//       "messages": [
//         {
//           "messageId": 9007199254743000,
//           "role": "USER",
//           "content": "환자가 Fever, cough 증상을 보입니다.",
//           "createDate": "2025-05-10T08:16:49.673598",
//           "messageImages": [
//             "001_000.png"
//           ]
//         },
//         {
//           "messageId": 9007199254743001,
//           "role": "ASSISTANT",
//           "content": "Left upper lung에서 Pneumonia 의심 소견이 관찰됩니다.",
//           "createDate": "2025-11-01T21:19:54.055043"
//         }
//       ]
//     },

export interface Message {
  messageId: number;
  role: "USER" | "ASSISTANT";
  content: string;
  createDate: string;
  messageImages?: string[];
}

export interface Session {
  id: number;
  patientName: string;
  contentSummary: string;
  createDate: string;
  messages: Message[];
}

export interface SessionsResponse {
  sessions: Session[];
}

export interface GroupByDateSessionsResponse {
  [key: string]: Session[];
}
