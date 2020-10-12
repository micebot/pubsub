import { removeAdditionalSpaces } from '../../util';

/**
 * Mensagem enviada para o usuário mencionando o código do e-book.
 * @param user nome de usuário.
 * @param ebookCode código do e-book.
 */
export function bookCommandUserWhisper(
  user: string,
  ebookCode: string,
): string {
  return removeAdditionalSpaces(
    `Hey ${user}! Aqui está o seu código para resgatar qualquer e-book no site
    da casa do código: ${ebookCode}. O site é https://www.casadocodigo.com.br.
    Bons estudos!`,
  );
}

/**
 * Mensagem enviada a moderador quando não há códigos disponíveis para serem entregues.
 * @param moderator nome de usuário do moderador.
 */
export function bookCommandNotAvailableModeratorWhisper(
  moderator: string,
): string {
  return removeAdditionalSpaces(`Ei ${moderator}, não tenho nenhum código
  disponível para entregar. Você pode cadastrar um novo código pelo Discord
  e utilizar o comando novamente.`);
}

/**
 * Mensagem enviada quando o número de produtos solicitados for menor que a quantidade disponível.
 * @param moderator nome de usuário do moderador.
 * @param currentNumberOfProducts número de produtos disponíveis.
 * @param expectedNumberOfProducts quantidade de produtos solicitada.
 */
export function bookCommandNumberOfProductsIsLessThanRequiredWhisper(
  moderator: string,
  currentNumberOfProducts: number,
  expectedNumberOfProducts: number,
): string {
  const items =
    currentNumberOfProducts === 1 ? 'item disponível' : 'itens disponíveis';

  const users = expectedNumberOfProducts === 1 ? 'pessoa' : 'pessoas';

  return removeAdditionalSpaces(`Ei ${moderator}, infelizmente não posso
  realizar a entrega da premiação pois a quantidade de itens disponíveis é
  inferior ao número de usuários para premiar. Eu tenho ${currentNumberOfProducts} ${items}
  e você me pediu para enviar o código para ${expectedNumberOfProducts} ${users}. Faça o cadastro de
  mais códigos pelo Discord e utilize o comando novamente no chat.`);
}

/**
 * Mensagem enviada quando ocorre alguma falha ao gerar o pedido para o usuário.
 * @param user nome do usuário que receberia o e-book.
 */
export function bookCommandFailedToCreateAOrderWhisper(user: string): string {
  return removeAdditionalSpaces(`Ei, por algum motivo desconhecido... eu não consegui
  entregar o e-book para o usuário ${user}. Você pode tentar enviar novamente, mas se o problema 
  continuar, entre e contato com meus criadores.`);
}
