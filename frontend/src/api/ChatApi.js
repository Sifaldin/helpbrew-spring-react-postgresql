import Api from "./Api";

class ChatApi {
  getAllThread() {
    return Api.get("/chat");
  }

  getThreadById(threadId) {
    return Api.get(`/chat/${threadId}`);
  }

  createThread(receiver, thread) {
    return Api.post(`/chat?receiverEmail=${receiver.email}`, thread);
  }

  createMessage(threadId, receiver, message) {
    return Api.post(
      `/chat/${threadId}?receiverEmail=${receiver.email}`,
      message
    );
  }
}

export default new ChatApi();
