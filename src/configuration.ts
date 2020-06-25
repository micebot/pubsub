type Configuration = {
  username: string | undefined;
  password: string | undefined;
  channels: string[];
};

/**
 * Valida que as variáveis de ambiente estão
 */
function validateConfiguration() {
  if (!process.env.USERNAME) throw Error('No username provided for client.');
  if (!process.env.PASSWORD) throw Error('No password provided for client.');
  if (!process.env.CHANNEL) throw Error('No channel provided for client.');
}

/**
 * Carrega as configurações do client das variáveis de ambiente.
 */
export default function configuration(): Configuration {
  validateConfiguration();
  return {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    channels: process.env.CHANNEL ? [process.env.CHANNEL] : [],
  };
}
