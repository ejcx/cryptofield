#cryptofield
cryptofield is a zero dependency library for pushing and visualizing data on an html5 canvas.

##Creating a field.
Remember to include cryptofield.js in your webpage.
```
<script src="cryptofield.js"></script>
```
Next, create a cryptofield div.
```
<div id="yourcryptofield" class='cryptofield'></div>
```
You can manually set the size by adding a size directive to the classname. This will create an image that is 64x64 pixels.
```
<div id="yourcryptofield" class='cryptofield size64'></div>
```

##Filling in the field.
Lets say you have a lot of numbers that you want to push to the array. You can use the pushArr method and have your values automatically displayed in your image. The third parameter to push and pushArr is a function. This function is used to evaluate which items in the array should show up as a black pixel. The function will be passed each value of the passed array.
```
el = document.getElementById("yourcryptofield");

// Generate a bunch of random bytes.
var arr= new Uint8Array(num);
window.crypto.getRandomValues(arr)

CryptoField.pushArr(el, arr, function(n){
  return n > 127;
});
```
