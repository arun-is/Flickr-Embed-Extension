var sizes = {
    c: "Medium 800",
    h: "Large 1600"
}

var html = document.querySelector('[name= SharingEmbedMarkup]').value;
var oldEmbedUrl = html.match(/src="(.*?)"/)[1];
var oldWidth = parseInt(html.match(/width="(.*?)"/)[1]);
var oldHeight = parseInt(html.match(/height="(.*?)"/)[1]);
var size = oldWidth > oldHeight ? "c" : "h";
var sizeString = sizes[size];
// /<ol class="sizes-list">[\s\S]*Large 1600[\t\n]*<small>\((.*?)\)<\/small>/
var regex = "<ol class=\"sizes-list\">[\\s\\S]*SIZE[\\t\\n]*<small>\\((.*?)\\)<\/small>";
regex = regex.replace('SIZE', sizeString);
regex = new RegExp(regex);


var x = new XMLHttpRequest()
var url = document.URL.match(/.*flickr.com\/photos\/[a-zA-Z0-9_]*\/[0-9]*/)[0] + '/sizes/' + size;

x.open('GET', url, true);

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

x.onreadystatechange = function () {
    if (x.readyState == 4 && x.status == 200) {
        var newEmbedURl = x.responseText.match(/<div id="allsizes-photo">([\s\S]*?)<\/div>/)[1].match(/"(.*?)"/)[1];
        var newWidthHeight = x.responseText.match(regex)[1].split(' x ');
        var newWidth = newWidthHeight[0];
        var newHeight = newWidthHeight[1];
        
        newHeight = Math.round(parseInt(newHeight) * 800 / parseInt(newWidth));
        newWidth = 800;  
        var embedCode = html.replace(oldEmbedUrl, newEmbedURl);
        embedCode = embedCode.replace('width="' + oldWidth + '"', 'width="' + newWidth + '"').replace('height="' + oldHeight + '"', 'height="' + newHeight + '"');
        copyToClipboard(embedCode);
    }
}

x.send();

