import sanitizeHtml from 'sanitize-html';

const limitTitle = (body: string, opt: string) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  let cutter = 0;

  if (opt === 'title') {
    cutter = 40;
  } else {
    cutter = 200;
  }

  return filtered.length < 40 ? filtered : `${filtered.slice(0, cutter)}...`;
};

export default limitTitle;
