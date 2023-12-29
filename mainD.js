'use strict';

{
  // const reagentDs = [
  //   {
  //     english: 'Acetone', 
  //     isCompleted: false,
  //     japanese: 'アセトン',
  //     company: 'Wako',
  //     quantity: '3 L',
  //     bottle: '2',
  //     date: '2019以前',
  //     storage: 'D2',
  //     register: '有馬',
  //   },
  //   {
  //     english: 'Acetone', 
  //     isCompleted: true,
  //     japanese: 'アセトン',
  //     company: 'Wako',
  //     quantity: '3 L',
  //     bottle: '2',
  //     date: '2019以前',
  //     storage: 'D2',
  //     register: '有馬',
  //   },
  //   {
  //     english: 'Acetyl Coenzyme A, sodium Salt', 
  //     isCompleted: false,
  //     japanese: 'アセチルコエンザイムAナトリウム塩',
  //     company: 'Sigma',
  //     quantity: '25 mg',
  //     bottle: '1',
  //     date: '2012.0928',
  //     storage: 'F2',
  //     register: '有馬',
  //   },
  //   {
  //     english: 'β-Alanine benzyl ester p-toluenesulfonate salt', 
  //     isCompleted: false,
  //     japanese: 'β-アラニンベンジルエステル　p-トルエンスルホン酸塩',
  //     company: 'Sigma',
  //     quantity: '5 g',
  //     bottle: '1',
  //     date: '2019以前',
  //     storage: 'F2',
  //     register: '有馬',
  //   },
  // ];

  let reagentDs;
  if (localStorage.getItem('reagentDs') === null) {
    reagentDs = [];
  } else {
    reagentDs = JSON.parse(localStorage.getItem('reagentDs'));
  }

  const savereagentDs = () => {
    localStorage.setItem('reagentDs', JSON.stringify(reagentDs));
  };

  const renderreagentD = (reagentD) => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = reagentD.isCompleted;
    input.addEventListener('change', () => {
      reagentDs.forEach((item) => {
        if (item.id === reagentD.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      savereagentDs();
    });
    const span = document.createElement('span');
    span.textContent = reagentD.english;
    const button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', () => {
      if (confirm('削除しますか？') === false) {
        return;
      }
      tr.remove();
      reagentDs = reagentDs.filter((item) => {
        return item.id !== reagentD.id;
      });
      savereagentDs();
    });
    const englishTd = document.createElement('td');
    englishTd.className = 'english';
    englishTd.appendChild(input);
    englishTd.appendChild(span);
    englishTd.appendChild(button);
    const japaneseTd = document.createElement('td');
    japaneseTd.className = 'japanese';
    japaneseTd.textContent = reagentD.japanese;
    const companyTd = document.createElement('td');
    companyTd.className = 'company';
    companyTd.textContent = reagentD.company;
    const quantityTd = document.createElement('td');
    quantityTd.className = 'quantity';
    quantityTd.textContent = reagentD.quantity;
    const bottleTd = document.createElement('td');
    bottleTd.className = 'number';
    bottleTd.textContent = reagentD.bottle;
    const dateTd = document.createElement('td');
    dateTd.className = 'date';
    dateTd.textContent = reagentD.date;
    const storageTd = document.createElement('td');
    storageTd.className = 'storage';
    storageTd.textContent = reagentD.storage;
    const registerTd = document.createElement('td');
    registerTd.className = 'registered';
    registerTd.textContent = reagentD.register;
    const tr = document.createElement('tr');
    tr.appendChild(englishTd);
    tr.appendChild(japaneseTd);
    tr.appendChild(companyTd);
    tr.appendChild(quantityTd);
    tr.appendChild(bottleTd);
    tr.appendChild(dateTd);
    tr.appendChild(storageTd);
    tr.appendChild(registerTd);
    document.querySelector('#reagentDs').appendChild(tr);
  }

  const renderreagentDs = () => {
    reagentDs.forEach((reagentD) => {
      renderreagentD(reagentD);
    });
  };

  document.querySelector('#add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const reagentD = {
      id: Date.now(),
      english: document.querySelector('#add-form #eng').value,
      isCompleted: false,
      japanese: document.querySelector('#add-form #jap').value,
      company: document.querySelector('#add-form #com').value,
      quantity: document.querySelector('#add-form #qlt').value,
      bottle: document.querySelector('#add-form #num').value,
      date: document.querySelector('#add-form #dat').value,
      storage: document.querySelector('#add-form #str').value,
      register: document.querySelector('#add-form #reg').value,
    };
    renderreagentD(reagentD);
    reagentDs.push(reagentD);
    console.table(reagentDs);
    savereagentDs();
    document.querySelector('#add-form #eng').value = '';
    document.querySelector('#add-form #eng').focus();
    document.querySelector('#add-form #jap').value = '';
    document.querySelector('#add-form #com').value = '';
    document.querySelector('#add-form #qlt').value = '';
    document.querySelector('#add-form #num').value = '';
    document.querySelector('#add-form #dat').value = '';
    document.querySelector('#add-form #str').value = '';
    document.querySelector('#add-form #reg').value = '';
  });

  window.addEventListener('load', function () {
	  let column_no = 0; //今回クリックされた列番号
	  let column_no_prev = 0; //前回クリックされた列番号
	  document.querySelectorAll('#reagentDs th').forEach(elm => {
		  elm.onclick = function () {
			  column_no = this.cellIndex; //クリックされた列番号
			  let table = this.parentNode.parentNode.parentNode;
			  let sortType = 0; //0:数値 1:文字
			  let sortArray = new Array; //クリックした列のデータを全て格納する配列
			  for (let r = 1; r < table.rows.length; r++) {
			  	//行番号と値を配列に格納
			  	let column = new Object;
			  	column.row = table.rows[r];
			  	column.value = table.rows[r].cells[column_no].textContent;
			  	sortArray.push(column);
			  	//数値判定
			  	if (isNaN(Number(column.value))) {
			  		sortType = 1; //値が数値変換できなかった場合は文字列ソート
				  }
			  }
			  if (sortType == 0) { //数値ソート
			  	if (column_no_prev == column_no) { //同じ列が2回クリックされた場合は降順ソート
			  		sortArray.sort(compareNumberDesc);
			  	} else {
			  		sortArray.sort(compareNumber);
			  	}
			  } else { //文字列ソート
			  	if (column_no_prev == column_no) { //同じ列が2回クリックされた場合は降順ソート
			  		sortArray.sort(compareStringDesc);
			  	} else {
			  		sortArray.sort(compareString);
			  	}
		  	}
		  	//ソート後のTRオブジェクトを順番にtbodyへ追加（移動）
		  	let tbody = this.parentNode.parentNode;
		  	for (let i = 0; i < sortArray.length; i++) {
	  			tbody.appendChild(sortArray[i].row);
		  	}
		  	//昇順／降順ソート切り替えのために列番号を保存
		  	if (column_no_prev == column_no) {
		  		column_no_prev = -1; //降順ソート
		  	} else {
		  		column_no_prev = column_no;
		  	}
	  	};
  	});
  });
  //数値ソート（昇順）
  function compareNumber(a, b)
  {
  	return a.value - b.value;
  }
  //数値ソート（降順）
  function compareNumberDesc(a, b)
  {
	  return b.value - a.value;
  } 
  //文字列ソート（昇順）
  function compareString(a, b) {
  	if (a.value < b.value) {
  		return -1;
	  } else {
  		return 1;
  	}
  	return 0;
  }
  //文字列ソート（降順）
  function compareStringDesc(a, b) {
  	if (a.value > b.value) {
  		return -1;
	  } else {
	  	return 1;
	  }
  	return 0;
  }







  document.querySelector('#purge').addEventListener('click', () => {
    if (confirm('削除しますか？') === false) {
      return;
    }
    reagentDs = reagentDs.filter((reagentD) => {
      return reagentD.isCompleted === false;
    });
    savereagentDs();
    document.querySelectorAll('#reagentDs tr').forEach((tr) => {
      tr.remove();
    });
    renderreagentDs();
  });

  renderreagentDs();
}