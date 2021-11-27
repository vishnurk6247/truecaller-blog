export const getCategories = () => {
  return fetch(
    "https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories"
  );
};

export const getPosts = (page, category) => {
  return fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?fields=slug,categories,post_thumbnail,title,date&number=20&page=${page}&category=${category}`
  );
};
