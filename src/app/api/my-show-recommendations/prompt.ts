export const showRecommendationPrompt = (names: string[]) => {
  const input = `Based on the following shows: ${names.join(", ")},`;
  const numberOfRecs = 10;
  const ask = `recommend me some new shows to watch (maximum of ${numberOfRecs} shows).`;
  const additionalInfo =
    "Please include potential reasons for the recommendations as well when applicable.";
  const format =
    "The response should be in JSON format as an array of these objects: { showName: string, reason: string }. It should start with the '[' and end with the ']'";
  return `${input} ${ask} ${additionalInfo} ${format}`;
};
