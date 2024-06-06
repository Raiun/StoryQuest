function cleanOutput(text: string) {
  text = text.replace(/[^0-9a-z\s]/gi, ''); // This regex keeps alphanumeric characters and spaces.
  text = text.toLowerCase();
  text = text.replace(/\n/g, " ");
  return text;
}

function areArraysEqual(arr1 : string[], arr2: string[]) {
  // Step 1: Check if lengths are equal
  if (arr1.length !== arr2.length) {
      return false;
  }

  // Step 2: Iterate through each element and compare
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
      }
  }

  // Step 3: If no unequal pair found, arrays are equal
  return true;
}

function checkMistakes(userText: string, storyText: string) {
  const cleanedUserText = cleanOutput(userText);
  const cleanedStoryText = " " + cleanOutput(storyText);
  console.log("clean user" + cleanedUserText)
  console.log("clean story" + cleanedStoryText)

  if (cleanedUserText === cleanedStoryText) {
    return []
  }
  else {
    const userWords = cleanedUserText ? cleanedUserText.split(/\s+/) : [];
    const storyWords = cleanedStoryText ? cleanedStoryText.split(/\s+/) : [];
    const minArrayLength = Math.min(userWords.length, storyWords.length);

    let correctBool = false;
    let mistakeString = "";
    let i = 0;
    
    console.log(storyWords[0])
    for (; i < minArrayLength; i++) {
      if (userWords[i] != storyWords[i]) {
        console.log("userword " + userWords[i] + ".")
        console.log("storyword " + storyWords[i] + ".")
        mistakeString += "<mark>" + storyWords[i] + "</mark>";
      }
      else {
        mistakeString += storyWords[i];
      }

      if (i < minArrayLength - 1) {
        mistakeString += " ";
      }
    }

    if (minArrayLength != storyWords.length) {
      let remainingString = ""
      for (;i < storyWords.length; i++) {
        remainingString += storyWords[i]

        if (i < storyWords.length - 1) {
          remainingString += " "
        }
      }
      
      if (remainingString != "") {
        mistakeString += " <mark>" + remainingString + "</mark> ";
      }
      else {
        mistakeString += " "
      }
    }
    
    console.log(mistakeString)
    const mistakeArray = mistakeString.split(/\s+/);
    console.log(mistakeArray)
    console.log(storyWords)
    if (areArraysEqual(mistakeArray, storyWords)) {
      mistakeString = ""
      correctBool = true;
    }
    return [mistakeString, correctBool]
  }
}

export default checkMistakes