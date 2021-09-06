import { useContext } from 'react';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';
import ExercisesContext from './context/exercises-context';
import Modal from './components/UI/Modal/Modal';

const App = () => {
	const exerciseCtx = useContext(ExercisesContext);

	const { modalError } = exerciseCtx;

	const handleCloseModal = () => {
		exerciseCtx.onOpenCloseModal(null);
	};

	let content = (
		<div className="Wrapper">
			<NewExercise />
			<Exercises />
		</div>
	);

	if (modalError) {
		content = (
			<Modal
				title={modalError.title}
				message={modalError.message}
				onCloseModal={handleCloseModal}
			/>
		);
	}

	return <>{content}</>;
};

export default App;
