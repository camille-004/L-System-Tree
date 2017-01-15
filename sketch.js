var angle = 0;
var axiom = "F";
var sentence = axiom;
var len = 115; 
var rules = [];

var str1 = "-F+F+F";
var str2 = "F-FF-F";

var newstr1 = str1.split('').sort(function() { 
    return 0.1 - Math.random()
    }).join('');

var newstr2 = str2.split('').sort(function() { 
    return 0.1 - Math.random()
    }).join('');

rules[0] = {
  a: "F",
  b: "FF+[" + newstr2 + "]-[" + newstr1 + "]"
}

function generate() {
  len *= 0.5;
  var nextSentence = "";
  
  for (var i = 0; i < sentence.length; i++) {  
    var current = sentence.charAt(i);
    var found = false;
    
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) { 
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  background(177, 224, 172);
  translate(width / 2, height);
  stroke(66, 102, 62, 100);
  strokeWeight(2);
  
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  canvas = createCanvas(500, 500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2 + 20;
  canvas.position(x, y);
  
  angle = radians(25);
  background(255, 151, 66);
  turtle();
  
  var button = createButton("Generate Tree");
  button.mousePressed(generate);
  button.position(x + width - 110, y + (height - 30));
}