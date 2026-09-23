    let exercises = [
    {id: 1, name: "Push-ups", reps: 20},
    {id: 2, name: "Sit-ups", reps: 15},
    {id: 3, name: "Squats", reps: 30}
];

const input = document.getElementById("input");
const addBtn = document.getElementById("add");
const list = document.getElementById("list"); 
const count = document.getElementById("count");
const repsInput = document.getElementById("reps");

function render() {
    list.innerHTML = "";

    exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = exercise.name;

        const inputReps = document.createElement("input");
        inputReps.type = "number";
        inputReps.value = exercise.reps || "";
        inputReps.addEventListener("change", (e) => {
            const newReps = parseInt(e.target.value);
            if (!isNaN(newReps) && newReps > 0) {
                exercises = exercises.map((ex) =>
                ex.id === exercise.id ? { ...ex, reps: newReps } : ex 
            );
            render();
            }
        });
        li.appendChild(inputReps);

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", () => removeExercise(exercise.id));

        li.appendChild(del);
        list.appendChild(li);
    });

    count.textContent = `Total Exercises: ${exercises.length}`;

}

    function addExercise() {
        const name = input.value.trim();
        if (name === "") return;
        const newExercise = { id: Date.now(), name: name};
        const reps = parseInt(repsInput.value);
        if (!isNaN(reps) && reps > 0) {
            newExercise.reps = reps;
        }
        exercises = [...exercises, newExercise];

        input.value = "";
        repsInput.value = "";
        render();
    }


function removeExercise(id){
    exercises = exercises.filter((exercise) => exercise.id !== id);
    render();
}
    addBtn.addEventListener("click", addExercise);
    render();
