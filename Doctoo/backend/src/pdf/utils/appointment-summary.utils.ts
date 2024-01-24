export const getMedicineInfo = (entity: any, content: string, result: any) => {
  let firstIndex = 0,
    lastIndex = content.length - 1;

  for (let i = entity.text.beginOffset - 1; i >= 0; i--) {
    if (content[i] === '.') {
      firstIndex = i;
      break;
    }
  }

  for (let i = entity.text.beginOffset + entity.text.content.length; i < content.length; i++) {
    if (content[i] === '.') {
      lastIndex = i;
      break;
    }
  }

  const entities = result?.entityMentions?.filter(
    (entity: any) => entity.text.beginOffset >= firstIndex && entity.text.beginOffset <= lastIndex,
  );

  let frequency, strength, dose, unit, form;
  for (const entityItem of entities) {
    if (entityItem.type === 'MED_FREQUENCY' && !frequency) {
      frequency = entityItem.text.content.toLowerCase();
    }

    if (entityItem.type === 'MED_DOSE' && !dose) {
      dose = entityItem.text.content.toLowerCase();
    }

    if (entityItem.type === 'MED_STRENGTH' && !strength) {
      strength = entityItem.text.content.toLowerCase();
    }

    if (entityItem.type === 'MED_UNIT' && !unit) {
      unit = entityItem.text.content.toLowerCase();
    }

    if (entityItem.type === 'MED_FORM' && !form) {
      form = entityItem.text.content.toLowerCase();
    }
  }
  return { name: entity.text.content.toLowerCase(), strength, unit, dose, frequency, form };
};
