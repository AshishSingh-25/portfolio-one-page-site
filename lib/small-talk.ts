// Match only complete social messages. A greeting followed by a factual question
// must still use retrieval, generation, and citation validation.
export function smallTalkAnswer(message: string): string | undefined {
  const text = message.toLowerCase().trim()
    .replace(/[.!?,;:\u{1F44B}\u{1F64F}]/gu, " ")
    .replace(/\s+/g, " ").trim();
  const address = "(?: (?:bro|dude|there|ashish|stella|mate|buddy))?";
  if (new RegExp(`^(?:hi|hello|hey|hey there|yo|namaste|good morning|good afternoon|good evening)${address}(?: how are you)?$`).test(text)) {
    return "Hey! I'm Ashish's portfolio assistant. Ask me about his projects, research, skills, education, or hobbies.";
  }
  if (/^(?:how are you|how are you doing|how's it going)$/.test(text)) {
    return "I'm here and ready to help! What would you like to know about Ashish's projects or background?";
  }
  if (new RegExp(`^(?:thanks|thank you|thanks a lot|thank you so much|thx)${address}$`).test(text)) {
    return "You're welcome! Feel free to ask more about Ashish's work or background.";
  }
  if (new RegExp(`^(?:bye|goodbye|see you|see you later)${address}$`).test(text)) {
    return "See you! You're welcome back anytime to explore Ashish's work.";
  }
}
