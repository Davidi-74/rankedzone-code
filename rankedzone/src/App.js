import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import RouterComp from './comps/RouterComp'
import { lightTheme, darkTheme } from './mui/theme'

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <RouterComp />
      </ThemeProvider>
    </div>
  );
}

export default App;
