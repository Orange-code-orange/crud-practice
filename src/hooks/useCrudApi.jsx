import axios from 'axios';
import { useState } from 'react';

function useCrudApi() {
	const [data, setData] = useState([]);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);

	const request = async ({ url, method = 'GET', body = null, id = null }) => {
		setPending(true);
		setError(null);
		try {
			const res = await axios({
				url,
				method,
				data: method !== 'GET' ? body : null,
			});
			switch (method) {
				case 'POST':
					setData((prev) => [...prev, res.data]);
					break;
				case 'PUT':
				case 'PATCH':
					setData((prev) =>
						prev.map((i) => (i.id === res.data.id ? res.data : i)),
					);
					break;
				case 'DELETE':
					setData((prev) => prev.filter((i) => i.id !== id));
					break;
				default:
					setData(res.data.results);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setPending(false);
		}
	};

	return { data, pending, error, request };
}

export default useCrudApi;
