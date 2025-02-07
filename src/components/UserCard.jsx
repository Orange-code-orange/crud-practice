import React from 'react';

function UserCard({ user, id, remove }) {
	return (
		<>
			<li key={id}>
				{user.first_name}
				<div className="flex gap-5">
					<button className="btn m-5 bg-green-500">Edit</button>
					<button onClick={() => remove(id)} className="btn m-5 bg-red-500">
						Delete
					</button>
				</div>
			</li>
		</>
	);
}

export default UserCard;
