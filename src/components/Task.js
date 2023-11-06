function Task(props) {
	const itsImportantStyle = {
		color: 'red',
	};
	const { text, date, id, active, important, finishDate } = props.taskNew; //destrukturyzacja, potem zamiast pisać props.taskNew.text wystarczy text, dodajemy kolejne elementy z tablicy obiektów które będą używane, czyli jak potrzebuje statusu to dodaje active i potem użyje jako props.taskNew.active (po destrukturyzacji samo active niżej)

	if (active) {
		return (
			<div>
				<p>
					{/* <strong>{props.taskNew.text}</strong> */}
					<strong style={important ? itsImportantStyle : null}>
						{text}
					</strong>{' '}
					do <span>{date} </span>
					<button onClick={() => props.changeTaskStatus(id)}>
						Zmień status
					</button>
					{/* do buttonów przekazujemy propsy z TaskList, tam sa przekazane z App - nie jest to bezpośrednio */}
					<button onClick={() => props.deleteTask(id)}>x</button>
				</p>
			</div>
		);
	} else {
		const timeEnd = new Date(finishDate).toLocaleString();
		return (
			<div>
				<p>
					{/* <strong>{props.taskNew.text}</strong> */}
					<strong>{text}</strong>
					<em>(zrobić do {date})</em>
					<br />
					<span>- potwierdzenie wykonanaia </span>
					<span>{timeEnd} </span>
					{/* <button onClick={() => props.changeTaskStatus(id)}> */}
					{/* </button> */}
					{/* do buttonów przekazujemy propsy z TaskList, tam sa przekazane z App - nie jest to bezpośrednio */}
					{/* <button onClick={() => props.deleteTask(id)}>x</button> */}
				</p>
			</div>
		);
	}
}

export default Task;

//w pojedyńczym tasku propsami pobieramy oddzielnie wszystkie elementy obiektu taskNew (to jest kopia tablicy z App.js)
//do buttonów dodajemy metody które będa wywoływać jakąś funkcję
//
