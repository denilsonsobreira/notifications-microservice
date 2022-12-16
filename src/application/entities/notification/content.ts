export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);
    if (!isContentLengthValid) {
      throw new Error('content length must be between 5 and 240 ');
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  //validation
  private validateContentLength(content: string) {
    return content.length >= 5 && content.length <= 240;
  }
}
