import { useGetDogImage } from '../../hooks/useGetDogImage';
import { Spinner, Image, Alert } from 'react-bootstrap';

function DogImage(props) {
  const { breedName } = props;
  const [{ isReady, photoLink, isError }] = useGetDogImage(breedName);

  // Builds the bulk of the content in the component, depending on the current state of the data
  const getMainHtml = () => {
    // Default HTML to return if none of the logic is evaluated below
    let mainHtml = (
      <Alert variant='danger'>
        Something went wrong while generating the dog image content. Refresh the
        page to try again.
      </Alert>
    );

    if (isError) {
      mainHtml = (
        <Alert variant='danger'>
          Something went wrong while loading the photo. Refresh the page to try again.
        </Alert>
      );
    } else if (!isReady) {
      mainHtml = <Spinner animation='grow' />;
    } else {
      mainHtml = (
        <Image rounded='true' src={photoLink} className='full-width'></Image>
      );
    }

    return mainHtml;
  };

  return (
    <div>
      <h3>Here is a {breedName}:</h3>
      {getMainHtml()}
    </div>
  );
}

export default DogImage;
