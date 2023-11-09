import React from 'react';
import Task from './Task';

const TaskList = (props) => {
	const active = props.tasks.filter((task) => task.active === true);
	const done = props.tasks.filter((task) => task.active === false);
	// console.log(active);
	// console.log(done);
	done.sort((a, b) => {
		return b.finishDate - a.finishDate; //sortowanie malejące po dacie
	});

	active.sort((a, b) => {
		a = a.text.toLowerCase();
		b = b.text.toLowerCase();
		if (a < b) {
			return -1; //jeżeli jest mniejsze niz zero to ma mniejszy index niz b
		} else if (a > b) {
			//>0 to ma większy index niz b
			return 1;
		} else return 0; //jezeli 0 to nic sie nie zmienia w indexach
	});
	const activeTasks = active.map((task) => (
		<Task
			key={task.id}
			taskNew={task} //propsy przekazywane potem do komponentu task
			deleteTask={props.delete}
			changeTaskStatus={props.change}
		/>
	));
	const doneTasks = done.map((task) => (
		<Task
			key={task.id}
			taskNew={task}
			deleteTask={props.delete}
			changeTaskStatus={props.change}
		/>
	));
	return (
		<>
			<div className='active'>
				<h2>Zadania do zrobienia:</h2>
				{activeTasks.length > 0 ? activeTasks : 'brak zadań'}
				{/* jeżeli nie ma aktywnych tasków to pokazujemy tekst brak zadan */}
			</div>

			<div className='done'>
				<h2>
					Zadania wykonane <em>({done.length})</em>:
				</h2>
				{doneTasks.slice(0, 5)}
				{/* slice ucina jakąś liczbe elementów, tutaj wyswietla tylko 3 */}
				{done.length > 5 && (
					<span style={{ fontSize: 10 }}>
						Wyswietlonych jest 5 ostatnich elementów{' '}
					</span>
				)}
			</div>
		</>
	);
};

export default TaskList;
// 1. najpierw mapujemy tablicę tasków pobraną z App.js
//2. na tej kopii w elemencie <Task> dodajemy 2 atrybutym key jest zawsze wymagany i będziemy do niego przekazywać id elelemntu, i jako cały obiekt przekażemy w atrybucie taskNew
// potem można będzie się odwoływać do tasksNew.text, tasksNew.id, tasksNew.date itd w komponencie <Task>
