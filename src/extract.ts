import { extractMentions } from 'twitter-text';

/**
 * Extrai as menções de usuários na mensagem.
 * @param message mensagem na qual devem ser extraída as menções.
 */
export default function mentions(message: string): string[] {
  return extractMentions(message);
}
