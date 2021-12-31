export const boasVindas = () => {
  let d = new Date();
  let hour = d.getHours();
  if (hour < 5) {
    return 'Boa Noite';
  } else if (hour < 8) {
    return 'Bom Dia';
  } else if (hour < 12) {
    return 'Bom Dia!';
  } else if (hour < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
};
