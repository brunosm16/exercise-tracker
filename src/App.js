import './App.css';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';

const App = () => {
	// todo
	const handleAddExercise = (data) => {
		console.log(data);
	};

	return (
		<div className="App">
			<NewExercise onAddExercise={handleAddExercise} />
			<Exercises />
		</div>
	);
};

export default App;
