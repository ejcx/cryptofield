var CryptoField = {
  getDataFromField: function(field, prop) {
    var classList = field.className.split(" ");
    for (var i=0; i<classList.length; i++) {
      if (classList[i].startsWith(prop)) {
        var sizeVar = classList[i];
        var sizeInt  = sizeVar.replace(prop, "");
        var s = parseInt(sizeInt);
        if (!isNaN(s)) {
          return s;
        }
      }
    }
    return false;
  },
  getFieldSizeFromDOM: function(field) {
    // lets role with a default size of 256
    if (!field.className)
      return 256;
    if (size = this.getDataFromField(field, "size")){
      return size;
    }
    return 256;
  },
  start: function() {
    var fields = document.getElementsByClassName("cryptofield");
    for (var fieldIdx=0; fieldIdx<fields.length; fieldIdx++) {
      var size = this.getFieldSizeFromDOM(fields[fieldIdx]);
      var field = fields[fieldIdx];
      var ctx = field.getContext("2d");
      ctx.fillStyle = "black";
      field.width = size;
      field.height = size;
    }
  },

  push: function(field, randInt, evaluator) {
    var fieldIdx = this.getDataFromField(field, "fieldIdx");
    var colIdx = this.getDataFromField(field, "colIdx");
    var rowIdx = this.getDataFromField(field, "rowIdx");
    var size   = this.getDataFromField(field, "size");
    var filled = 0;

    var pixStatus = evaluator(randInt);
    if (pixStatus) {
      filled++;
      this.pushBit(field, fieldIdx, rowIdx, colIdx, pixStatus);
    }

    if (colIdx+1 >= size) {
      rowIdx++;
      colIdx=0;
    } else {
      colIdx++;
    }

    field.className = "cryptofield rowIdx"+rowIdx + " colIdx"+colIdx + " size"+size + " fieldIdx"+fieldIdx;
    return filled;
  },

  pushBit: function(field, fieldIdx, colIdx, rowIdx, randBit) {
    if (randBit) {
      var ctx = field.getContext("2d");
      ctx.fillRect( rowIdx, colIdx, 1, 1 );
    }
  },

  pushArr: function(field, arr, evaluator) {
    var filledCount = 0;
    for (var i=0;i<arr.length;i++) {
      filledCount += this.push(field, arr[i], evaluator);
    }
    return filledCount;
  }
}
