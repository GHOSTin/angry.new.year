import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  return (
    <React.Fragment>
      <ControlledCarousel/>
      <div className="col-md-12 text-center">
        <HowGift />
      </div>
    </React.Fragment>
  );
}

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className={"text-center"} >Чтобы сделать подарок Вы можете:</Popover.Title>
      <Popover.Content>
        Обратиться к Соловьевой Е.В. в <strong>Образовательный центр ЧТПЗ ауд. 223/1</strong>.
        Или связаться по <a href={"mailto:Evgeniia.Soloveva@chelpipe.ru"}>электронной почте</a>.
      </Popover.Content>
    </Popover>
);

const HowGift = () => (
    <OverlayTrigger trigger={['focus']} placement="top" overlay={popover}>
      <Button variant={"light"} className={"select-button"} size="lg">Как сделать подарок?</Button>
    </OverlayTrigger>
);

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let response = await fetch("https://gifts.bbmprof.ru/data");
    let responseData = await response.json();
    setData(responseData.filter(item => !item.disabled));
  };

  useEffect(()=>{
    fetchData();
  }, []);

  useInterval(()=>{
    fetchData();
  }, 60000);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
      <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={handleSelect} fade={true}
          prevIcon={<i className="fas fa-chevron-circle-left"></i>}
          nextIcon={<i className="fas fa-chevron-circle-right"></i>}
          id={"carouselChild"}
          interval={10000}
          indicators={false}
          pauseOnHover={true}
      >
        {data.map(item=>(
          <Carousel.Item key={item.id}>
            <div className={"p-3"}>
              <h3>Фамилия и Имя</h3>
              <p>{item.name}</p>
              <h3>Возраст</h3>
              <p>{item.age}</p>
              <h3>Увлечения</h3>
              <p>{item.text}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
  );
}

export default App;
