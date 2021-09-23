function openFile() {
  document.getElementById('loadFile').click();
}

function loadFile(event) {
  var file = event.target.files[0];
  if (false == file) {
    return;
  }

  var fileReader = new FileReader();
  fileReader.onload = onLoad; // callback 세팅
  fileReader.readAsBinaryString(file); // 바이너리로 데이터를 읽고, 전송
}

function onLoad(event) {
  var result = event.target.result;
  var length = result.length;
  var hex = "";
  for (var i = 0; i < length; ++i) {

    //
    //   한 줄에 16 바이트씩 출력
    //

    if (i == 0) {
      hex += getFileOffset(i);
    }
    else if(0 == i % 16) {
      hex += "\n";
      hex += getFileOffset(i);
    }

    //
    //   데이터를 Hex로 변경
    //

    var byte = result.charCodeAt(i).toString(16);

    //
    //   Hex 문자열 길이가 2보다 적을 경우, 0을 추가
    //   ex) F => 0F
    //

    if(2 > byte.length) {
      byte = "0" + byte;
    }
    hex += (byte + " ");
  }

  document.getElementById('result').innerHTML = hex;
}

/**
 * 
 *
 * 
 */
function getFileOffset(offset)
{
  var result = "   ";
  for(var j = 0; j < 8 - offset.toString(10).length; ++j)
  {
    result += "0";
  }
  result += (offset.toString(10) + "   ");
  return result;
}


