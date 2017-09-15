const limits = {
  x: { lower: 54, upper: 644 },
  y: { lower: 53, upper: 944 }
}

var image = document.getElementById('image');
var canvas = document.createElement('canvas');
var morseRows = [];
var y = limits.y.lower;

var resultAux = [];
var resultMorse = document.getElementById('resultMorse');
var resultText = document.getElementById('resultText');

canvas.width = image.width;
canvas.height = image.height;
canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);

while (y < limits.y.upper) {
  let x = limits.x.lower;
  let row = [];

  while (x < limits.x.upper) {
    row.push(getCode(x, y));
    x += 4;
  }

  morseRows.push(row.join(''));
  y += 3;
}


for (let row of morseRows) {
  let text = morjs.decode(row, {mode: 'simple'});
  resultAux.push(text);
}

resultMorse.value = morseRows.join('\n');
resultText.value = resultAux.join('\n');

function getCode(x, y) {
  let code = '';

  code += (canvas.getContext('2d').getImageData(x, y, 1, 1).data[0] == 255) ? ' ' : '.';
  code += (canvas.getContext('2d').getImageData(x + 1, y, 1, 1).data[0] == 255) ? ' ' : '.';
  code += (canvas.getContext('2d').getImageData(x + 2, y, 1, 1).data[0] == 255) ? ' ' : '.';

  switch (code) {
    case '   ': return ' ';
    case ' . ': return '.';
    case '...': return '-';
  }
}
