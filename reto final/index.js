import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
    saveTask2,
    onGetTasks2,
    eliminar,
    obtener,
    actualizar,
  } from "./firebase.js";
  
  const taskForm = document.getElementById("task-form");
  const tasksContainer = document.getElementById("tasks-container");
  const tasksContainer2 = document.getElementById("tasks-container2");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${task.nombre}</h3>
      <p>${task.apellido}</p>
      <p>${task.idstude}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
    </div>`;
      }); 

  
      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            
            taskForm["task-idstude"].value = task.idstude;
            taskForm["task-nombre"].value  = task.nombre;
            taskForm["task-apellido"].value = task.apellido;
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });

    //2 parte --------------------------------------------------------------------------------------
    onGetTasks2((querySnapshot) => {

        
        tasksContainer2.innerHTML = "";
    
        querySnapshot.forEach((doc) => {
          const task = doc.data();
    
          tasksContainer2.innerHTML += `
          <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${task.idclass}</h3>
        <p>${task.title}</p>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            🖉 Edit
          </button>
        </div>
      </div>`;
        }); 
  
    
        const btnsDelete = tasksContainer2.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
          btn.addEventListener("click", async ({ target: { dataset } }) => {
            try {
              await eliminar(dataset.id);
            } catch (error) {
              console.log(error);
            }
          })
        );
    
        const btnsEdit = tasksContainer2.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            try {
              const doc = await obtener(e.target.dataset.id);
              const task = doc.data();
              
              taskForm["task-idclass"].value = task.idclass;
              taskForm["task-title"].value  = task.title;
              taskForm["task-description"].value = task.description;
    
              editStatus = true;
              id = doc.id;
              taskForm["btn-task-form"].innerText = "Update";
            } catch (error) {
              console.log(error);
            }
          });
        });
      });
        
  });

  
  
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const idstude = taskForm["task-idstude"];
    const nombre = taskForm["task-nombre"];
    const apellido = taskForm["task-apellido"];

    const idclass = taskForm["task-idclass"];
    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    try {

      if (!editStatus) {
        await saveTask(idstude.value, nombre.value, apellido.value);
        await saveTask2(idclass.value,title.value,description.value);
      } else {
        await updateTask(id, {
          idstude: idstude.value,
          nombre: nombre.value,
          apellido: apellido.value
        });
        await actualizar(id, {
            idclass: idclass.value,
            title: title.value,
            description: description.value
          });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "Save";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });

  
  