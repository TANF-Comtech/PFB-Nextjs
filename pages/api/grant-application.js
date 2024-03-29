export const handleSubmit = async (e, jsonData) => {
  e.preventDefault();
  console.log('jsonData', jsonData);
  try {
    const response = await fetch('https://localhost:8080/api/grant_applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if (response.ok) {
      console.log('Data submitted successfully');
      // You may redirect the user or show a success message here
    } else {
      console.error('Failed to submit data');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};
