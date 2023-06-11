const btn = document.getElementById('button_form');
const form = document.getElementById('form_toggle');
const modal = document.getElementById('modal_form');
const todo = document.getElementById('todo');
const done = document.getElementById('done'); 
let condition = ''; 
openForm = () => {
  form.style.visibility = 'visible' ; 
  modal.style.display = 'flex';
  form.reset(); 
};
btn.addEventListener('click', openForm);


const getdayMonthYearFromDate = (date) => {
  let [day, monthName, year] = date.split('/');
      day = day.trim();
      monthName = monthName.trim();
      year = year.trim();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      month = (monthNames.indexOf(monthName) + 1).toString()
  timeFormat = year + '-' + '0' * (2 - month.length) + month + '-' + day;
  return timeFormat; 
}
// submit and get the value

const submit = document.getElementById('submit');
returnPage = () => {
  form.style.visibility = 'hidden';
  modal.style.display = 'none';
};
let pos = 1; 

const toggleDisabledFinandDel = (position) => {
  const finish = document.querySelectorAll('#finish')[position];
  finish.disabled = true;
  console.log('fin');
  console.log(finish);
    
  const erase = document.querySelectorAll('#delete')[position];
  erase.disabled = true;

  console.log('erase');
  console.log(erase);

  finish.style.opacity = 0.40;
  erase.style.opacity = 0.40;
  finish.title = 'inactive button';
  erase.title = 'inactive button';
  console.log(finish.disabled);
  console.log(erase.disabled);

  const editButton = document.getElementById('edit');
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Save';
  editButton.textContent = ''; // Remove existing text content
  editButton.appendChild(paragraph);
  editButton.id = 'save';
  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    editButton.id = 'edit';
    editButton.className = 'editbutton';
    paragraph.textContent = 'Edit';
    finish.disabled = false;
    erase.disabled = false;
    finish.style.opacity = 1.0;
    erase.style.opacity = 1.0;
    finish.title = 'active button';
    erase.title = 'active button';
  })
}
createTextContentOnMoveBack = () => {

}

getValue = (event) => {
  event.preventDefault();
  console.log(event); 
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const duration = document.getElementById('duration').value;
  if (name.trim() === '' || date.trim() === '' || time.trim() === '' || duration.trim() === '') {
    alert('Invalid input. Please fill in all fields.');
    return;
  }
  const [year, month, day] = date.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // let idFinish = 'finish' + pos; 
  // let idDelete = 'delete' + pos; 
  // let idEdit = 'edit' + pos;
  const listTodo = document.createElement('li');
  listTodo.innerHTML = `<div id="todolist">
    <h3>Activity name: </h3>
    <p>${name}</p>
    <h3>date: </h3>
    <p>${day}/${monthNames[month - 1]}/${year}</p>
    <h3>duration: </h3>
    <p>${duration} minutes starting at ${time}</p>
    <button id='finish' class = 'finishbutton' title = 'active button'>
      <p>Finish</p>
    </button>
    <button id='delete' class = 'deletebutton' title = 'active button'>
      <p>Delete</p>
    </button>
    <button id='edit' class = 'editbutton' title = 'active button'> 
      <p>Edit</p>
    </button>
  </div>`;
  
  pos++; 
  console.log(pos); 
  todo.appendChild(listTodo);
  form.reset();
  returnPage();
  
};
submit.addEventListener('click', getValue); 
const cancel = document.getElementById('cancel');
cancel.addEventListener('click', event => {
  event.preventDefault();
  returnPage(); 
})


const reduceFunctionDOMDeleteandFinish = (event, wordFillId, wordtypeOperate) => {
  event.preventDefault(); 
  document.getElementById('modal_' + wordFillId).style.display = 'flex'; 
  document.getElementById(wordtypeOperate + ' confirm').style.visibility = 'visible'; 
}


const modal_complete_confirm = document.getElementById('modal_finish'); 
const confirmPage = document.getElementById('complete confirm'); 

const modal_delete_confirm= document.getElementById('modal_delete'); 
const confirmtoDelete = document.getElementById('delete confirm'); 

const backPage = () => {
  modal_complete_confirm.style.display = 'none'; 
  confirmPage.style.visibility = 'hidden'; 
} 

const movebackPage = () => {
  modal_delete_confirm.style.display = 'none'; 
  confirmtoDelete.style.visibility = 'hidden'; 
}

