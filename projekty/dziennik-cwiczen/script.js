
const saved = localStorage.getItem("exercises");
let exercises = [];
if (saved != null) {
    exercises = JSON.parse(saved);
}
else {
    exercises = [
        { id: 1, name: "Push-ups", reps: 20 },
        { id: 2, name: "Sit-ups", reps: 15 },
        { id: 3, name: "Squats", reps: 30 }
    ];
}

const setsInput = document.getElementById("sets");
const weightInput = document.getElementById("weight");
const input = document.getElementById("input");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const count = document.getElementById("count");
const repsInput = document.getElementById("reps");

function render() {
    list.innerHTML = "";

    exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = `${exercise.name} - ciężar: ${exercise.weight || "-"}, serie: ${exercise.sets || "-"}, powt: ${exercise.reps}`;

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", () => removeExercise(exercise.id));

        li.appendChild(del);
        list.appendChild(li);
    });

    count.textContent = `Total Exercises: ${exercises.length}`;
    localStorage.setItem("exercises", JSON.stringify(exercises));

}

function addExercise() {
    const name = input.value.trim();
    if (name === "") return;
    const newExercise = { id: Date.now(), name: name };

    const reps = parseInt(repsInput.value);
    if (!isNaN(reps) && reps > 0) {
        newExercise.reps = reps;
    }

    const sets = parseInt(setsInput.value);
    if (!isNaN(sets) && sets > 0) {
        newExercise.sets = sets;
    }
    const weight = parseInt(weightInput.value);
    if (!isNaN(weight) && weight > 0) {
        newExercise.weight = weight;
    }


    exercises = [...exercises, newExercise];

    input.value = "";
    repsInput.value = "";
    setsInput.value = "";
    weightInput.value = "";
    render();

}


function removeExercise(id) {
    exercises = exercises.filter((exercise) => exercise.id !== id);
    render();
}
addBtn.addEventListener("click", addExercise);
render();
