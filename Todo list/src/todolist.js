const container = document.querySelector(".container");

//sidebar elements
const sidebarContainer = document.querySelector("aside");
const progressbar = document.querySelector(".progressbar");
const stats = [...document.querySelectorAll(".stats span")];
const timeSelectors = document.querySelector(".timeSelectorContainer");
const hamburgerBtn = document.querySelector(".menuBtn");

//main elements
const themeToggler = document.querySelector(".theme-toggler");
const todolistTitle = document.querySelector(".todolistTitle");
const todosContainer = document.querySelector(".todoItemContainer");
const todoAddButton = document.querySelector(".todolistBtn");

//addTodo window elements
const addTodoContainer = document.querySelector(".addTodoItemContainer");
const closeAddTodoWindowBtn = document.querySelector(".closeWindow");
const addTodoInputs = document.querySelector(".addTodoInputs");

class Todolist {
  #todos;
  #TODAY;
  #FUTURE;
  #CURRENTTL;
  constructor() {
    this.#init();
  }

  #init() {
    this.#OLD = "Old";
    this.#TODAY = "Today";
    this.#FUTURE = "Future";

    //fetch and use data from localStorage 
    const {curr, todos} = this.#getData();
    this.#CURRENTTL = curr;
    this.#todos = todos;

    this.#setActiveTimeSelector(this.#CURRENTTL);
    this.#updateMainUI(this.#CURRENTTL, this.#filterByDate(this.#CURRENTTL));
    this.#setEvents();
  }

  #setEvents() {
    //theme toggler event
    themeToggler.addEventListener("click", this.#toggleTheme);

    //sidebar buttons
    timeSelectors.addEventListener("click", this.#sidebarNavigation.bind(this));

    //open sidebar
    hamburgerBtn.addEventListener("click", this.#toggleSidebar);

    //addbtn
    todoAddButton.addEventListener("click", () => {
      addTodoContainer.classList.add("showAddTodo");
    });

    //close addTodo
    closeAddTodoWindowBtn.addEventListener("click", () => {
      addTodoContainer.classList.remove("showAddTodo");
    });

    //add todo
    addTodoInputs.addEventListener("click", ({ target }) => {
      if (target.tagName === "BUTTON") {
        const select = addTodoInputs.children[0].children[1];
        const textbox = addTodoInputs.children[1].children[1];
        this.#addTodo(select.value, textbox.value);
        addTodoContainer.classList.remove("showAddTodo");
        textbox.value = "";
      }
    });

    //todo events
    todosContainer.addEventListener("change", ({ target }) => {
      this.#checkTodo(target);
      this.#setStats();
    });
  }

  #setActiveTimeSelector(title){
    for(let i = 0; i < timeSelectors.children.length; i++){
      if(timeSelectors.children[i].textContent === title){
        timeSelectors.children[i].classList.add("active");
      }else {
        timeSelectors.children[i].classList.remove("active");
      }
    
    }
  }

  #setStats() {
    const completed = this.#todos.filter(
      (todo) => todo.completed === true
    ).length;
    const inComplete = this.#todos.length - completed;
    const progress = (completed / this.#todos.length) * 100;
    stats[0].textContent = completed;
    stats[1].textContent = inComplete;

    progressbar.style.width = `${progress}%`;
  }

  #toggleSidebar() {
    if (!sidebarContainer.classList.contains("hideSidebar")) {
      sidebarContainer.classList.add("sidebarDisappear");
      setTimeout(() => {
        sidebarContainer.classList.toggle("hideSidebar");
        sidebarContainer.classList.remove("sidebarDisappear");
      }, 500);
    } else {
      sidebarContainer.classList.toggle("hideSidebar");
    }

    hamburgerBtn.classList.toggle("closeMenuBtn");
  }

  #sidebarNavigation({target}) {
    if (target.tagName === "BUTTON") {
        this.#updateMainUI(target.innerHTML);

        //set active button
        for (let i = 0; i < timeSelectors.children.length; i++) {
          timeSelectors.children[i].classList.remove("active");
        }
        target.classList.add("active");
        this.#CURRENTTL = target.textContent;

        if(innerWidth < 760){
            this.#toggleSidebar();
        }
        
        this.#saveData();
      }
  }

  #checkTodo(target){
    if (target.tagName === "INPUT") {
        const label = target.parentNode;
        const checkbox = label.children[0];
        const itemId = label.parentNode.dataset.id;

        if (checkbox.checked) {
          label.classList.add("checked");
        } else {
          label.classList.remove("checked");
        }
        this.#todos[itemId].completed = checkbox.checked;

        this.#saveData();
      }
  }

  #toggleTheme() {
    container.classList.toggle("dark");
  }

  #addTodo(date, title) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.#todos.push({
      id: this.#todos.length,
      title,
      createdOn: date === "0" ? new Date() : tomorrow,
      completed: false,
    });

    this.#saveData();
    this.#updateMainUI(date === "0" ? this.#TODAY : this.#FUTURE);
  }

  #filterByDate(date) {
    return this.#todos.filter((todo) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todoDate = new Date(todo.createdOn);
      todoDate.setHours(0, 0, 0, 0);

      if (date === this.#TODAY) {
        return Number(todoDate) == Number(today);
      } else if (date === this.#FUTURE) {
        return todoDate > today;
      } else {
        return todoDate < today;
      }
    });
  }

  #todoUI(item) {
    return `<div class="todoItem" data-id=${item.id}>
                    <label ${item.completed ? "class='checked'": ""}}> 
                        <input type="checkbox" ${item.completed ? "checked='true'": ""}>
                        <span class="checkbox"></span>
                        ${item.title}
                    </label>
                </div>`;
  }

  #updateMainUI(title) {
    const currentTodos = this.#filterByDate(title);
    todolistTitle.textContent = title;
    //update stats
    this.#setStats();

    todosContainer.innerHTML = "<h4>Nothing to show</h4>"
    if(currentTodos.length === 0) return;

    todosContainer.innerHTML = "";
    currentTodos.forEach((todo) => {
      todosContainer.innerHTML += this.#todoUI(todo);
    });

  }

  #saveData(){
      localStorage.setItem("todos", JSON.stringify({curr: this.#CURRENTTL, todos: this.#todos}));
  }

  #getData(){
      const data = JSON.parse(localStorage.getItem("todos"));
      return data !== null? data : {curr: this.#TODAY, todos: []}; 
  }
}

export default Todolist;
