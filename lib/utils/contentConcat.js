/**
 * contentConcat()
 *
 * Desc: takes the array of content from Prismic rich text and creates a text blob
 *
 * Prismic gives us rich text arrays from the backend that can contain many things
 * We are looking for: "heading2", "heading3", "heading4", "list-item", and "paragraph"
 * We concatenate this content together to form a text blob
 * This is used to upload to Algolia so search has a singular content block to index
 *
 * @param { array } content - expects rich text field from Prismic
 */
export const contentConcat = (content) => {
  const contentFiltered = content.filter(
    (section) =>
      section.type === 'heading2' ||
      section.type === 'heading3' ||
      section.type === 'heading4' ||
      section.type === 'list-item' ||
      section.type === 'paragraph',
  );

  // returns nested text joined together into a string
  // this is how algolia wants content, so that's how we're doing it
  return contentFiltered
    .map((item) => {
      return item.text;
    })
    .join(' ');
};
