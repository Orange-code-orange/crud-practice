import React, { useState } from 'react';
import Modal from './Modal';

function UserCard({ user, id, remove, handleEdit }) {
	const formattedBirthday = new Date(user.birthday).toLocaleDateString(
		'es-ES',
		{ year: 'numeric', month: 'long', day: 'numeric' },
	);

	const [open, setOpen] = useState(false);

	return (
		<li className="w-full max-w-sm bg-gray-100 rounded-xl shadow-lg overflow-hidden mb-10">
			<div className="p-6 text-center">
				<img
					className="w-24 h-24 object-cover mb-3 rounded-full mx-auto shadow-lg"
					src={
						user.image_url
							? user.image_url
							: 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png'
					}
					alt={`${user.first_name} image`}
				/>
				<h5 className="mt-0 text-xl font-medium text-gray-900">
					{`${user.first_name} ${user.last_name}`}
				</h5>
				<span className="text-sm text-gray-500">{user.job_title}</span>
				<p className="text-sm text-gray-500">{user.email}</p>
				<p className="text-sm text-gray-500">{formattedBirthday}</p>
			</div>
			<div className="flex border-t border-gray-200 divide-x divide-gray-200">
				<button
					onClick={() => handleEdit(user)}
					className="flex-1 py-4 text-center text-gray-500 hover:text-gray-700 hover:bg-green-100 cursor-pointer"
				>
					Edit
				</button>
				<button
					onClick={() => setOpen(true)}
					className="flex-1 py-4 text-center text-gray-500 hover:text-gray-700 hover:bg-red-100 cursor-pointer"
				>
					Delete
				</button>
				<Modal setOpen={setOpen} open={open} remove={remove} id={id} />
			</div>
		</li>
	);
}

export default UserCard;
