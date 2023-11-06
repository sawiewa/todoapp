import React from 'react';
import './App.css';
import AddTask from './AddTask';
import TaskList from './TaskList';

class App extends React.Component {
	counter = 1110;
	state = {
		tasks: [
			{
				id: 10,
				text: 'zagrać w gre',
				date: '2023-07-01',
				important: true,
				active: true,
				finishDate: null,
			},
			{
				id: 110,
				text: 'kupić coś',
				date: '2023-07-01',
				important: true,
				active: true,
				finishDate: null,
			},
			{
				id: 100,
				text: 'zrobić pierogi',
				date: '2024-08-01',
				important: false,
				active: true,
				finishDate: null,
			},
			{
				id: 1010,
				text: 'zrobić pierogi 2 ',
				date: '2024-08-01',
				important: false,
				active: true,
				finishDate: null,
			},
			{
				id: 200,
				text: 'skosić działkę',
				date: '2023-07-01',
				important: true,
				active: true,
				finishDate: null,
			},
			{
				id: 300,
				text: 'wybudować dom',
				date: '2025-07-01',
				important: true,
				active: true,
				finishDate: null,
			},
		],
	};
	deleteTask = (id) => {
		// console.log(`'delete z Appp' ${id}`);
		// const tasksNew = [...this.state.tasks];
		// const index = tasksNew.findIndex((task) => task.id === id);// id tego elementu jest równe id elementu kliknietego ???
		// console.log(index);
		// tasksNew.splice(index, 1); //od znalezienia elementu z id = index usunie 1 element, czyli ten z index, musimy znaleźć index ponieważ nie inex nie zawsze bedzie = id
		// console.log(tasksNew);
		// this.setState({ tasks: tasksNew }); // w miejsce starej tablicy przykazujemy nową bez usuniętego elementu

		//--------------------------------usunięcie z użyciem FILTR
		let tasksNew = [...this.state.tasks];
		//	const index = tasksNew.findIndex((task) => task.id === id);
		const filteredTasks = tasksNew.filter((task) => task.id !== id); //do nowej tablicy zostaną przeniesione wszystkie elelemnty spełniające warunek, czyli różne od id naszego usuniętego elementu

		this.setState({ tasks: filteredTasks }); // przypisujemy wartość nowej tablicy po przefiltrowaniu
		console.log(filteredTasks);
	};
	//id przekazane żeby było wiadomo który element ma być usunięty

	changeTaskStatus = (id) => {
		console.log(`'change z Appp' ${id}`);

		const tasksNew = [...this.state.tasks];
		tasksNew.forEach((task) => {
			if (task.id === id) {
				task.active = !task.active; //tu jeszcze pracujemy na kopii tablicy dlatego nei state
				task.finishDate = new Date().getTime(); //ustawiamy date wykonania zadania
			}
		});
		this.setState({ tasks: tasksNew });
	};
	addTask = (text, date, important) => {
		//	console.log('dodany w app');

		const task = {
			id: this.counter,
			text: text, //tekst z inputa, wszystkie te elementy bedziemy musieli pobrac z AddTask
			date: date, // data z inputa
			important: important, //wartość z checkboxa przyt dodawaniu
			active: true,
			finishDate: null,
		};
		this.counter++;
		console.log(task, this.counter);
		this.setState((prevState) => ({
			tasks: [...prevState.tasks, task],
		}));
		return true;
	};
	render() {
		return (
			<div className='App'>
				<h1>TO DO APP - tytuł aplikacji</h1>
				<AddTask add={this.addTask} />
				{/* po przekazaniu tym propsem metody addTask możemy z niej korzystac w komponencie AddTask np innej metodzie, np. handleClick */}
				<TaskList
					tasks={this.state.tasks}
					delete={this.deleteTask}
					change={this.changeTaskStatus}
				/>
				{/* przekazujemy do środksa propsy czyli stan, żeby móc potem wykorzyastac te dane */}
			</div>
		);
	}
}

export default App;

//w App napiszemy metody do przycisków obsługujęce przyciski, są one wywoływane tam gdzie są stworzone przyciski metodą onClick, czyli tutaj w komponencie Task
// metode do usuwanie tworzymy w App ponieważ tutaj mamy całą tablice obiektów i stąd bedziemy usuwac
// przekazujemy ja jako propsy do TaskList ale docelowo potrzebujemy jej w Task dlatego w komponencie TaskList (wejsc w plik taskList) dodajemy nowego propsa do którego wsadzimy props delete (ten który tutaj jest przy znaczniku TaskLis)
