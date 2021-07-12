import client from '../config/algoliaConfig';

const algolia = client.initIndex('recipes');

export default algolia;