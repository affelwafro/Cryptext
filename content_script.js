browser.runtime.onMessage.addListener((message) => {
  let textarea = false;
  let start = 0;
  let end = 0;
  let sel = window.getSelection();
  var sel2 = removespaces(sel.toString()); // sel2 = sel without spaces, needed for all 'bin2', 'hex2' and 'oct2' conversions since they don't work with spaces in it
  var enc = sel.toString();
  if (document.activeElement) {
   let tagname = document.activeElement.tagName.toLowerCase();
   if (tagname == "textarea" || tagname == "input") {
     textarea = true;
   }
 }
  if(textarea) {
   let text = document.activeElement.value;
   start = document.activeElement.selectionStart;
   end = document.activeElement.selectionEnd;
   sel = text.substring (start, end);
   sel2 = removespaces(sel.toString()); // see above, sel2 = sel without spaces
   enc = sel.toString();
  }
  switch(message.command) {
    case "base64encode":
    enc = base64encode(sel.toString());
    break;
    case "base64decode":
    enc = base64decode(sel.toString());
    break;
    case "disemvowel":
    enc = disemowel(sel.toString());
    break;
    case "entityEncode":
    enc = entityEncode(sel.toString());
    break;
    case "entityDecode":
    enc = entityDecode(sel.toString());
    break;
    case "removeSpaces":
    enc = removespaces(sel.toString());
    break;
    case "reverse":
    enc = reverse(sel.toString());
    break;
    case "rot13":
    enc = rot13(sel.toString());
    break;
    case "timestampEncode":
    enc = timestampEncode(sel.toString());
    break;
    case "timestampDecode":
    enc = timestampDecode(sel.toString());
    break;
    case "urlEncode":
    enc = urlEncode(sel.toString());
    break;
    case "urlDecode":
    enc = urlDecode(sel.toString());
    break;
    case "txt2bin":
    enc = txt2bin(sel.toString());
    break;
    case "txt2hex":
    enc = txt2hex(sel.toString());
    break;
    case "bin2dec":
    enc = bin2dec(sel2.toString());
    break;
    case "bin2hex":
    enc = bin2hex(sel2.toString());
    break;
    case "bin2oct":
    enc = bin2oct(sel2.toString());
    break;
    case "bin2txt":
    enc = bin2txt(sel2.toString());
    break;
    case "dec2bin":
    enc = dec2bin(sel.toString());
    break;
    case "dec2hex":
    enc = dec2hex(sel.toString());
    break;
    case "dec2oct":
    enc = dec2oct(sel.toString());
    break;
    case "hex2bin":
    enc = hex2bin(sel2.toString());
    break;
    case "hex2dec":
    enc = hex2dec(sel2.toString());
    break;
    case "hex2oct":
    enc = hex2oct(sel2.toString());
    break;
    case "hex2txt":
    enc = hex2txt(sel2.toString());
    break;
    case "oct2bin":
    enc = oct2bin(sel.toString());
    break;
    case "oct2dec":
    enc = oct2dec(sel2.toString());
    break;
    case "hex2oct":
    enc = oct2hex(sel2.toString());
    break;
  }
  
  if (enc === sel || enc === sel2) { // just in case something can't be converted for example large binaries to decimal (if int limit exceeds) so the textbox/website content will not changed
	  ;
  }
  else if (textarea) {
    var prev = document.activeElement.value.substring(0, start);
    var next = document.activeElement.value.substring(end);
    var text = prev + enc + next;
    document.activeElement.value = text;
  }
  else {
  var range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(enc));
  }
});
