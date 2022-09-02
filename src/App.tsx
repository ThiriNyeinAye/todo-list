import React, {FC} from 'react';
import './App.css';
import TodoListContainer from '../src/Container/TodoListContainer';

const App: FC = () => {
  return (
    <div className="App">
      <TodoListContainer />
    </div>
  );
}

export default App;