todo.addEventListener('click', (event) => {
  if (event.target.classList.contains('finishbutton')) {
    reduceFunctionDOMDeleteandFinish(event, 'finish', 'complete');
    const tomoveDoneItem = event.target.closest('li');
    const todoList = document.getElementById('todo');
    const doneList = document.getElementById('done');

    console.log(tomoveDoneItem);
    //confirm yes --> move todone element
    // confirm no --> return page 
    const confirmeYes = document.getElementById('confirmyestoComplete');
    const confirmNo = document.getElementById('confirmnotoComplete');
    window.onclick = function (event) {
      if (event.target == modal_complete_confirm) {
        modal_complete_confirm.style.display = "none";
        console.log('click window modal')
      }
    };
    // console.log(finish); 
    
    confirmeYes.addEventListener('click', (event) => {
      console.log(event);
      event.preventDefault();
      console.log('movetodone is here!');
      todoList.removeChild(tomoveDoneItem);
      doneList.appendChild(tomoveDoneItem);
      const doneLi = document.querySelector('li #todolist');
      doneLi.id = 'donelist';
      console.log('doneList');
      console.log(doneLi);
      const buttonFinish = document.querySelector('li #finish');
      buttonFinish.id = 'moveback'; 
      buttonFinish.className = 'moveback confirm';
      buttonFinish.innerHTML = '<p>Move back</p>';
      console.log(buttonFinish);
      backPage();
    })
    confirmNo.addEventListener('click', backPage)
    
  }
  
  if (event.target.classList.contains('deletebutton')) {
    reduceFunctionDOMDeleteandFinish(event, 'delete', 'delete');
    const confirmeYes = document.getElementById('confirmyestoDelete');
    const confirmNo = document.getElementById('confirmnotoDelete');
    window.onclick = function (event) {
      if (event.target == modal_delete_confirm) {
        modal_delete_confirm.style.display = "none";
        console.log('click window modal')
      }
    };
    const toDeleteItem = event.target.closest('li');
    removeElement = (event) => {
      event.preventDefault();
      todo.removeChild(toDeleteItem);
      movebackPage();
    }
    confirmeYes.addEventListener('click', removeElement);
    confirmNo.addEventListener('click', movebackPage);
  }


  if (event.target.classList.contains('editbutton')) {
    const todoItem = event.target.closest('li');
    const index = Array.prototype.indexOf.call(todoItem.parentElement.children, todoItem); 
    console.log('index'); 
    console.log(index); 
    if (todoItem.querySelector('p:nth-child(2)')) {
      // repeat 
      const inputName = document.createElement('input');
      inputName.type = 'text';
      inputName.id = 'nameupdate'; // repeat 
      inputName.value = todoItem.querySelector('p:nth-child(2)').textContent.trim();
      console.log(inputName.value);
      console.log(inputName);
      console.log('secondele');
      console.log(todoItem);
      const secondelement = todoItem.querySelector('p:nth-child(2)');
      console.log(secondelement);
      //// repeat
      if (secondelement) {
        todoItem.querySelector('#todolist').insertBefore(inputName, secondelement);
        todoItem.querySelector('#todolist').removeChild(secondelement);
      }
    }
    ///

    if (todoItem.querySelector('p:nth-child(4)')) {
      const inputName = document.createElement('input');
      inputName.type = 'date';
      inputName.id = 'dateupdate';
      const date = todoItem.querySelector('p:nth-child(4)').textContent.trim();
      const fourthelement = todoItem.querySelector('p:nth-child(4)'); // refactor with getValue get month day and year
      const timeFormat = getdayMonthYearFromDate(date);
      inputName.value = timeFormat;
      if (fourthelement) {
        todoItem.querySelector('#todolist').insertBefore(inputName, fourthelement);
        todoItem.querySelector('#todolist').removeChild(fourthelement);
      }
    }

    if (todoItem.querySelector('p:nth-child(6)')) {
      const sixthelement = todoItem.querySelector('p:nth-child(6)');
      const time = todoItem.querySelector('p:nth-child(6)').textContent.match(/\d{1,2}:\d{2}/)[0];
       
      const inputTime = document.createElement('input');
      inputTime.type = 'time';
      inputTime.id = 'timeupdate';
      inputTime.value = time;
      const timeWord = document.createElement('h3');
      timeWord.textContent = 'Time:';
      todoItem.querySelector('#todolist').insertBefore(timeWord, sixthelement);
      todoItem.querySelector('#todolist').insertBefore(inputTime, sixthelement);
      
      const duration = sixthelement.textContent.match(/\d+/)[0];
      const inputDuration = document.createElement('input');
      inputDuration.type = 'number';
      inputDuration.id = 'durationupdate';
      inputDuration.value = duration;
      const fifthElement = todoItem.querySelector('h3:nth-child(5)');
      console.log(duration);
      if (fifthElement) {
        fifthElement.insertAdjacentElement('afterend', inputDuration);
      }
      todoItem.querySelector('#todolist').removeChild(sixthelement);
    }

    toggleDisabledFinandDel(index);
  }
});


