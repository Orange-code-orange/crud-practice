import { useEffect, useState } from 'react';
import useCrudApi from './hooks/useCrudApi';
import UserForm from './components/UserForm';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

const initialValues = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	birthday: '',
	image_url: '',
};

const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/';

function App() {
	const { data: users, request, pending, error } = useCrudApi();
	const [values, setValues] = useState(initialValues);
	const [edit, setEdit] = useState(null);
	const [showHero, setShowHero] = useState(true);
	const [showCreateUser, setShowCreateUser] = useState(false);
	const [showDashboard, setShowDashboard] = useState(false);
	const [fullScreenForm, setFullScreenForm] = useState(false);

	useEffect(() => {
		request({
			url: baseUrl + 'users',
		});
	}, []);

	useEffect(() => {
		console.log('Users:', users);
	}, [users]);

	const add = (user) => {
		request({
			url: baseUrl + 'users',
			method: 'POST',
			body: user,
		});
	};

	const remove = (id) => {
		console.log('Remove:', id);
		request({
			url: baseUrl + `users/${id}`,
			method: 'DELETE',
			id,
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const update = (id, userEdit) => {
		request({
			url: baseUrl + `users/${id}`,
			method: 'PUT',
			body: userEdit,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (edit) {
			update(edit.id, values);
			setEdit(null);
		} else {
			add(values);
		}

		goToDashboard();
		setValues(initialValues);
	};

	const handleEdit = (user) => {
		console.log(user.id);
		setEdit(user);
		setValues(user);
	};

	const handleCancel = () => {
		setEdit(null);
		setValues(initialValues);
	};

	const goToCreateUser = () => {
		setShowHero(false);
		setShowCreateUser(true);
		setShowDashboard(false); // Asegúrate de desactivar 'showDashboard'
		setFullScreenForm(true);
	};

	const goToCreateUserFromDashboard = () => {
		setShowDashboard(false);
		setShowCreateUser(true);
		setShowHero(false); // Desactiva 'showHero' si es necesario
		setFullScreenForm(false);
	};

	const goToDashboard = () => {
		setShowHero(false);
		setShowCreateUser(false); // Desactiva 'showCreateUser'
		setShowDashboard(true);
		setEdit(null);
	};

	const goToHome = () => {
		setShowHero(true);
		setShowCreateUser(false);
		setShowDashboard(false);
	};

	return (
		<div
			className="isolate bg-white w-screen h-auto overflow-hidden"
			style={{ overflowX: 'hidden' }}
		>
			{showHero ? (
				<Hero goToCreateUser={goToCreateUser} goToDashboard={goToDashboard} />
			) : showCreateUser ? (
				<div className="w-screen h-screen overflow-y-auto overflow-x-hidden">
					<nav
						aria-label="Global"
						className="w-full mx-auto flex items-center justify-between py-4 lg:px-8 h-15 bg-gray-900 bg-o rounded-3xl drop-shadow-xl opacity-80"
					>
						<div className="flex flex-1 justify-center">
							<button
								onClick={goToHome}
								className="text-lg font-semibold text-white cursor-pointer"
							>
								Inicio
							</button>
						</div>
						<div className="flex justify-end mr-4"></div>
					</nav>
					<UserForm
						values={values}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						edit={edit}
						handleCancel={handleCancel}
						fullScreen={fullScreenForm}
						showCreateUser={showCreateUser}
					/>
				</div>
			) : showDashboard ? (
				<Dashboard
					users={users}
					pending={pending}
					remove={remove}
					handleEdit={handleEdit}
					goToCreateUser={goToCreateUserFromDashboard}
					goToHome={goToHome}
					values={values}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					edit={edit}
					handleCancel={handleCancel}
				/>
			) : (
				<p>No content to display</p>
			)}
		</div>
	);
}

export default App;
