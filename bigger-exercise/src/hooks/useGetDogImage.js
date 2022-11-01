import { useState, useEffect } from 'react';
import { useGetApiData } from './useGetApiData';

export const useGetDogImage = (breedName) => {
	const [isReady, setIsReady] = useState(false);
	const [photoLink, setPhotoLink] = useState('');
	const [{ data, isLoading, isError }] =
		useGetApiData([], `https://dog.ceo/api/breed/${breedName}/images/random`);

		useEffect(() => {
			const newIsReady = !isLoading && !isError && data && data.message;
			const newPhotoLink = newIsReady ? data.message : '';
			setIsReady(newIsReady);
			setPhotoLink(newPhotoLink);
		}, [data, isLoading, isError]);

	return [{ isReady, photoLink, isError }];
};