document.addEventListener('DOMContentLoaded',()=>{
    //Catching all thhe required datas
    const inputtext = document.getElementById("input_text");
    const inputbtn = document.getElementById("input_btn");
    const todolist = document.getElementById("list_items");

    //creating array for storing data
    let task_array =JSON.parse(localStorage.getItem("Tasks")) || [];

    //This loop render all the save data to show in the dom
    task_array.forEach((i)=>render_save_task(i));

    //Handeling the click event in 'Add Task' button... 
    inputbtn.addEventListener("click", () => {
        //if nothing is written or space is used as text.. 
        if (inputtext.value.trim() == "") {
            alert("Enter any text");
            return;
        }

        let new_task = {
            id: Date.now(),
            Text: inputtext.value,
            is_complete: false,
        };

        task_array.push(new_task);
        save_task();
        render_save_task(new_task);
        inputtext.value = ""; //clears the text
    });


    function render_save_task(task) {
        
        const li = document.createElement("li");
        li.setAttribute("data", "task.id");
        if(task.is_complete) li.classList.add("completed");
        li.innerHTML = `
            <span>${task.Text}</span>
            <button>×</button>`;
    
        // Handels the completed marking part....
        li.addEventListener('click',(e)=>{
            if(e.target.tagName === "BUTTON") return;
            task.is_complete = !task.is_complete;
            li.classList.toggle("completed");
            save_task();
        })

        // Handles the deleting part....
        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation();
            task_array = task_array.filter((t)=>t.id != task.id);
            li.remove();
            save_task();
        })

        todolist.appendChild(li);
    }

    function save_task() {
      localStorage.setItem("Tasks", JSON.stringify(task_array));
    }
})