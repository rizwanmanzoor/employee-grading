import Navbar from '@/components/navbar/Navbar';
import StepperForm from './StepperForm';

const Home = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-body">
        <StepperForm />
      </main>
    </div>
  );
}

export default Home