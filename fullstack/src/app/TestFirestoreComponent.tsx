import React from 'react';
import { addTestData, getTestData } from './firestoreTest';

const TestFirestoreComponent: React.FC = () => {
  const handleAddData = async () => {
    await addTestData();
  };

  const handleGetData = async () => {
    await getTestData();
  };

  return (
    <div>
      <button onClick={handleAddData}>Add Test Data</button>
      <button onClick={handleGetData}>Get Test Data</button>
    </div>
  );
};

export default TestFirestoreComponent;