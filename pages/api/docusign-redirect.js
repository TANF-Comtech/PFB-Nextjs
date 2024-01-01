export default async function handler(req, res) {
  console.log('req')
  // console.log(req)
  console.log(req.body.data.envelopeId)
  
  // res.status(200).json({ message: 'Resquest Successful' })
  // try {
  //   // Make a GET request to the Rails app
  //   const response = await fetch('http://localhost:3005/hello');
  //   const data = await response.json();

  //   // You can process the data from the Rails app as needed
  //   // For example, logging the response
  //   console.log('Response from Rails app:', data);

  //   // Send a response back to the client
  //   res.status(200).json({ message: 'Request Successful', railsData: data });
  // } catch (error) {
  //   // Handle any errors that occur during the request
  //   console.error('Error fetching data from Rails app:', error);
  //   res.status(500).json({ message: 'Error fetching data' });
  // }
}