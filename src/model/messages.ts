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

export function helpWhisperMessage(): string {
  return removeAdditionalSpaces(`Qualquer dúvida, entre em contato
  conosco pelo Discord ou chame um moderador por sussurro aqui na Twitch,
  ok?! - https://discord.com/invite/3y4X9pm 🐭`);
}

export function noPruductAvailableMessage(mention: string): string {
  return removeAdditionalSpaces(`Ei ${mention}, não tenho nenhum código
  disponível para entregar ao vencedor. Poderia me enviar no Discord?`);
}

export function unavailableProductMessage(
  mention: string,
  actual: number,
  expected: number,
): string {
  return removeAdditionalSpaces(`Ei ${mention}, infelizmente não posso
  realizar a entrega da premiação pois a quantidade de itens disponíveis é
  inferior ao número de usuário para premiar. Eu tenho ${actual} itens disponíveis
  e você me pediu para enviar o código para ${expected} pessoas. Faça o cadastro de
  mais códigos pelo Discord e utilize o comando novamente no chat.`);
}
