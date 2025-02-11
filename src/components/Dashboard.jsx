import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import 'boxicons';

function Dashboard({
	users,
	pending,
	error,
	remove,
	handleEdit,
	goToHome,
	values,
	handleChange,
	handleSubmit,
	edit,
	handleCancel,
}) {
	const [creatingNewUser, setCreatingNewUser] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleCreateEditButton = () => {
		switch (creatingNewUser || isEditing) {
			case true:
				setCreatingNewUser(false);
				setIsEditing(false);
				handleCancel();
				break;
			case false:
				setCreatingNewUser(true);
				setIsEditing(true);
				break;
		}
	};

	const handleEditClick = (user) => {
		handleEdit(user);
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setCreatingNewUser(false);
	};

	const handleGoHomeClick = () => {
		goToHome();
		setIsEditing(false);
		setCreatingNewUser(false);
	};

	const handleFormSubmit = (event) => {
		handleSubmit(event);
		setCreatingNewUser(false);
		setIsEditing(false);
	};

	const list = (
		<UserList
			users={users}
			pending={pending}
			remove={remove}
			handleEdit={handleEditClick}
			creatingNewUser={creatingNewUser}
			singleColumn={creatingNewUser || isEditing}
		/>
	);

	return (
		<div className="w-screen h-screen overflow-y-auto overflow-x-hidden">
			<nav
				aria-label="Global"
				className="w-full mx-auto flex items-center justify-between py-4 lg:px-8 h-15 bg-gray-900 bg-o rounded-3xl drop-shadow-xl opacity-80"
			>
				<div className="flex flex-1 justify-start ml-4 lg:ml-30">
					<button
						onClick={handleGoHomeClick}
						className="text-cl font-bold text-gray-100 cursor-pointer"
					>
						Inicio
					</button>
				</div>
				<div className="flex justify-end mr-4 lg:mr-30">
					<button
						onClick={handleCreateEditButton}
						className="text-m font-semibold text-white cursor-pointer flex items-center gap-2"
					>
						<div className="flex justify-center items-center">
							{creatingNewUser || isEditing
								? 'Cerrar formulario'
								: 'Crear nuevo usuario'}
						</div>

						<div className="flex justify-center items-center">
							{creatingNewUser || isEditing ? (
								<box-icon name="x" color="white" size="md"></box-icon>
							) : (
								<box-icon name="user-plus" color="white" size="sm"></box-icon>
							)}
						</div>
					</button>
				</div>
			</nav>

			{error && <p className="text-red-500">{error}</p>}

			<div className="w-full">
				{creatingNewUser || isEditing ? (
					<div className="flex flex-col md:flex-row w-full overflow-hidden">
						<div className="w-full md:w-1/2 h-full pt-10 grid items-center overflow-y-auto order-2 md:order-1">
							{list}
						</div>
						<div className="w-full md:w-1/2 overflow-y-auto order-1 md:order-2">
							<UserForm
								values={values}
								handleChange={handleChange}
								handleSubmit={handleFormSubmit}
								edit={edit}
								handleCancel={handleCancel}
								handleCancelClick={handleCancelClick}
								creatingNewUser={creatingNewUser}
								isEditing={isEditing}
							/>
						</div>
					</div>
				) : (
					<div className="w-full h-full pt-10 overflow-y-auto">{list}</div>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
