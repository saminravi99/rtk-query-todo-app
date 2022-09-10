import { useDispatch, useSelector } from 'react-redux';
import { useGetTodosQuery } from '../features/api/apiSlice';
import { colorAdded, colorRemoved, statusChanged } from '../features/filters/filterSlice';

const numberOfTodos = (no_of_todos) => {
	switch (no_of_todos) {
		case 0:
			return 'No tasks Left';
		case 1:
			return '1 task left';
		default:
			return `${no_of_todos} tasks Left`;
	}
};

export default function Footer() {
	const { data: todos, isLoading, isError} = useGetTodosQuery();

	const filters = useSelector((state) => state.filters);

	const dispatch = useDispatch();
	const todosRemaining = todos?.filter((todo) => !todo.completed).length;
	const { status, colors } = filters || {};

	const handleStatusChange = (status) => {
		dispatch(statusChanged(status));
	};

	const handleColorChange = (color) => {
		if (colors?.includes(color)) {
		    dispatch(colorRemoved(color));
		} else {
		    dispatch(colorAdded(color));
		}
	};

	return (
		<div className='mt-4 flex justify-between text-xs text-gray-500'>
			<p>{isLoading ? <span>Tasks Loading</span> : numberOfTodos(todosRemaining)}</p>
			<ul className='flex space-x-1 items-center text-xs'>
				<li
					className={`cursor-pointer ${status === 'All' && 'font-bold'}`}
					onClick={() => handleStatusChange('All')}>
					All
				</li>
				<li>|</li>
				<li
					className={`cursor-pointer ${status === 'Incomplete' && 'font-bold'}`}
					onClick={() => handleStatusChange('Incomplete')}>
					Incomplete
				</li>
				<li>|</li>
				<li
					className={`cursor-pointer ${status === 'Complete' && 'font-bold'}`}
					onClick={() => handleStatusChange('Complete')}>
					Complete
				</li>
				<li></li>
				<li></li>
				<li
					className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
						colors?.includes('green') && 'bg-green-500'
					}`}
					onClick={() => handleColorChange('green')}></li>
				<li
					className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
						colors?.includes('red') && 'bg-red-500'
					}`}
					onClick={() => handleColorChange('red')}></li>
				<li
					className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
						colors?.includes('yellow') && 'bg-yellow-500'
					}`}
					onClick={() => handleColorChange('yellow')}></li>
			</ul>
		</div>
	);
}
