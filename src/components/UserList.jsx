import UserCard from './UserCard';

function UserList({ users, remove, pending, handleEdit, singleColumn }) {
	// Si singleColumn es true: una sola columna, de lo contrario se muestran 3 columnas en pantalla mediana
	const gridClass = singleColumn
		? 'grid grid-cols-1 gap-4 w-[90%] mx-auto place-items-center'
		: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[90%] mx-auto place-items-center';

	console.log(singleColumn);

	return (
		<>
			{pending ? (
				<p className="font-bold text-5xl self-center">Loading...</p>
			) : (
				<ul className={gridClass}>
					{users.length > 0 ? (
						users
							.slice()
							.reverse()
							.map((user) => (
								<UserCard
									user={user}
									key={user.id}
									id={user.id}
									remove={remove}
									handleEdit={handleEdit}
								/>
							))
					) : (
						<li className="list-none text-center">No users found</li>
					)}
				</ul>
			)}
		</>
	);
}

export default UserList;
