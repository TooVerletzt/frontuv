import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('jwtToken', token);
  } catch (err) {
    console.error('Error al guardar token:', err);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('jwtToken');
  } catch (err) {
    console.error('Error al obtener token:', err);
    return null;
  }
};
