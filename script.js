

let ids = 1;

function updateCounters() {
    const todoCount = document.getElementById("todo-count");
    const doingCount = document.getElementById("doing-count");
    const doneCount = document.getElementById("done-count");

    todoCount.textContent = document.getElementById("list-container").childElementCount;
    doingCount.textContent = document.getElementById("list-container2").childElementCount;
    doneCount.textContent = document.getElementById("list-container3").childElementCount;
}

function myFunction(event) {
    event.preventDefault(); // Prevent form submission

    let newTask = document.createElement("div");
    newTask.id= ids ;
    newTask.classList.add("w-[100%]", "flex", "justify-center");
    let para = document.getElementById("in").value;
    let para2 = document.getElementById("in2").value;

    if (para === "" || para2 === "") {
        alert("Please fill in all fields!");
        return;
    }

    let para3 = document.getElementById("prioritys").value;
    let para4 = document.getElementById("colomns").value;
    let listContainer = document.getElementById("list-container");
    let listContainer2 = document.getElementById("list-container2");
    let listContainer3 = document.getElementById("list-container3");

    // Determine style and font based on priority
    let style, font;
    if (para3 === "p1") {
        style = "border-red-500";
        font = "text-red-500";


    } else if (para3 === "p2") {
        style = "border-green-500";
        font = "text-green-500";
    } else {
        style = "border-yellow-500";
        font = "text-yellow-500";
    }

    let deletbtn = document.createElement("button");
    deletbtn.innerText = "delete";
    deletbtn.classList.add('border', 'border-white', 'w-[70px]', 'h-[30px]', 'font-bold', 'hover:bg-red-500', 'm-[6px]');
    deletbtn.addEventListener("click", () => {
        newTask.remove();
        updateCounters(); // Update counters after removal
    });

    newTask.innerHTML = `
        <div  class="py-5 text-white rounded-[12px] w-[90%] border ${style}">
            <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none px-3">
                    <span class="border rounded-[50%] w-[30px] h-[30px] ${font} ${style}">${para3}</span>
                    <span id="para">${para}</span>
                    <span class="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p id="para2" class="text-neutral-600 mt-3 group-open:animate-fadeIn break-words m-2">${para2}</p>
                <button id="editbtn" class="border border-white w-[70px] h-[30px] font-bold hover:bg-green-500 m-[6px]" onclick="edit_todo(event , ${ids})">Edit</button>
            </details>
        </div>
    `;
    ids += 1;
    if (para4 === "To do") {
        listContainer.appendChild(newTask);
    } else if (para4 === "Doing") {
        listContainer2.appendChild(newTask);
    } else {
        listContainer3.appendChild(newTask);
    }

    newTask.childNodes[1].childNodes[1].appendChild(deletbtn);
    updateCounters(); // Update counters after adding a new task

    document.getElementById("in").value = "";
    document.getElementById("in2").value = "";
}

function edit_todo(event, id) {
    event.preventDefault();
    let task = document.getElementById(id);
    let inp = document.createElement("input");
    let para = task.querySelector('#para');
    inp.value = para.textContent;

    let editbtn = task.querySelector('#editbtn');

    let inp1 = document.createElement("input");
    let para1 = task.querySelector('#para2');
    inp1.value = para1.textContent;

    para.innerHTML = ''; 
    inp.className="border-s-neutral-100 border border-white bg-transparent text-black-500 w-[195.2px]   rounded-[8px] break-words"
    para.appendChild(inp); 

    para1.innerHTML = ''; 
    inp1.className="border-s-neutral-100 border border-white bg-transparent text-black-500 h-[60px] w-[195.2px]  rounded-[8px] break-words"
    para1.appendChild(inp1); 
    
    editbtn.innerText = "Save";
    editbtn.onclick = function(event) {
        enregistree(event, id, inp.value, inp1.value);
    };
}

function enregistree(event, id, newTitle, newDescription) {
    event.preventDefault();
    let task = document.getElementById(id);
    
    let para = task.querySelector('#para');
    let para1 = task.querySelector('#para2');

    para.textContent = newTitle;
    para1.textContent = newDescription;

    let editbtn = task.querySelector('#editbtn');
    editbtn.innerText = "Edit";
    editbtn.onclick = function(event) {
        edit_todo(event, id);
    };
}
