interface AppProps extends APIResponse<AppResponse>{
  title: string;
  description: string;
}

const App = ({ title, description, payload }: AppProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      
      <span>{payload.message}: { payload.code}</span>
    </div>
  );
}

//////////////

interface AppProps extends APIResponse<string>{
  title: string;
  description: string;
}

const AppTwo = ({ title, description, payload }: AppProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      
      <span>{payload}</span>
    </div>
  );
}
