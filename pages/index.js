import Head from 'next/head'

function Homepage() {
  return (
    <div className="container">
      <Head>
        <title>People for Bikes - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          People for Bikes Site
        </h1>
      </main>
    </div>
  )
}


export default Homepage
