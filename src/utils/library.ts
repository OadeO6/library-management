export const generateLibraryNumber = async () => {
  // Generate unique library number
  const libraryNumber = `LIB-${Math.floor(1000 + Math.random() * 9000)}`;
  return libraryNumber;
};
