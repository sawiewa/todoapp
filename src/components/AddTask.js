import React, { Component } from 'react';
import './AddTask.css';

class AddTask extends Component {
	state = {
		text: '',
		checked: true,
		date: new Date().toISOString().slice(0, 10), //aktualna data z wyciętym za pomocą slice 10 znaków, od 0 do 10
	};
	handleDate = (e) => {
		this.setState({
			date: e.target.value,
		});
	}; // obsługa zmiany wartości daty, przypisuje datę wybraną z kalendarza

	handleText = (e) => {
		this.setState({
			text: e.target.value,
		});
	};
	handleCheckbox = (e) => {
		this.setState({
			checked: e.target.checked,
		});
	};
	handleClick = () => {
		//dodanie nowego obiektu który bedzie dodawany do danych w app, musi zawierac wszystkie elementy

		const { text, date, checked } = this.state;

		if (text.length > 2) {
			const add = this.props.add(text, date, checked); //jeżeli add zwróci true to wtedy bedziemy czyscic formularz, true zwraca bo w App.js dodalismy return true
			if (add) {
				this.setState({
					text: '',
					checked: true,
					date: new Date().toISOString().slice(0, 10),
				});
			}
		} else {
			console.log('krotki tekst');
		}
	};
	render() {
		const minDate = new Date().toISOString().slice(0, 10);
		let maxDate = minDate.slice(0, 4) * 1 + 1; //minDate.slice(0,4) daje nam stringa (daje wycięty rok), mnożenie *1 zmienia na wartość +1 (+ 1 rok)
		maxDate = maxDate + '-12-31'; //zwrócony jest tylko rok, dlatego dodajemy 12-31
		//	console.log(maxDate);
		return (
			<div>
				<h2>Dodaj zadanie</h2>
				<input
					onChange={this.handleText}
					type='text'
					placeholder='dodaj zadanie'
					value={this.state.text}
				/>
				<input
					onChange={this.handleCheckbox}
					type='checkbox'
					name=''
					id='important'
					checked={this.state.checked}
				/>
				<label htmlFor='important'>Priorytet </label>
				<label htmlFor='date'>Do kiedy zrobic </label>
				<input
					onChange={this.handleDate}
					type='date'
					name=''
					id='date'
					value={this.state.date}
					min={minDate}
					max={maxDate}
				/>
				<button onClick={this.handleClick}>Dodaj</button>
			</div>
		);
	}
}

export default AddTask;
