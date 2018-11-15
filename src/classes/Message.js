export default class Message {
  constructor(subject, body) {
    this.subject = subject;
    this.body = body;
  }

  static parse(string) {
    const parts = string.split(":");

    if (parts.length == 2) {
      return new Message(parts[0], parts[1]);
    }

    throw new Error("A message must consist of two parts.");
  }

  toString() {
    return `${this.subject}:${this.body}`;
  }
}
