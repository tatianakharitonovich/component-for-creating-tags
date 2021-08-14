const input = document.body.querySelector('input'),
  button = document.body.querySelector('button'),
  blockTags = document.body.querySelector('.blockTags'),
  checkbox = document.getElementById('checkbox'),
  tagsAddList = [];

class Tags {
  constructor(list) {
     this.list = list;
  }
  
  getListAdd () {
   console.log(tagsAddList);
  }

  setTagsList () {
    const listTags = document.body.querySelectorAll('p');
    const list = [];
    listTags.forEach(item => list.push(item.innerHTML));
    this.list = [...list];
    console.log(this.list);
  }

  addTag (name) {
    if (!name) {
      return
    }

    tagsAddList.splice(0, tagsAddList.length);
    tagsAddList.push(name);

    addTag (name);
  }

  removeTag (name) {
    const listTags = document.body.querySelectorAll('p');
    const listDivTags = document.body.querySelectorAll('.blockTags__tag');
    
    if (listTags.length === 0) {
      return
    }

    listTags.forEach((item, index) => {
      if (item.innerHTML === name) {
        listDivTags[index].remove()
      }
    });
  }
  
  setLocalStorage () {
    localStorage.setItem('Tags list', this.list);
  }
  
  getLocalStorage () {
    const myLocalStorage = localStorage.getItem('Tags list');
    console.log(myLocalStorage);
  }
  
  readonlyModeChange () {
    readonlyModeChange();
    checkbox.checked = !checkbox.checked;
  }
}

const tags = new Tags([]);

button.onclick = addTags;

checkbox.onclick = readonlyModeChange;

function readonlyModeChange () {
  const buttons = document.body.querySelectorAll('button');
  buttons.forEach(button=> button.disabled =  !button.disabled);
}

function addTags () {
  if (input.value === '') {
    return
  };

	tagsAddList.splice(0, tagsAddList.length);
  const tags = input.value.trim().split(' ');
  const tagsFilter = tags.filter(tag => tag !=='');
  
  tagsAddList.push(...tagsFilter);
  input.value = '';
       
  tagsAddList.forEach(tag => addTag (tag));
  
}

function addTag (tag) {
  const tagDiv = document.createElement('div'),
      tagP = document.createElement('p'),
      tagButton = document.createElement('button');

  tagDiv.classList.add('blockTags__tag');
  tagP.classList.add('blockTags__tagname');
  tagButton.classList.add('blockTags__button');
  tagP.innerHTML = tag;
  tagButton.innerHTML = 'x';
  blockTags.append(tagDiv);
  tagDiv.append(tagP);
  tagP.after(tagButton);
  tagButton.onclick = remove;
    
  function remove () {
    tagDiv.remove();
  }
}