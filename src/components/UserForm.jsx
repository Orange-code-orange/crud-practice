import React, { useState } from 'react';
import * as z from 'zod';

const schema = z.object({
	first_name: z.string().nonempty({ message: 'El nombre es obligatorio' }),
	last_name: z.string().nonempty({ message: 'El apellido es obligatorio' }),
	email: z.string().email({ message: 'Email inválido' }),
	password: z
		.string()
		.min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
	birthday: z
		.string()
		.nonempty({ message: 'El cumpleaños es obligatorio' })
		.refine(
			(value) => {
				const birthDate = new Date(value + 'T00:00:00');
				const today = new Date();
				let age = today.getFullYear() - birthDate.getFullYear();
				const monthDiff = today.getMonth() - birthDate.getMonth();
				if (
					monthDiff < 0 ||
					(monthDiff === 0 && today.getDate() < birthDate.getDate())
				) {
					age--;
				}
				return age >= 18;
			},
			{ message: 'Debes ser mayor de edad para estudiar en Academlo' },
		),
});

function UserForm({
	values,
	handleChange,
	handleSubmit,
	edit,
	handleCancel,
	handleCancelClick,
	creatingNewUser,
	isEditing,
	showCreateUser,
}) {
	const [errors, setErrors] = useState({});

	const validateAndSubmit = (e) => {
		e.preventDefault();
		try {
			schema.parse(values);
			setErrors({});
			handleSubmit(e);
		} catch (err) {
			if (err instanceof z.ZodError) {
				const fieldErrors = {};
				err.errors.forEach((error) => {
					fieldErrors[error.path[0]] = error;
				});
				setErrors(fieldErrors);
			}
		}
	};

	return (
		<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
			></div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
					{creatingNewUser || showCreateUser
						? 'Crea un nuevo usuario'
						: isEditing
						? 'Edita un usuario'
						: ''}
				</h2>
				<p className="mt-2 text-lg/8 text-gray-600">
					Aute magna irure deserunt veniam aliqua magna enim voluptate.
				</p>
			</div>
			<form
				onSubmit={validateAndSubmit}
				className="mx-auto mt-16 max-w-xl sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label className="block text-sm/6 font-semibold text-gray-900">
							First name
						</label>
						<div className="mt-2.5">
							<input
								value={values.first_name}
								onChange={handleChange}
								name="first_name"
								type="text"
								autoComplete="given-name"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
							{errors.first_name && (
								<p className="text-red-600 text-sm mt-1">
									{errors.first_name.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label className="block text-sm/6 font-semibold text-gray-900">
							Last name
						</label>
						<div className="mt-2.5">
							<input
								value={values.last_name}
								onChange={handleChange}
								name="last_name"
								type="text"
								autoComplete="family-name"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
							{errors.last_name && (
								<p className="text-red-600 text-sm mt-1">
									{errors.last_name.message}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm/6 font-semibold text-gray-900">
							Email
						</label>
						<div className="mt-2.5">
							<input
								value={values.email}
								onChange={handleChange}
								name="email"
								type="email"
								autoComplete="email"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
							{errors.email && (
								<p className="text-red-600 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm/6 font-semibold text-gray-900">
							Password
						</label>
						<div className="mt-2.5">
							<input
								value={values.password}
								onChange={handleChange}
								name="password"
								type="password"
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
							{errors.password && (
								<p className="text-red-600 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm/6 font-semibold text-gray-900">
							Birthday
						</label>
						<div className="mt-2.5">
							<input
								value={values.birthday}
								onChange={handleChange}
								dateformat="/dd/MM/yyyy"
								name="birthday"
								type="date"
								autoComplete="bday"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
							{errors.birthday && (
								<p className="text-red-600 text-sm mt-1">
									{errors.birthday.message}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm/6 font-semibold text-gray-900">
							Image URL
						</label>
						<div className="mt-2.5">
							<input
								value={values.image_url}
								onChange={handleChange}
								name="image_url"
								type="text"
								autoComplete="url"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
						</div>
					</div>
				</div>
				<div className={edit ? 'flex justify-between mt-10 gap-10' : 'mt-10'}>
					<button
						type="submit"
						className={
							edit ? 'btn bg-green-300 text-black cursor-pointer' : 'btn'
						}
					>
						{edit ? 'Edit' : 'Create'}
					</button>
					{edit && (
						<button
							type="button"
							onClick={() => {
								handleCancel();
								handleCancelClick();
							}}
							className="btn bg-red-600 text-white cursor-pointer"
						>
							Cancel
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default UserForm;
