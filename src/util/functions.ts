function transformPlural(users: string[]): string {
  if (users.length === 0) throw Error('The array cannot be empty');
  return users.length === 1 ? '' : 's';
}

export default transformPlural;
