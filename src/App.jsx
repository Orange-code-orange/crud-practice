import { useEffect, useState } from 'react';
import useCrudApi from './hooks/useCrudApi';

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
	const { data: users, request } = useCrudApi();
	const [values, setValues] = useState(initialValues);

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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		add(values);
	};

	return (
		<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
					Create New User
				</h2>
				<p className="mt-2 text-lg/8 text-gray-600">
					Aute magna irure deserunt veniam aliqua magna enim voluptate.
				</p>
			</div>
			<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
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
								name="birthday"
								type="date"
								autoComplete="bday"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
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
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Create
					</button>
				</div>
			</form>

			<h2>App</h2>
			{users && <pre>{JSON.stringify(users, null, 2)}</pre>}
		</div>
	);
}

export default App;
