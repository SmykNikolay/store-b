import DatabaseSingleton from '../database';

import { Product } from '../models/Product';

(async () => {
  const database = DatabaseSingleton.getInstance();

  try {
    await database.initialize();
    const productRepository = database.getRepository(Product);
    const product = await productRepository.find();
    console.log('Продукты:', product);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  } finally {
    await database.destroy();
  }
})();
