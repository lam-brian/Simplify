const { fetchData } = require("./helpers");

const extractParagraphs = (html) => {
  const paragraphs = [];
  let paragraphStr = "";
  let tagStr = "";
  let isTag = false;
  let isPara = false;

  for (const char of html) {
    if (char === "<" && isPara === false) {
      isTag = true;
    }

    if (isTag) {
      tagStr += char;
      if (char === ">") {
        isTag = false;
        if (tagStr.startsWith("<p ") || tagStr.startsWith("<p>")) {
          isPara = true;
        }
        tagStr = "";
        continue;
      }
    }

    if (isPara) {
      paragraphStr += char;
      if (paragraphStr.endsWith("</p>")) {
        paragraphs.push(paragraphStr);
        paragraphStr = "";
        isPara = false;
      }
    }
  }

  return paragraphs.map((p) => p.trim().slice(0, -4));
};

const removeTags = (paragraphs) => {
  const paragraphsCopy = [...paragraphs];

  for (let i = 0; i < paragraphsCopy.length; i++) {
    const paragraph = paragraphsCopy[i];

    if (!paragraph.includes("<") && !paragraph.includes(">")) continue;

    let isTag = false;
    let tagStr = "";
    const tags = [];

    for (const char of paragraph) {
      if (char === "<") {
        isTag = true;
      }

      if (isTag) {
        tagStr += char;
        if (char === ">") {
          isTag = false;
          tags.push(tagStr);
          tagStr = "";
        }
      }
    }

    let cleanParagraph = paragraph;
    tags.forEach((tag) => (cleanParagraph = cleanParagraph.replace(tag, " ")));

    paragraphsCopy[i] = cleanParagraph;
  }

  return paragraphsCopy.map((para) => para.replace(/\s+/g, " ").trim());
};

const webscrape = async (url) => {
  try {
    const encodedURL = encodeURI(url);

    const result = await fetchData(
      `https://app.zenscrape.com/api/v1/get?apikey=${process.env.ZENSCRAPE_API_KEY}&url=${encodedURL}&render=true`
    );

    if (!result) {
      throw new Error("Error fetching data");
    }

    const paragraphs = extractParagraphs(result);

    const newParagraphs = removeTags(paragraphs);

    const joinedParagraphs = newParagraphs.join(" ");

    return joinedParagraphs;
  } catch (err) {
    throw err;
  }
};

module.exports = webscrape;
