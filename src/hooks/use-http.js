import { useCallback, useState } from 'react';

const REQUEST_ERROR_MESSAGE = 'An Error occurred while processing your request';

const UseHttp = () => {
	const [requestError, setRequestError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = useCallback(async (reqConfigObj, setData) => {
		/* Clear any previous states */
		setRequestError(null);
		setIsLoading(false);

		try {
			setIsLoading(true);
			const response = await fetch(reqConfigObj.url, {
				method: reqConfigObj.method || 'GET',
				headers: reqConfigObj.headers || null,
				body: reqConfigObj ? JSON.stringify(reqConfigObj.body) : null,
			});

			if (!response.ok) {
				throw new Error(REQUEST_ERROR_MESSAGE);
			}

			const data = await response.json();
			setData(data);
		} catch (err) {
			setRequestError(err.message);
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		requestError,
		sendRequest,
	};
};

export default UseHttp;
