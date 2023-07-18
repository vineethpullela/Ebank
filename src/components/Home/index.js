import Header from '../Header'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-card-container">
      <h1 className="home-card-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="digital-card-img"
      />
    </div>
  </div>
)

export default Home
