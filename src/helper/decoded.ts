export const decodeDatabaseId = (globalId: string): number => {
  const decoded = atob(globalId);
  return parseInt(decoded.split(':')[1]);
};
