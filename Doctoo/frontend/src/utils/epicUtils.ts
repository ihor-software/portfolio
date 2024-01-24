export const getEmail = (array: any) => {
  const emails = array.filter((item: { system: string }) => item.system === 'email');
  return emails[0] && emails[0].value ? emails[0].value : '';
};

export const getPhone = (array: any) => {
  const phones = array.filter((item: { system: string }) => item.system === 'phone');
  return phones[0].value ? phones[0].value : '';
};

export const getMedicalCondition = (array: any) => {
  const conditions = array
    .filter(
      (item: { resource: { resourceType: string } }) => item.resource.resourceType === 'Condition',
    )
    .map((item: { resource: { code: any } }) => {
      return item.resource.code.text;
    });
  return conditions ? conditions.join(', ') : '';
};
