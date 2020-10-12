import { extractMentions } from 'twitter-text';

/**
 * Return 's' when the list contains more than one element.
 * @param items the list.
 */
export function transformPlural(items: string[]): string {
  if (items.length === 0) throw Error('The array cannot be empty');
  return items.length === 1 ? '' : 's';
}

/**
 * Remove additional spaces from a text.
 * @param text the text to remove spaces.
 */
export function removeAdditionalSpaces(text: string): string {
  return text.replace(/\s+/g, ' ');
}

/**
 * Extract the mentions from a text.
 *
 * @param text the text to find and extract the mentions.
 *
 * @returns a list containing the mentions, without duplicates.
 */
export function mentions(text: string): Array<string> {
  const occurrences = extractMentions(text);
  return [...new Set(occurrences)];
}

/**
 * Remove o nome de usuário do bot da lista de usuários.
 * @param users lista de usuários.
 */
export function removeBotUsernameFromUsers(users: string[]): string[] {
  return users.filter((username) => username !== 'botmice');
}
