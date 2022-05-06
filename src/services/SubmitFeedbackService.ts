import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required.");
    if (!comment) throw new Error("Comment is required.");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) 
      throw new Error("Invalid screenshot format.");

    let screenshotTag;
    if (screenshot) screenshotTag = `<img src="${screenshot}"/>`;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        "<html>",
        "<div style=\"font-family: sans-serif; font-size: 16px; color: #111;\">",
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshotTag,
        "</div>",
        "</html>",
      ].join("\n")
    });
  }
}
