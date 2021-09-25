/*
 *
 *
 *
 */
function createTable() {
    var table = document.createElement('table');
	table.setAttribute('id', 'hexTable');
	table.setAttribute('class', 'resizable');
	
	var curRow = document.createElement('tr');
	var tableData = document.createElement('td');
	tableData.textContent = 'Offset(h)';
	curRow.appendChild(tableData);
	for(var colNum = 0; colNum < 16; ++colNum) {
		tableData = document.createElement('td');
		var hexNum = colNum.toString(16);
		if (2 > hexNum.length){
			hexNum = "0" + hexNum;
		}
		tableData.textContent = hexNum;
		curRow.appendChild(tableData);
	}
	table.appendChild(curRow);
	document.body.appendChild(table);		
}
createTable();
 
function dynamicTable() {
	var tables = document.getElementsByClassName('resizable');
	for (var i = 0; i < tables.length; i++) {
	  dynamicGrid(tables[i]);
	}	
}
dynamicTable();



/*
 *
 *
 *
 */
function createDiv(height) {
	var div = document.createElement('div');
	div.style.top = 0;
	div.style.right = 0;
	div.style.width = '5px';
	div.style.position = 'absolute';
	div.style.cursor = 'col-resize';
	div.style.userSelect = 'none';
	div.style.height = height + 'px';
	return div;
}

function getStyleVal(elm, css) {
	return (window.getComputedStyle(elm, null).getPropertyValue(css))
}

function paddingDiff(col) {
	if (getStyleVal(col, 'box-sizing') == 'border-box') {
		return 0;
	}
	
	var padLeft = getStyleVal(col, 'padding-left');
	var padRight = getStyleVal(col, 'padding-right');
	return (parseInt(padLeft) + parseInt(padRight));
}



/*
 *
 *
 *
 */
function dynamicGrid(table) {
  var row = table.getElementsByTagName('tr')[0];
  var cols;
  if(row) {
	  cols = row.children;
  }
  else {
	  cols = undefined;
  }
  
  if (!cols) {
	  return;
  }
  table.style.overflow = 'hidden';
  
  //
  //   테이블 요소 높이를 구함
  //

  var tableHeight = table.offsetHeight;
  for (var i = 0; i < cols.length; i++) {
	var div = createDiv(tableHeight);
	cols[i].appendChild(div);
	cols[i].style.position = 'relative';
	setListeners(div);
  }

  function setListeners(div) {
    var pageX, curCol, nxtCol, curColWidth, tableWidth;
	
	//
	//   마우스 다운 이벤트 발생에서 현재 테이블 값을 구함
	//
	
    div.addEventListener('mousedown', function(e) { 
		tableWidth = document.getElementById('hexTable').offsetWidth;
		curCol = e.target.parentElement;
		nxtCol = curCol.nextElementSibling;
		pageX = e.pageX;
		
		var padding = paddingDiff(curCol);
		curColWidth = curCol.offsetWidth - padding;
    });
	
	//
	//   마우스 이동 이벤트 발생에서 새로운 위치를 구하고, 업데이트
	//
	
    document.addEventListener('mousemove', function(e) {
		if (curCol) {
			var diffX = e.pageX - pageX;
			curCol.style.width = (curColWidth + diffX) + 'px'; 
			document.getElementById('hexTable').style.width = tableWidth + diffX + "px"
		}
    });
	
	//
	//   마우스 업 이벤트 발생시 객체 소멸, 업데이트 정지
	//

    document.addEventListener('mouseup', function(e) {
      curCol = undefined;
      nxtCol = undefined;
      pageX = undefined;
      curColWidth = undefined
    });
  }
};


