// AppProps is used only in this file
type AppProps = {
  message: string;
  increment?: number;
};

const App = ({ message, increment = 1 }: AppProps) => { 
  const [count, setCount] = useState<number>(0);

  const onClick = (): void => { 
    setCount(count + increment);
  }

  return (
    <div onClick={onClick}>
      {message}: {count}
    </div>
  );
};

export default App;