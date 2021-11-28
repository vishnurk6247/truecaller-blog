import { STRING_COSNTANTS } from "../utils/stringConstants";

export const getCategories = () => {
  return fetch(`${STRING_COSNTANTS.baseURL}/categories`);
};

export const getPosts = (page, category) => {
  return fetch(
    `${STRING_COSNTANTS.baseURL}/posts/?fields=slug,categories,post_thumbnail,title,date&number=20&page=${page}&category=${category}`
  );
};

export const getPostDetails = (slug) => {
  return fetch(
    `${STRING_COSNTANTS.baseURL}/posts/slug:${slug}?fields=featured_image,title,author,content,date`
  );
};
