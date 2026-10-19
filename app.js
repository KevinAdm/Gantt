let tasks=[];

window.onload=loadProject;

function addTask(){

    const name=document.getElementById("taskName").value;
    const start=document.getElementById("startDate").value;
    const end=document.getElementById("endDate").value;

    if(!name || !start || !end){
        alert("Complete todos los campos");
        return;
    }

    tasks.push({
        name,
        start,
        end,
        completed:false
    });

    render();
}

function render(){

    renderChecklist();
    renderDashboard();
    renderGantt();
}

function renderDashboard(){

    const total=tasks.length;

    const completed=tasks.filter(x=>x.completed).length;

    document.getElementById("dashboard").innerHTML=
    `
    <h3>Dashboard</h3>

    <p>Total tareas: ${total}</p>

    <p>Completadas: ${completed}</p>
    `;
}

function renderChecklist(){

    let html="<h3>Checklist</h3>";

    tasks.forEach((t,index)=>{

        html+=`
        <div>
            <input
                type="checkbox"
                ${t.completed ? "checked":""}
                onchange="toggleTask(${index})">
            ${t.name}
        </div>
        `;
    });

    document.getElementById("checklist").innerHTML=html;
}

function toggleTask(index){

    tasks[index].completed=!tasks[index].completed;

    render();
}

function renderGantt(){

    let html="<h3>Gantt</h3>";

    tasks.forEach(t=>{

        html+=`
        <div class="task-row">
            <div class="task-name">
                ${t.name}
            </div>

            <div class="bar" style="width:300px;"></div>
        </div>
        `;
    });

    document.getElementById("gantt").innerHTML=html;
}

function saveProject(){

    localStorage.setItem(
        "gantt-project",
        JSON.stringify(tasks)
    );

    alert("Proyecto guardado");
}

function loadProject(){

    const data=localStorage.getItem("gantt-project");

    if(data){

        tasks=JSON.parse(data);

        render();
    }
}

function exportPDF(){

    const element=document.getElementById("gantt");

    html2pdf().from(element).save("gantt.pdf");
}