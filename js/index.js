'use strict';
//TODO traducciones
//TODO avatar modo movi
//TODO modo web

const url = '../json/projects.json';
const project_div = document.getElementById('project');

async function callJson() {

    try {
        const ftch_response = await fetch(url);
        if (!ftch_response.ok) {
            throw new Error("Hubo un error al cargar los datos");
        }
        const arrayProjects = await ftch_response.json(); //guardo en una variable la respuesta json del fetch y espero a que se cargue  
        return arrayProjects; 

    } catch (error) {
        console.log("Erroooooor");
    }
}

callJson();

//Cargo el HTML con un DOMContentLoaded los proyectos del 2022 por defecto
document.addEventListener("DOMContentLoaded", async () => {
    await callJson();
    filterPerYear(2022);
});

function botones() {
    const btn_year = document.getElementById('year-container');
    btn_year.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON") { //compara y devuelve true o false
            return;
        }
        let year = event.target.dataset.year;
        filterPerYear(parseInt(year));
       
    });
};
botones();

//TODO Agregar efectos cuando se carge el flitro

async function filterPerYear(projectYear) {
    const projects = await callJson();
    project_div.innerHTML = ""; //para mi futura yo, esto no funcionaba porque estaba mal el orden, yo quiero limpiar el div para que luego recorra el div
    projects.forEach(project => {
        if (project.year === projectYear) {
            project_div.innerHTML +=
                `<div class="card rounded mb-5 p-3" style="width:21rem;"> 
                    <img src="https://picsum.photos/300/200" class="card-img-top" alt="...">
                    <h5 class="card-title py-2">${project.title}</h5>
                    <p class="card-text" data-key="p_descrip">${project.description}</p>    
                    <div>
                        <h6 data-key="p_programs">Programming languages:</h6>
                        <div id="icon" class="d-flex justify-content-left mb-2">
                            ${project.language.map(img => `<img src="${img}" class="img-thumbnail border border-0" width="45" alt="Project Image">`).join("")}
                        </div>
                    </div>
                    <a href=${project.url} class="btn custom-btn1" data-key="p_viewmore">View more</a>
                </div>`
        }
    });


};

filterPerYear();






