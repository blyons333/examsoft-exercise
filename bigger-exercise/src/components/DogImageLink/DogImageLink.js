import { useGetDogImage } from '../../hooks/useGetDogImage';
import { Button } from 'react-bootstrap';

function DogImageLink(props) {
  const { breedName } = props;
  const [{ isReady, photoLink, isError }] = useGetDogImage(breedName);

  return (
    <Button variant='primary' size='lg' disabled={!isReady} href={photoLink}>
      {!isReady ? (
        <span>{isError ? 'Error, try reloading' : 'Loading...'}</span>
      ) : (
        <span>{breedName}</span>
      )}
    </Button>
  );
}

export default DogImageLink;