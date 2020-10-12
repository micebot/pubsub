import { removeAdditionalSpaces } from '../../util';

export default function failedToFetchProducts(): string {
  return removeAdditionalSpaces(
    `Não consegui me conectar com a API para obter os produtos. Poderia verificar?
    Talvez meu servidor esteja offline. 🐭`,
  );
}