const moveBackBtn = document.getElementById('moveback');
const modal_moveback_confirm = document.getElementById('modal_moveback'); 
const confirmtoMoveBack = document.getElementById('complete confirm'); 
const BackTopageAfterMoveBackClick = () => {
   modal_moveback_confirm.style.display = 'none'; 
  confirmtoMoveBack.style.visibility = 'hidden'; 
}
done.addEventListener('click', (event) => {
  const button = event.target;
  console.log('button'); 
  console.log(button); 
  const tomoveBack = event.target.closest('li'); 
  console.log('tomoveback'); 
  console.log(tomoveBack); 
  if (button.textContent === 'Move back') {
    button.addEventListener('click', (event) => {
      event.preventDefault(); 
      modal_moveback_confirm.style.display = 'flex'; 
      confirmtoMoveBack.style.visibility = 'visible'; 
      const doneItem = event.target.closest('li');
      const confirmeYes = document.getElementById('confirmyestoMoveBack');
      const confirmNo = document.getElementById('confirmnotoMoveBack');
      window.onclick = function (event) {
      if (event.target == modal_moveback_confirm) {
        modal_moveback_confirm.style.display = "none";
        console.log('click window modal')
      }
      };
      
      // problem is there !!!!!!!!!!
      confirmeYes.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(tomoveBack);
        console.log(tomoveBack);
        if (doneItem) {
          const index = Array.prototype.indexOf.call(doneItem.parentElement.children, doneItem);
          console.log('index');
          console.log(index);
          const todoList = document.getElementById('todo');
          const doneList = document.getElementById('done');
          const buttonMove = document.querySelectorAll('li #moveback')[index];
          console.log('btn move back');
          console.log(buttonMove);
          buttonMove.id = 'finish';
          buttonMove.className = 'finishbutton';
          buttonMove.innerHTML = '<p>Finish</p>';
          console.log('after');
          console.log(buttonMove);
          const todolistagain = document.querySelectorAll('li div')[index];
          console.log('todoagain');
          console.log(todolistagain);
          todolistagain.id = 'todolist';
          const createElement = document.createElement('li');
          createElement.appendChild(todolistagain)
          doneList.removeChild(tomoveBack);
          todoList.appendChild(createElement);
          BackTopageAfterMoveBackClick();
        }
      })
      confirmNo.addEventListener('click', BackTopageAfterMoveBackClick); 
    })
  }
  if (button.textContent === 'Delete') {
    const erase = document.getElementById('delete');
    erase.addEventListener('click', (event) => {
      event.preventDefault();
      reduceFunctionDOMDeleteandFinish(event, 'delete', 'delete');
      const confirmeYes = document.getElementById('confirmyestoDelete');
      const confirmNo = document.getElementById('confirmnotoDelete');
      window.onclick = function (event) {
        if (event.target == modal_delete_confirm) {
          modal_delete_confirm.style.display = "none";
          console.log('click window modal')
        }
      };
      const toDeleteItem = event.target.closest('li');
      removeElement = (event) => {
        event.preventDefault();
        todo.removeChild(toDeleteItem);
        movebackPage();
      }
      confirmeYes.addEventListener('click', removeElement);
      confirmNo.addEventListener('click', movebackPage);
    }
    )
  }
}); 






// const moveback = (event) => {
//   const button = event.target;
//   const doneItem = button.parentElement;
//   const listItem = document.createElement('li');
//   listItem.innerHTML = doneItem.textContent
//     .replace('move back', '')
//     .replace('scheduled on', '<br>scheduled on')
//     .replace('at a time', '<br>at a time') + '<br>';
//   listItem.style.listStyleType = 'none';
//   listItem.style.fontSize = '16px';
//   ultodo.appendChild(listItem);
//   uldone.removeChild(doneItem);

//   const finish = document.createElement('button');
//   finish.className = 'fin';
//   finish.textContent = 'finish';

//   const del = document.createElement('button');
//   del.className = 'del';
//   del.textContent = 'delete';

//   listItem.appendChild(finish);
//   listItem.appendChild(del);

//   ultodo.appendChild(todolist);
  
// }



// uldone.addEventListener('click', (event) => {
//   if (event.target.classList.contains('move_back')) {
//     moveback(event);
//     console.log(scheduleList);
//   }
// });
const searchBtn = document.getElementById('search');
console.log(searchBtn); 
const searchInput = document.getElementById('searchbox');
console.log(searchInput); 
const togglesearchText = () => {
  if (searchInput.style.visibility === 'hidden') {
    searchInput.style.visibility = 'visible';
  } else {
    searchInput.style.visibility = 'hidden';
  }
};

searchBtn.addEventListener('click', togglesearchText); 

const toDoItems = document.getElementById('todo').getElementsByTagName('li');
const doneItems = document.getElementById('done').getElementsByTagName('li');
const searchLists = () => {
  const searchText = searchInput.value;
  console.log(searchText); 
  for (let i = 0; i < toDoItems.length; i++) {
    const currentItem = toDoItems[i];
    console.log(currentItem); 
    const nameActivity = currentItem.querySelector('p:nth-child(2)'); 
    console.log('name');
    console.log(nameActivity); 
    if (nameActivity.textContent.toLowerCase().includes(searchText)) {
      currentItem.style.display= 'block';
    } else {
       currentItem.style.display = 'none';
    }
  }

  for (let i = 0; i < doneItems.length; i++) {
    const currentItem = doneItems[i];
    console.log(currentItem.textContent); 
    if (currentItem.textContent.toLowerCase().includes(searchText)) {
       currentItem.style.display= 'block';
    } else {
      currentItem.style.display= 'none';
    }
  }
};

searchInput.addEventListener('input', searchLists);





