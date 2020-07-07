import { removeAdditionalSpaces, transformPlural } from '../util';

export function giveBookChatMessage(
  moderator: string,
  users: string[],
): string {
  const plural = transformPlural(users);
  return removeAdditionalSpaces(
    `Hey @${moderator}, vou verificar a disponibilidade dos códigos e já
    entro em contato com o${plural} usuário${plural}. 🐭`,
  );
}

export function giveBookWhisperMessage(user: string, code: string): string {
  return removeAdditionalSpaces(
    `Hey ${user}! Aqui está o seu código para resgatar qualquer e-book no site
    da casa do código: ${code}. O site é https://www.casadocodigo.com.br.
    Bons estudos!`,
  );
}

export function helpWhisperMessage() {
  return removeAdditionalSpaces(`Qualquer dúvida, entre em contato
  conosco pelo Discord ou chame um moderador por sussurro aqui na Twitch,
  ok?! - https://discord.com/invite/3y4X9pm 🐭`);
}
