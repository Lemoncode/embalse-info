import type { Choice } from 'prompts';

export const filterChoices = (input: string, choices: Choice[]) =>
  Promise.resolve(choices.filter(choice => choice.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())));
