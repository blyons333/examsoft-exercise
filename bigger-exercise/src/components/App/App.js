import './App.css';
import React, { useEffect, useState } from 'react';
import { useGetApiData } from '../../hooks/useGetApiData';
import {
  Container,
  Spinner,
  Alert,
  Row,
  Col,
  Stack,
  Navbar,
} from 'react-bootstrap';
import DogImage from '../DogImage/DogImage';
import DogImageLink from '../DogImageLink/DogImageLink';

function App() {
  const [{ data, isLoading, isError }] = useGetApiData(
    [],
    'https://dog.ceo/api/breeds/list/all'
  );
  const [linkedBreeds, setLinkedBreeds] = useState();
  const [imageBreed, setImageBreed] = useState();

  useEffect(() => {
    if (data && data.message) {
      // Get random breed names for linked images and displayed image
      const dogBreedArray = Object.keys(data.message);
      const randomIndexes = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * dogBreedArray.length)
      );
      const newLinkedBreeds = randomIndexes.map(
        (index) => dogBreedArray[index]
      );
      const newImageBreed =
        dogBreedArray[Math.floor(Math.random() * dogBreedArray.length)];
      setLinkedBreeds(newLinkedBreeds);
      setImageBreed(newImageBreed);
    }
  }, [data]);

  // Builds the bulk of the content in the component, depending on the current state of the data
  const getMainHtml = () => {
    // Default HTML to return if none of the logic is evaluated below
    let mainHtml = (
      <Alert variant='danger'>
        Something went wrong while generating the page content. Refresh the page
        to try again.
      </Alert>
    );

    if (isError) {
      mainHtml = (
        <Alert variant='danger'>
          Something went wrong while loading the breed data. Refresh the page to
          try again.
        </Alert>
      );
    } else if (isLoading) {
      mainHtml = (
        <Container className='centered'>
          <Spinner animation='grow' />
        </Container>
      );
    } else if (imageBreed && linkedBreeds) {
      mainHtml = (
        <Container>
          <Row>
            <Col md={{ span: 8 }} className='centered'>
              <DogImage breedName={imageBreed} />
            </Col>
            <Col>
              <p>
                Looking for more? The buttons below link to images of other
                breeds:
              </p>
              <Stack gap={2}>
                {linkedBreeds.map((breed, index) => (
                  <DogImageLink key={`breed${index}`} breedName={breed} />
                ))}
              </Stack>
            </Col>
          </Row>
        </Container>
      );
    }

    return mainHtml;
  };

  return (
    <div>
      <Navbar bg='dark' variant='dark' className='navbar-style'>
        <Container>
          <Navbar.Brand>Random Dog Photos</Navbar.Brand>
        </Container>
      </Navbar>
      <main>
        <Container>
          {getMainHtml()}
        </Container>
      </main>
    </div>
  );
}

export default App;
