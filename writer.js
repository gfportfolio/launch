let openComment = false;
let endOfSentence = /[\.\?\!]\s$/;
let comma = /\D[\,]\s$/;
let endOfBlock = /[^\/]\n\n$/;
const commentRegex = /(\/\*(?:[^](?!\/\*))*\*)$/;
const keyRegex = /([a-zA-Z- ^\n]*)$/;
const valueRegex = /([^:]*)$/;
const selectorRegex = /(.*)$/;
const pxRegex = /\dp/;
const pxRegex2 = /p$/;
let styleBuffer = '';
const fullTextStorage = {};
function writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval){
//  if (animationSkipped) {
    // Lol who needs proper flow control
//    throw new Error('SKIP IT');
//  }
  // Write a character or multiple characters to the buffer.
  let chars = message.slice(index, index + charsPerInterval);
  index += charsPerInterval;

  // Ensure we stay scrolled to the bottom.
  el.scrollTop = el.scrollHeight;

  // If this is going to <style> it's more complex; otherwise, just write.
  if (mirrorToStyle) {
    writeChar(el, chars, style);
  } else {
    writeSimpleChar(el, chars);
  }

  // Schedule another write.
  if (index < message.length) {
    let thisInterval = interval;
    let thisSlice = message.slice(index - 2, index + 1);
    if (comma.test(thisSlice)) thisInterval = interval * 30;
    if (endOfBlock.test(thisSlice)) thisInterval = interval * 50;
    if (endOfSentence.test(thisSlice)) thisInterval = interval * 70;
setTimeout(function(){writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval);}, interval);


  //  return writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval);
  }
}



writeChar = function (el, char, style){
  // Grab text. We buffer it in storage so we don't have to read from the DOM every iteration.
  let fullText = fullTextStorage[el.id];
  if (!fullText) fullText = fullTextStorage[el.id] = el.innerHTML;

  fullText = handleChar(fullText, char);
  // But we still write to the DOM every iteration, which can be pretty slow.
  el.innerHTML = fullTextStorage[el.id] = fullText;

  // Buffer writes to the <style> element so we don't have to paint quite so much.
  styleBuffer += char;
  //if (char === ';') {
  //  style.textContent += styleBuffer;
  //  styleBuffer = '';
  //}
};

var instyle = false;


handleChar = function(fullText, char) {
  if (openComment && char !== '/') {
    // Short-circuit during a comment so we don't highlight inside it.
    fullText += char;
  //} else if (char === '/' && openComment === false) {
//    openComment = true;
  //  fullText += char;
//  } else if (char === '/' && fullText.slice(-1) === '*' && openComment === true) {
  //  openComment = false;
    // Unfortunately we can't just open a span and close it, because the browser will helpfully
    // 'fix' it for us, and we'll end up with a single-character span and an empty closing tag.
//    fullText = fullText.replace(commentRegex, '<span class="comment">$1/</span>');
//  } else if (char === ':') {
//    fullText = fullText.replace(keyRegex, '<span class="key">$1</span>:');
//  } else if (char === ';') {
//    fullText = fullText.replace(valueRegex, '<span class="value">$1</span>;');
//  } else if (char === '{') {
//    fullText = fullText.replace(selectorRegex, '<span class="selector">$1</span>{');
//  } else if (char === 'x' && pxRegex.test(fullText.slice(-2))) {
  //  fullText = fullText.replace(pxRegex2, '<span class="value px">px</span>');
  }else if (char=== '~' ){
    fullText+='<br>';
  }else if (char=== 'ῑ' ){
    fullText+="i id='icon1' class='material-icons'";
  }else if (char=== '~' ){
    fullText+='<br>';
  }else if (char=== '^' ){
    fullText+='';
    instyle =!instyle;
  } else {
    fullText += char;
  }
if(instyle && char!=='^' && char!=='~'){
  style.innerHTML += char;
}

  return fullText;
}

writeSimpleChar = function(el, char) {
  el.innerHTML += char;
};
