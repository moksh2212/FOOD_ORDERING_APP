import React,{useState} from 'react';
import ChatBot from 'react-simple-chatbot';
import Header from './components/layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/store/CartProvider';
import { ThemeProvider } from 'styled-components';

const steps = [
    {
        id: '0',
        message: 'Hey Friend!',
 
        trigger: '1',
    }, {
        id: '1',

        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
 

        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id:4,
        user:true,
        trigger:5

    },
    
    {

       
        id: '5',
        options: [
             
            // like this  { value: 1, label: 'View Courses' },
            {value: 2, label: 'Sorry! for the inconvenience.Our support team will contact you shortly or you can contact us on +91 3234334223',
        },
 
        ],
        end: true
    }
];
 
// Creating our own theme
const theme = {
    background: '#d96ae9',
    headerBgColor: '#771186',
    headerFontSize: '20px',
    botBubbleColor: '#1acb14',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
 
// Set some properties of the bot
const config = {
    botAvatar: "img.png",
    floating: true,
};
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);

  };
 

  return (
 
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      <div className="App">
      
            <ThemeProvider theme={theme}>
                <ChatBot

                    headerTitle="HelpBot"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
        </div>
    
    </CartProvider>
  );
}

export default App;
