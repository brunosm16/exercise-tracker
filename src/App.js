import './App.css';
import NewExercise from './components/NewExercise/NewExercise';

const App = () => {
	// todo
	const handleAddExercise = (data) => {
		console.log(data);
	};

	return (
		<div className="App">
			<NewExercise onAddExercise={handleAddExercise} />
			<h1>Exercise Tracker | App.js</h1>
		</div>
	);
};

export default App;
