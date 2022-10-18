const axios = require("axios");

const fetchData = async (rawText) => {
  const text = rawText.replace(/(\r\n|\n|\r)/gm, " ").trim();

  try {
    const tokensResponse = await axios({
      method: "post",
      url: "https://api.apilayer.com/nlp/tokenizer?lang=en",
      headers: { apikey: "QySSTfHEOJkd8Koov5rSj5NYDnY58y5O" },
      data: text,
    });
    const data = tokensResponse.data;

    if (!data || data.status === "ZERO_RESULTS") {
      throw new Error("Could not summarize");
    }

    const tokens = data.result;

    return { tokens, text };
  } catch (err) {
    throw new Error("Could not summarize");
  }
};

const splitSentences = (text) => {
  const sentences = [];
  let sentenceStr = "";
  let isQuote = false;

  for (const char of text) {
    sentenceStr += char;
    if (isQuote === false) {
      if (char === "“" || char === `"`) isQuote = true;
      else if (char === "." || char === "?" || char === "!") {
        sentences.push(sentenceStr);
        sentenceStr = "";
      }
    } else {
      if (char === "”" || char === `"`) isQuote = false;
    }
  }

  if (sentenceStr) {
    sentences.push(sentenceStr);
    sentenceStr = "";
  }

  for (let i = 0; i < sentences.length; i++) {
    sentences[i] = sentences[i].trim();
  }

  return sentences;
};

const createFreqTable = (tokens) => {
  const freqTable = {};

  for (const word of tokens) {
    if (word.info.stop) continue;
    freqTable[word.text] = (freqTable[word.text] || 0) + 1;
  }

  return freqTable;
};

const createSentenceScores = (sentences, freqTable) => {
  const sentenceScores = {};

  for (const sentence of sentences) {
    const wordCount = sentence.split(" ").length;
    const sentenceKey = sentence.slice(0, 10);

    for (const word in freqTable) {
      if (sentence.toLowerCase().includes(word)) {
        if (sentenceKey in sentenceScores) {
          sentenceScores[sentenceKey] += freqTable[word];
        } else {
          sentenceScores[sentenceKey] = freqTable[word];
        }
      }
    }

    sentenceScores[sentenceKey] = sentenceScores[sentenceKey] / wordCount;
  }

  return sentenceScores;
};

const findAverageScore = (scores) => {
  let sumValues = 0;

  for (const value of scores) {
    sumValues += value;
  }

  const average = sumValues / scores.length;

  return average;
};

const generateSummary = (sentences, sentenceScores, threshold) => {
  let summary = "";

  if (sentences.length === 1) return;

  for (const sentence of sentences) {
    const sentenceKey = sentence.slice(0, 10);
    if (
      sentenceKey in sentenceScores &&
      sentenceScores[sentenceKey] > threshold
    ) {
      summary += " " + sentence;
    }
  }

  return summary;
};

const summarize = async (rawText) => {
  try {
    const { tokens, text } = await fetchData(rawText);

    const freqTable = createFreqTable(tokens);

    const sentences = splitSentences(text);

    const sentenceScores = createSentenceScores(sentences, freqTable);

    const threshold = findAverageScore(Object.values(sentenceScores));

    const summary = generateSummary(sentences, sentenceScores, threshold);

    if (!summary) {
      throw new Error("Unable to summarize");
    }

    return summary;
  } catch (err) {
    console.log(err);
  }
};

module.exports = summarize;